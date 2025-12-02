import MapComponent from "./MapComponent";
import RouteCard from "../components/map/RouteCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
// import MapboxMap from "../components/MapBox/MapboxMap";

interface Farmer {
  _id: string;
  address: string;
  location: {
    lat: number;
    lon: number;
  };
  name: string;
  route: 6;
  updatedAt: string;
  createdAt: string;
  phone: string;
}

interface Production {
  _id: string;
  volume: number;
  farmer: Farmer;
}

interface Stop {
  load_after_visit: number;
  node: number;
  order: 1;
  production: Production;
}

export interface Route {
  distance: number;
  stops: [Stop];
  vehicle_id: number;
  vehicle_no: string;
  load: number;
}

const RoutingPage = () => {
  // const queryClient = useQueryClient();
  const [mapRoute, setMapRoute] = useState<Route>();
  const [routeWiseResolve, setRouteWiseResolve] = useState<boolean>(false);

  const {
    data: routes,
    isError,
    error,
    isLoading,
    refetch,
  } = useQuery<Route[], Error>({
    queryKey: ["routes"],
    queryFn: () =>
      axios
        .get("http://localhost:4000/api/routing/optimize/auto")
        .then((res) => res.data),
    retry: 1,
    enabled: false,
    // initialData: () => queryClient.getQueryCache(["routes"]),
  });

  const onRouteCardClick = (props: Route) => {
    setMapRoute(props);
  };

  if (routes) console.log(routes); // Debug

  return (
    <>
      <div className="flex flex-col gap-2">
        {/*  */}

        <div className="stats border border-gray-300 mt-2 rounded-lg">
          <div className="stat place-items-center">
            <div className="stat-title">Total liters</div>
            <div className="stat-value">31L</div>
            <div className="stat-desc">From available production</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Available capacity</div>
            <div className="stat-value ">450L</div>
            <div className="stat-desc text-secondary">
              Available trucks capacity
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Auto resolvability</div>
            <div className="badge badge-success">Can be auto resolve</div>
            {/* <div className="badge badge-error text-white">Cannot Resovle</div> */}
            <div className="stat-desc text-secondary">
              Please handle manually
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Route wise resolvability</div>
            {/* <div className="badge badge-success">Can be resolve</div> */}
            <div className="badge badge-error text-white">
              Cannot be resovle
            </div>
            <div className="stat-desc">Please handle manually</div>
          </div>
        </div>
        {/*  */}

        <div className="flex items-center gap-2 h-auto">
          <button
            className="btn btn-neutral"
            onClick={() => {
              refetch();
            }}
          >
            {isLoading && <span className="loading loading-spinner"></span>}
            Generate Optimized Routes
          </button>
          <select
            defaultValue="Server location"
            className="select select-neutral max-w-36"
          >
            <option disabled={true}>Optimize Strategy</option>
            <option onClick={() => setRouteWiseResolve(false)}>
              Auto resolve
            </option>
            <option onClick={() => setRouteWiseResolve(true)}>
              Route wise
            </option>
          </select>

          {routeWiseResolve && (
            <select
              defaultValue="Server location"
              className="select select-neutral max-w-36"
            >
              <option disabled={true}>Optimize Strategy</option>
              <option>All</option>
              <option>Route 1</option>
              <option>Route 2</option>
              <option>Route 3</option>
              <option>Route 4</option>
              <option>Route 5</option>
              <option>Route 6</option>
            </select>
          )}

          <button className="btn btn-secondary">Approve & Dispatch</button>
        </div>

        {/* Error Message */}
        {isError && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error.message} check your internet connection</span>
          </div>
        )}

        {/* Error Message */}

        <div className="grid grid-rows-[2fr_3fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 h-[600px] md:h-[600px]">
          <div className="w-full h-full">
            <MapComponent route={mapRoute} />
          </div>
          <div className="overflow-y-scroll rounded-lg border border-gray-300">
            <ul className="p-2">
              {routes &&
                routes.map((route) => (
                  <li key={route.vehicle_no}>
                    <RouteCard props={route} onClickRoute={onRouteCardClick} />
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutingPage;
