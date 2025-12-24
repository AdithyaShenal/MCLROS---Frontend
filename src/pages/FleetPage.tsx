import { use, useState } from "react";
import { Search } from "lucide-react";

const FleetPage = () => {
  const [activeTab, setActiveTab] = useState<"Trucks" | "Drivers">("Drivers");
  const [search, setSearch] = useState("");
  const [truck, setTruck] = useState("");
  return (
    <div className="p-7 w-full">
      <h1 className="text-2xl font-semibold">Fleet Management</h1>
      <p className="text-gray-500 text-sm mb-4">
        Manage your trucks and drivers
      </p>
    </div>
  );
};

export default FleetPage;
