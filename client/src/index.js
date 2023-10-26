import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Root from "./routes/root";
// import reportWebVitals from './reportWebVitals';
import RouterErrorPage from "./RouterErrorPage";
import HomePage from "./components/HomePage";

import { Provider } from "react-redux";
import store from "./store";
import Register from "./components/Register";
import Login from "./components/Login";
import Invest from "./components/Invest";
import InvestmentRankings from "./components/InvestmentRankings";
import LoginPage from "./components/LoginPage";

import StockTicker2 from "./components/StockTicker2";
import ChangePassword from "./components/ChangePassword";


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
                path: "invest",
                element: <Invest/>,
            },
            {
                path: "rankings",
                element: <InvestmentRankings/>,
            },
            {
                path: "login",
                element: <Login/>,
            }
            ,
            {
                path: "loginPage",
                element: <LoginPage/>,
            }
            ,
            {
                path: "stocks2",
                element: <StockTicker2/>,
            },
            {
                path: "changePassword",
                element: <ChangePassword/>,
            },
            {
                path: "register",
                element: <Register/>,
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
//reportWebVitals();
