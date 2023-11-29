import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import UncontrolledForm from "./UncontrolledForm";
import ControlledForm from "./ControlledForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,},
      {
        path: "uncontrolled-form",
        element: <UncontrolledForm />,
      },
      {
        path: "controlled-form",
        element: <ControlledForm />,
      },
  
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
