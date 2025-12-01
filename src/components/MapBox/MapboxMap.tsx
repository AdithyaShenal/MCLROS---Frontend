import React, { useMemo, useEffect, useState } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";

interface Stop {
  production?: {
    farmer: {
      location: { lat: number; lon: number };
    };
  };
}

interface Route {
  stops: Stop[];
  vehicle_no: string;
}

interface MapboxMapProps {
  route?: Route;
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWRpdGh5YXNoZW5hbCIsImEiOiJjbWlrbHRtY3QxOTJ6M2VxeGE3cmkzZzJ2In0.G6srdBSi0ewZCX79ojBoeQ";

// Depot marker as a simple blue circle
const DepotMarker = () => (
  <div
    style={{
      width: 30,
      height: 30,
      backgroundColor: "#1A73E8",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
    }}
  >
    D
  </div>
);

// Numbered waypoint marker
const NumberedMarker = (number: number) => (
  <div
    style={{
      width: 25,
      height: 25,
      backgroundColor: "#FF5722",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.8rem",
    }}
  >
    {number}
  </div>
);

const MapboxMap: React.FC<MapboxMapProps> = ({ route }) => {
  const [routeGeometry, setRouteGeometry] = useState(null);

  const routeCoordinates = useMemo(() => {
    if (!route) return [];
    return route.stops.map((stop) => {
      if (!stop.production) return [79.969565, 7.019041]; // default depot
      const loc = stop.production.farmer.location;
      return [loc.lon, loc.lat];
    });
  }, [route]);

  const initialCenter = routeCoordinates[0] || [79.969565, 7.019041];

  // Fetch route geometry from Mapbox Directions API
  useEffect(() => {
    async function getRoute() {
      if (routeCoordinates.length < 2) return;

      const coordsStr = routeCoordinates.map((c) => c.join(",")).join(";");
      const res = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${coordsStr}?geometries=geojson&access_token=${MAPBOX_TOKEN}`
      );
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        setRouteGeometry(data.routes[0].geometry);
      }
    }

    getRoute();
  }, [routeCoordinates]);

  return (
    <Map
      initialViewState={{
        longitude: initialCenter[0],
        latitude: initialCenter[1],
        zoom: 14,
      }}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      mapboxAccessToken={MAPBOX_TOKEN}
      style={{ width: "100%", height: "100%" }}
    >
      {/* Render route line if available */}
      {routeGeometry && (
        <Source
          id="route"
          type="geojson"
          data={{ type: "Feature", geometry: routeGeometry }}
        >
          <Layer
            id="route-line"
            type="line"
            paint={{
              "line-color": "#1A73E8",
              "line-width": 5,
            }}
          />
        </Source>
      )}

      {/* Render depot + waypoint markers */}
      {routeCoordinates.map((coord, index) => (
        <Marker
          key={index}
          longitude={coord[0]}
          latitude={coord[1]}
          anchor="bottom"
        >
          {index === 0 ? <DepotMarker /> : NumberedMarker(index)}
        </Marker>
      ))}
    </Map>
  );
};

export default MapboxMap;
