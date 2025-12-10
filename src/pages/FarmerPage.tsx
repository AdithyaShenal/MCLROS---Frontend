import { useState } from "react";
import FarmerTable from "../components/farmers/FarmerTable";

const FarmerPage = () => {
  const [search, setSearch] = useState("");
  const [farmType, setFarmType] = useState("");
  return (
    <div className="p-7 w-full">
      <h1 className="text-2xl font-semibold">Farmer Management</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage farmer profiles and information
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by name or NIC..."
          className="input input-bordered w-full max-w-md"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered w-52"
          value={farmType}
          onChange={(e) => setFarmType(e.target.value)}
        >
          <option value="">Filter by farm type</option>
          <option value="Dairy Farm">Dairy Farm</option>
          <option value="Organic Dairy">Organic Dairy</option>
          <option value="Mixed Farm">Mixed Farm</option>
        </select>
        <button className="btn btn-primary ml-auto">+ Add Farmer</button>
      </div>
      <FarmerTable search={search} farmType={farmType} />
    </div>
  );
};
export default FarmerPage;
