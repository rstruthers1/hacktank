import React, {useEffect, useState} from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeInLeft } from 'react-animations';
import {useDispatch, useSelector} from "react-redux";
import './StockTicker.css';
import {
    fetchHackInvestmentTotals,
    getHackInvestmentTotals
} from "../slices/hackInvestmentTotals";

const fadeInLeftAnimation = keyframes`${fadeInLeft}`;

const TickerContainer = styled.div`
 overflow: visible;
 // width: 100%;
  //background-color: #333;
  background-color: black;
  color: #fff;
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  animation: ${fadeInLeftAnimation} 1s, scroll 20s linear infinite;
`;


const StockTicker2 = () => {
    const dispatch = useDispatch();

    const hackInvestmentTotals = useSelector(getHackInvestmentTotals);

    const [lastUpdated, setLastUpdated] = useState(null);

    useEffect(() => {
        // Function to fetch or update data
        const fetchData = async () => {
            try {

                // Perform API request or data update operation here
                // For example:
                // const response = await fetch('/api/data');
                // const data = await response.json();
                // dispatch(setData(data));

                const currentTime = new Date().toLocaleString();
                setLastUpdated(currentTime);
                dispatch(fetchHackInvestmentTotals());
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // Fetch data immediately when the component mounts
        dispatch(fetchHackInvestmentTotals());
        const currentTime = new Date().toLocaleString();
        setLastUpdated(currentTime);

        // Refresh data every 30 seconds
        const intervalId = setInterval(fetchData, 30000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [dispatch]);

    return (
        <TickerContainer>
            {hackInvestmentTotals && hackInvestmentTotals.map((hack, index) => (
                <span key={index}>{hack.hackName}: ${hack.totalCapital} &nbsp;&nbsp;&nbsp;&nbsp;</span>
            ))}
        </TickerContainer>
    );
};

export default StockTicker2;