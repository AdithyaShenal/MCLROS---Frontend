import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import MapComponent from "./MapComponent";
import axios, { AxiosError } from "axios";
import type { Route } from "./RoutingPage";
import { useState } from "react";
import RouteCardAdvance from "../components/map/RouteCardAdvance";

const RouteControlPage = () => {
  const [mapRoute, setMapRoute] = useState<Route>();

  const queryClient = useQueryClient();

  const {
    data: routes,
    isError,
    error,
  } = useQuery<Route[], AxiosError>({
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
  } = useQuery<Route[], AxiosError>({
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
      {isDeleteError && <p>{deleteError.message}</p>}
      <div className="flex flex-[1fr_1fr] w-full h-[600px] md:h-[600px] gap-4 ">
        <div className="tabs tabs-lift w-full ">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Dispatched"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6 overflow-y-scroll">
            {isError && <p>{error.message}</p>}
            {routes?.length === 0 && <p>No dispatched routes available</p>}
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
            {isInProgressError && <p>{inProgressError.message}</p>}
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
