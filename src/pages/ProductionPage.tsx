import { useState } from "react";
import { Search } from "lucide-react";
const ProductionPage = () => {
  const [search, setSearch] = useState("");
  const [farmerId, setFarmerId] = useState("");
  const [date, setDate] = useState("");

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
      </div>
    </div>
  );
};

export default ProductionPage;
