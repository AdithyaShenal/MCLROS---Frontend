import type { Route } from "../../pages/RoutingPage";

interface Props {
  props: Route;
  onClickRoute: (props: Route) => void;
  onClickDelete: (Props: Route) => void;
}

const RouteCard = ({ props, onClickRoute, onClickDelete }: Props) => {
  return (
    <div
      className="
        mx-2 my-3
        rounded-xl
        border border-gray-200
        bg-white
        p-4
        transition-colors duration-200
        hover:border-blue-400
        hover:bg-blue-50/20
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-900">
          {props.license_no}
        </h3>

        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
          {props.status}
        </span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-3" />

      {/* Details */}
      <div className="space-y-2 text-sm">
        <InfoRow label="Stops" value={props.stops.length - 2} />
        <InfoRow label="Distance" value={`${props.distance / 1000} km`} />
        <InfoRow label="Time" value="1h 50m" />
        <InfoRow label="Load" value={`${props.load} L`} />
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onClickRoute(props)}
          className="btn btn-neutral btn-sm"
        >
          View
        </button>

        <button
          onClick={() => onClickDelete(props)}
          className="btn btn-error btn-sm text-white"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="flex justify-between text-gray-500">
    <span>{label}</span>
    <span className="font-medium text-gray-800">{value}</span>
  </div>
);

export default RouteCard;
