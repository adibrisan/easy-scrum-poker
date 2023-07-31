import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import PokerPage from "./PokerPage";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HeaderBar from "./components/HeaderBar/HeaderBar";
import { UserDataProvider } from "./context/UserDataContext";

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
      <UserDataProvider>
        <HeaderBar />
        <RouterProvider router={router} />
      </UserDataProvider>
    </ChakraProvider>
  </React.StrictMode>
);
