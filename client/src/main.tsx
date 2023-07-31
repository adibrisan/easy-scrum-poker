import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PokerPage from "./PokerPage";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderBar from "./components/HeaderBar/HeaderBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:roomId",
    element: <PokerPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider>
      <HeaderBar />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
