import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MapComponent from "./MapComponent";
import axios, { AxiosError } from "axios";
import type { Route } from "./RoutingPage";
import { useState } from "react";
import RouteCardAdvance from "../components/map/RouteCardAdvance";

interface ApiError {
  message: string;
  status: number;
  details?: string;
  code: string;
}

const RouteControlPage = () => {
  const [mapRoute, setMapRoute] = useState<Route>();

  const queryClient = useQueryClient();

  const {
    data: routes,
    isError,
    error,
  } = useQuery<Route[], AxiosError<ApiError>>({
    queryKey: ["routes", "dispatched"],
    queryFn: () =>
      axios
        .get("http://localhost:4000/api/routing/dispatch")
        .then((res) => res.data),
  });

  const {
    data: routesInProgress,
    isError: isInProgressError,
    error: inProgressError,
  } = useQuery<Route[], AxiosError<ApiError>>({
    queryKey: ["routes", "InProgress"],
    queryFn: () =>
      axios
        .get("http://localhost:4000/api/routing/in_progress")
        .then((res) => res.data),
  });

  const {
    mutate,
    error: deleteError,
    isError: isDeleteError,
  } = useMutation({
    mutationFn: (route_id: string) =>
      axios.delete(`http://localhost:4000/api/routing/routes/${route_id}`),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["routes", "dispatched"] });
      queryClient.invalidateQueries({ queryKey: ["routes", "InProgress"] });
    },
  });

  const handleClick = (props: Route) => {
    setMapRoute(props);
  };

  const handleDelete = (props: Route) => {
    mutate(props._id);
  };

  return (
    <>
      {isInProgressError && isError && (
        <div role="alert" className="alert alert-error mb-3">
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
          <span>
            {inProgressError.response?.data.message ||
              inProgressError.message ||
              error.response?.data.message ||
              error.message}
          </span>
        </div>
      )}

      {isDeleteError && (
        <div role="alert" className="alert alert-error mb-3">
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
          <span>{deleteError.message}</span>
        </div>
      )}

      <div className="flex flex-[1fr_1fr] w-full h-[600px] md:h-[600px] gap-4">
        <div className="tabs tabs-lift w-full ">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Dispatched"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 overflow-y-scroll">
            {isError && <p>{error.message}</p>}
            {routes?.length === 0 && (
              <p className="text-gray-400 text-sm">
                <i>No dispatched routes available</i>
              </p>
            )}
            {routes?.map((route) => (
              <RouteCardAdvance
                key={route._id}
                props={route}
                onClickRoute={handleClick}
                onClickDelete={handleDelete}
              />
            ))}
          </div>
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="In Progress"
            defaultChecked
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 overflow-y-scroll">
            {routesInProgress?.length === 0 && (
              <p className="text-gray-400 text-sm">
                <i>No In Progress routes available</i>
              </p>
            )}
            {routesInProgress?.map((route) => (
              <RouteCardAdvance
                key={route._id}
                props={route}
                onClickRoute={handleClick}
                onClickDelete={handleDelete}
              />
            ))}
          </div>
        </div>

        <div className="w-full h-full">
          <MapComponent route={mapRoute} />
        </div>
      </div>
    </>
  );
};

export default RouteControlPage;
