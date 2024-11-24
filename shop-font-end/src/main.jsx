import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.css";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CartPro } from "./hooks/CartContext";

export const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <CartPro>
      <App />
    </CartPro>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);
