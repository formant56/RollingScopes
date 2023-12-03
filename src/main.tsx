import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import UncontrolledForm from './UncontrolledForm';
import ControlledForm from './ControlledForm';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'uncontrolled-form',
    element: <UncontrolledForm />,
  },
  {
    path: 'controlled-form',
    element: <ControlledForm />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
