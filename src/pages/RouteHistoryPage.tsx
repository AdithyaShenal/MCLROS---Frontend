import { useQuery } from "@tanstack/react-query";
import MapComponent from "./MapComponent";
import axios, { AxiosError } from "axios";
import type { Route } from "./RoutingPage";
import { useState } from "react";
import RouteCard from "../components/map/RouteCard";

const RouteHistoryPage = () => {
  const [mapRoute, setMapRoute] = useState<Route>();

  const {
    data: routesInProgress,
    isError: isInProgressError,
    error: inProgressError,
  } = useQuery<Route[], AxiosError>({
    queryKey: ["routes", "InProgress"],
    queryFn: () =>
      axios
        .get("http://localhost:4000/api/routing/history")
        .then((res) => res.data),
  });

  const handleClick = (props: Route) => {
    setMapRoute(props);
  };

  return (
    <>
      <div className="flex flex-[1fr_1fr] w-full h-[600px] md:h-[600px] gap-4 ">
        <div className="tabs tabs-lift w-full ">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="History"
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
              <RouteCard
                key={route._id}
                props={route}
                onClickRoute={handleClick}
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

export default RouteHistoryPage;
