import React, { lazy } from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const Payment = lazy(() => import("./components/Payment"));
const Login = lazy(() => import("./components/Login"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/payment" />,
  },
  {
    path: "/payment",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Payment />
      </React.Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <React.Suspense fallback={<div>Loading...</div>}>
        <Login />
      </React.Suspense>
    ),
  },
]);

function App(): React.ReactElement {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
