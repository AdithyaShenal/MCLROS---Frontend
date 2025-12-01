import L, { LatLng, type ControlOptions } from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import { createNumberedMarkerIcon } from "./map/WaypointMarker";
import { depotMarker } from "./map/DeportMarker";

interface RoutingMachineProps extends ControlOptions {
  waypoints: LatLng[];
}

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiYWRpdGh5YXNoZW5hbCIsImEiOiJjbWlrbHRtY3QxOTJ6M2VxeGE3cmkzZzJ2In0.G6srdBSi0ewZCX79ojBoeQ";

const createRoutineMachineLayer = (props: RoutingMachineProps) => {
  const { waypoints } = props;

  const instance = L.Routing.control({
    waypoints: waypoints,
    lineOptions: {
      styles: [
        { color: "white", weight: 10, opacity: 1 },
        { color: "#1A73E8", weight: 6, opacity: 1 },
      ],
      smoothFactor: 5,
    },
    altLineOptions: {
      styles: [
        { color: "#1A73E8", weight: 4, opacity: 0.6, dashArray: "10,10" },
      ],
    },
    show: false,
    addWaypoints: false,
    routeWhileDragging: true,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    showAlternatives: true,
    collapsible: true,

    createMarker: function (
      i: number, // i: current waypoint index (0, 1, 2, ..., n-1)
      waypoint: { latLng: L.LatLng },
      n: number // n: total number of waypoints
    ) {
      // 1. Identify the last waypoint index
      const lastIndex = n - 1;

      // 2. Depot Return Logic: Skip the marker for the very last point
      if (i === lastIndex) {
        return null;
      }

      // 3. Depot Start Logic: Render the unique Depot Marker for the first point (i = 0)
      if (i === 0) {
        return L.marker(waypoint.latLng, {
          icon: depotMarker,
        });
      }

      const stopNumber = i;
      // Create the numbered icon using the function
      const numberedIcon = createNumberedMarkerIcon(stopNumber);

      return L.marker(waypoint.latLng, {
        icon: numberedIcon,
      });
    },

    router: L.Routing.mapbox(MAPBOX_TOKEN, {
      profile: "mapbox/driving", // must include "mapbox/"
      alternatives: true,
    }),
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
