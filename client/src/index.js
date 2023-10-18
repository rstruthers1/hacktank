import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
import reportWebVitals from './reportWebVitals';
import RouterErrorPage from "./RouterErrorPage";
import HomePage from "./components/HomePage";

import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <RouterErrorPage/>,

        children: [
            { path: "", element: <HomePage/> },
            {
                path: "register",
                element: <Register/>,
            },
            {
                path: "dashboard",
                element: <Dashboard/>,
            },
            {
                path: "login",
                element: <Login/>,
            }
        ]
    }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
