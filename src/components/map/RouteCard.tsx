interface Props {
  vehicleNo: string;
  noOfStops: number;
  distance: number;
  time?: string;
  load: number;
  stops: object;
}

const RouteCard = ({ vehicleNo, noOfStops, distance, load }: Props) => {
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
      >
        <div className="flex justify-between text-sm">
          <div className="text-lg font-extrabold">{vehicleNo}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Stops</div>
          <div className="font-bold">{noOfStops - 2}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Distance</div>
          <div className="font-bold">{distance / 1000}Km</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Time</div>
          <div className="font-bold">{"1H 50M"}</div>
        </div>

        <div className="flex justify-between text-gray-500 text-sm">
          <div className="">Load</div>
          <div className="font-bold">{load} Liters</div>
        </div>
      </div>
    </>
  );
};

export default RouteCard;
