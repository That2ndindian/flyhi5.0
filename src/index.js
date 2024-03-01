import * as React from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Route, Link, Outlet, } from "react-router-dom";
import Home from "./routes/Home";
import Help from "./routes/Help";
import Booking from "./routes/Booking"
import Payments from "./routes/Payments";
import Navbar from "./components/navbar";
import {BookingProvider}  from './routes/BookingContent';
import Confirmation from './routes/Confirmation'
import Login from "./routes/Login"
import CarRentalsPage from "./routes/rentalcar";

const AppLayout = () => {
  return (
    <BookingProvider>
        <>
          <Navbar />
          <Outlet />
        </>
    </BookingProvider>
  );
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "booking",
        element: <Booking />,
      },
      {
        path: "CarRentalsPage",
        element: <CarRentalsPage/>
      },

      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "confirmation",
        element: <Confirmation />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "help",
        element: <Help />,
      },]
  },

]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);