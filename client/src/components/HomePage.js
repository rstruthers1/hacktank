import {Col} from "react-bootstrap";
import sharkTankImage1 from "../images/shark-in-tank.png";
import {useDispatch, useSelector} from "react-redux";
import React, {useCallback, useEffect} from "react";
import { logout } from "../slices/auth";

import EventBus from "../common/EventBus";
import {LinkContainer} from "react-router-bootstrap";
import {fetchHackInvestmentTotals} from "../slices/hackInvestmentTotals";


import StockTicker2 from "./StockTicker2";
import InvestmentRankings from "./InvestmentRankings";


const HomePage = () => {


    const dispatch = useDispatch();
    const { user: currentUser,  isLoggedIn } = useSelector((state) => state.auth);


    const logOut = useCallback(() => {
        console.log("Log out")
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchHackInvestmentTotals());
    }, [])

    useEffect(() => {


        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (<div>
<InvestmentRankings/>
    </div>)
}

export default HomePage;