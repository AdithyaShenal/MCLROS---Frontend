import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout";
import MapComponent from "../pages/MapComponent";
import RoutingPage from "../pages/RoutingPage";
import ProductionPage from "../pages/ProductionPage";
import FleetPage from "../pages/FleetPage";
import FarmerPage from "../pages/FarmerPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <MapComponent /> },
      { path: "routing", element: <RoutingPage /> },
      { path: "production", element: <ProductionPage /> },
      { path: "fleet", element: <FleetPage /> },
      { path: "farmer", element: <FarmerPage /> },
    ],
  },
]);

export default router;
