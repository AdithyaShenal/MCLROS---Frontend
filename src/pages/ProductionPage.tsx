import { useState } from "react";
import { Search } from "lucide-react";
import ProductionTable, {
  ProductionRequest,
} from "../components/production/ProductionTable";

const initialRequests: ProductionRequest[] = [
  {
    id: "F001",
    farmerName: "Sunil Perera",
    volume: 125,
    timeWindow: "06:00 - 08:00",
    registeredAt: "2024-01-15 05:45",
    status: "Active",
  },
  {
    id: "F002",
    farmerName: "Kamala Silva",
    volume: 98,
    timeWindow: "07:00 - 09:00",
    registeredAt: "2024-01-15 06:12",
    status: "Active",
  },
];
const ProductionPage = () => {
  const [search, setSearch] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [date, setDate] = useState("");
  const [requests, setRequests] =
    useState<ProductionRequest[]>(initialRequests);

  return (
    <div className="p-7 w-full">
      -<h1 className="text-2xl font-semibold">Production Overview</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage Pending collection requests
      </p>
      <div className="bg-base-100 rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold mb-4">Pending Requests (6)</h2>
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="relative w-full max-w-xl">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10 pointer-events-none"
            />

            <input
              type="text"
              placeholder="Search by farmer name..."
              className="input input-bordered w-full pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <input
            type="text"
            placeholder="Filter by Farmer ID..."
            className="input input-bordered w-48"
            value={farmerId}
            onChange={(e) => setFarmerId(e.target.value)}
          />
          <input
            type="date"
            className="input input-bordered w-44"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <ProductionTable
          requests={requests}
          onMap={(r) => console.log("Map clicked", r)}
          onBlock={(r) => console.log("Block clicked", r)}
        />
      </div>
    </div>
  );
};

export default ProductionPage;
