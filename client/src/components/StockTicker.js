import React, {useEffect, useState} from 'react';
import './StockTicker.css';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchHackInvestmentTotals,
    getHackInvestmentTotals, getHackInvestmentTotalsError,
    getHackInvestmentTotalsStatus
} from "../slices/hackInvestmentTotals";

const stocks = [
    { name: 'AAPL', price: '$150.25' },
    { name: 'GOOGL', price: '$2800.50' },
    { name: 'AMZN', price: '$3450.75' },
    // Add more stock objects as needed
];

const StockTicker = () => {

    const dispatch = useDispatch();

    const hackInvestmentTotals = useSelector(getHackInvestmentTotals);
    const hackInvestmentTotalsStatus = useSelector(getHackInvestmentTotalsStatus);
    const hackInvestmentTotalsError = useSelector(getHackInvestmentTotalsError);
    const [stocks, setStocks] = useState([])


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

                // For demonstration purposes, dispatching mock data
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

    useEffect(() => {
        if (hackInvestmentTotals) {
            setStocks([...hackInvestmentTotals, ...hackInvestmentTotals, ...hackInvestmentTotals, ...hackInvestmentTotals])
        }
    }, [hackInvestmentTotals])

    return ( <div style={{paddingTop: "30px"}}>
            <div className="stock-ticker-container">
                <div className="stock-ticker">
                    {stocks.map((hack, index) => (
                        <span key={index}>{hack.hackName}: ${hack.totalCapital}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StockTicker;
