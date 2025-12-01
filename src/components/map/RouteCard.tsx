import type { Route } from "../../pages/RoutingPage";

interface Props {
  props: Route;
  onClickRoute: (props: Route) => void;
}

const RouteCard = ({ props, onClickRoute }: Props) => {
  return (
    <>
      <div
        className="border 
            border-gray-300
            rounded-lg
            p-4 flex
            flex-col 
            gap-1
            my-4
            mx-2
            cursor-pointer
            transition-all
            hover:border-black
            "
        onClick={() => onClickRoute(props)}
      >
        <div className="flex justify-between text-sm">
          <div className="text-lg font-extrabold">{props.vehicle_no}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Stops</div>
          <div className="font-bold">{props.stops.length - 2}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Distance</div>
          <div className="font-bold">{props.distance / 1000}Km</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Time</div>
          <div className="font-bold">{"1H 50M"}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Load</div>
          <div className="font-bold">{props.load} Liters</div>
        </div>
      </div>
    </>
  );
};

export default RouteCard;
