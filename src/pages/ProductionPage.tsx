import {useState} from "react";
const ProductionPage = () => {
  const[search,setSearch] = useState("");

  return (
    <div className="p-7 w-full">
      <h1 className="text-2xl font-semibold">Production Overview</h1>
      <p className="text-gray-500 text-sm mb-6">
        Manage Pending collection requests
      </p>
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <input type="text" placeholder="Search by farmer name..." className="input input-bordered w-full max-w-md" value={search} onChange={(e) => setSearch(e.target.value)}/>
      </div>
    </div>
  );
};

export default ProductionPage;
