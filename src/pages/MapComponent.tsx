import React, { useMemo } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import RoutingMachine from "../components/RoutingMachine";
import type { Route } from "./RoutingPage";

const MapComponent: React.FC<{ route?: Route }> = ({ route }) => {
  // const [myPos, setMyPos] = useState<[number, number] | null>(null);

  const routeWaypoints = useMemo(() => {
    if (!route || !route.stops) return [];

    const depotLocation = route.stops[0].production
      ? route.stops[0].production.farmer.location
      : { lat: 7.019041, lon: 79.969565 };

    return route.stops.map((stop) => {
      if (!stop.production) {
        return L.latLng(depotLocation.lat, depotLocation.lon);
      }

      const loc = stop.production.farmer.location;
      return L.latLng(loc.lat, loc.lon);
    });
  }, [route]);

  const initialCenter: [number, number] =
    routeWaypoints.length > 0
      ? [routeWaypoints[0].lat, routeWaypoints[0].lng]
      : [7.019041, 79.969565];

  return (
    <>
      <div className="h-full w-full">
        <MapContainer
          key={route?.vehicle_no}
          className="h-full rounded-lg border border-gray-300"
          center={initialCenter}
          zoom={15}
          scrollWheelZoom={true}
        >
          <TileLayer
            className="leaflet-control-container leaflet-control-attribution"
            attribution="© Mapbox"
            url={
              "https://api.mapbox.com/styles/v1/mapbox/streets-v12/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYWRpdGh5YXNoZW5hbCIsImEiOiJjbWlrazQ0aTQwZDdtM2VzZGJrcXA0d3ZnIn0.lI5omaXW6lzbln2Vpb3ubA"
            }
          />

          <RoutingMachine
            waypoints={routeWaypoints}
            // Add a key to force re-render if waypoints change dynamically
            key={routeWaypoints.length}
          />

          {/* <MyLocationTracker position={myPos} setPosition={setMyPos} /> */}

          {/* <Marker position={initialCenter} icon={customMarker}>
            <Popup>Start of the 50-waypoint route.</Popup>
          </Marker> */}
        </MapContainer>
      </div>
    </>
  );
};

export default MapComponent;
