import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
// import { persistQueryClient } from "@tanstack/react-query-persist-client";
// import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import "./index.css";

const queryClient = new QueryClient();

// const localStoragePersister = createAsyncStoragePersister({
//   storage: window.localStorage,
//   key: "my-query-cache", // optional, defaults to "REACT_QUERY_OFFLINE_CACHE"
//   serialize: JSON.stringify,
//   deserialize: JSON.parse,
// });

// // Persist queries automatically
// persistQueryClient({
//   queryClient,
//   persister: localStoragePersister,
// });

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <TanStackDevtools
        plugins={[
          {
            name: "TanStack Query",
            render: <ReactQueryDevtoolsPanel />,
            defaultOpen: true,
          },
        ]}
      />
    </QueryClientProvider>
  </StrictMode>
);
