import MapComponent from "./MapComponent";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import RouteCardAdvance from "../components/map/RouteCardAdvance";

// import MapboxMap from "../components/MapBox/MapboxMap";

interface Farmer {
  _id: string;
  address: string;
  location: {
    lat: number;
    lon: number;
  };
  name: string;
  route: number;
  updatedAt: string;
  createdAt: string;
  phone: string;
}

interface Production {
  _id: string;
  volume: number;
  farmer: Farmer;
  status: string;
}

interface Stop {
  load_after_visit: number;
  node: number;
  order: number;
  production: Production | null;
}

export interface Route {
  _id: string;
  distance: number;
  stops: Stop[];
  vehicle_id: number;
  license_no: string;
  load: number;
  status: string;
}

interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

const RoutingPage = () => {
  const [mapRoute, setMapRoute] = useState<Route>();
  const [routeWiseResolve, setRouteWiseResolve] = useState<boolean>(false);
  const [selectedRoute, setSelectedRoute] = useState<number>(0);

  const queryClient = useQueryClient();

  const {
    mutate: saveRoutes,
    isPending,
    isError: isSaveRoutesrror,
    error: saveRoutesError,
  } = useMutation<unknown, AxiosError<ApiError>, Route[]>({
    mutationFn: (routes: Route[]) =>
      axios
        .post("http://localhost:4000/api/routing/dispatch", routes)
        .then((res) => res.data),
  });

  const {
    data: routes,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<Route[], AxiosError<ApiError>>({
    queryKey: routeWiseResolve
      ? ["routes", "route-wise", selectedRoute]
      : ["routes", "auto"],

    queryFn: async () => {
      if (!routeWiseResolve) {
        const res = await axios.get(
          "http://localhost:4000/api/routing/optimize/auto"
        );
        return res.data;
      }

      // Route-wise mode
      if (selectedRoute === 0) {
        const res_1 = await axios.get(
          "http://localhost:4000/api/routing/optimize/route-wise/all"
        );
        return res_1.data;
      }

      const res_2 = await axios.get(
        `http://localhost:4000/api/routing/optimize/route-wise/${selectedRoute}`
      );
      return res_2.data;
    },
    retry: 1,
    enabled: false,
  });

  const onRouteCardClick = (props: Route) => {
    setMapRoute(props);
  };

  const handleDelete = (route: Route) => {
    queryClient.setQueryData<Route[]>(
      routeWiseResolve
        ? ["routes", "route-wise", selectedRoute]
        : ["routes", "auto"],
      (old) => old?.filter((r) => r.license_no !== route.license_no)
    );
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
          {/* Card 1 */}
          <div className="group rounded-lg p-5 ring-1 ring-black/5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Liters</p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900 tracking-tight">
              31{" "}
              <span className="text-base font-medium text-gray-400">
                Liters
              </span>
            </h2>
          </div>

          {/* Card 2 */}
          <div className="group rounded-lg p-5 ring-1 ring-black/5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Available Capacity
            </p>
            <h2 className="mt-3 text-2xl font-semibold text-gray-900 tracking-tight">
              450{" "}
              <span className="text-base font-medium text-gray-400">
                Liters
              </span>
            </h2>
          </div>

          {/* Card 3 */}
          <div className="group rounded-lg p-5 ring-1 ring-black/5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Auto Resolvability
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Auto resolvable
              </span>
            </div>
          </div>

          {/* Card 4 */}
          <div className="group rounded-lg p-5 ring-1 ring-black/5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Route-wise Resolvability
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/10 px-3 py-1 text-sm font-medium text-rose-700">
                <span className="h-2 w-2 rounded-full bg-rose-500" />
                Not resolvable
              </span>
            </div>
          </div>
        </div>

        {/*  */}

        <div className="flex items-center gap-2 h-auto">
          <button className="btn btn-neutral" onClick={() => refetch()}>
            {isFetching && <span className="loading loading-spinner"></span>}
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
              onChange={(e) => setSelectedRoute(Number(e.target.value))}
            >
              <option disabled={true}>Optimize Strategy</option>
              <option value={0}>All</option>
              <option value={1}>Route 1</option>
              <option value={2}>Route 2</option>
              <option value={3}>Route 3</option>
              <option value={4}>Route 4</option>
              <option value={5}>Route 5</option>
              <option value={6}>Route 6</option>
            </select>
          )}

          <button
            className="btn btn-secondary"
            onClick={() => {
              if (!routes)
                return alert("Please generate optimized routes first");

              saveRoutes(routes);
            }}
          >
            {isPending && <span className="loading loading-spinner"></span>}
            Approve & Dispatch
          </button>
        </div>

        {/* Error Message */}
        {isSaveRoutesrror && (
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
            <span>{saveRoutesError.response?.data.message}</span>
          </div>
        )}

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
            <span>{error.response?.data.message}</span>
          </div>
        )}

        {/* Error Message */}

        <div className="grid grid-rows-[2fr_3fr] md:grid-rows-1 grid-cols-1 md:grid-cols-[3fr_2fr] gap-2 h-[600px] md:h-[600px]">
          <div className="w-full h-full">
            <MapComponent route={mapRoute} />
          </div>
          <div className="rounded-xl border border-gray-300/60 bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-300/60 px-4 py-3">
              <p className="text-sm font-semibold text-gray-800">
                Generated Routes
              </p>
            </div>

            {/* Content */}
            <div className="max-h-[520px] overflow-y-auto px-3 py-2">
              <ul className="space-y-2">
                {routes &&
                  routes.map((route) => (
                    <li key={route.license_no}>
                      <RouteCardAdvance
                        props={route}
                        onClickRoute={onRouteCardClick}
                        onClickDelete={handleDelete}
                      />
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutingPage;
