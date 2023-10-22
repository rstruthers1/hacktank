import React, {useEffect, useState} from 'react';
import './TeamHacksTable.css';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchHackInvestmentTotals, getHackInvestmentTotals,
} from "../slices/hackInvestmentTotals";



const InvestmentRankings = () => {
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


    function getTotalInvested() {
        if (!hackInvestmentTotals) {
            return 0;
        }
        let total = 0;
        for (let i = 0; i < hackInvestmentTotals.length; i++) {
            const hackInv = hackInvestmentTotals[i];
            let hackTotal = 0;
            try {
                hackTotal = parseInt(hackInv.totalCapital);
            } catch (err) {
                console.error(err);
            }
            total = total + hackTotal;
        }
        return total;
    }

    return (
        <div className="container">
            <h1 className="text-center" >
                SAP Concur Hackathon 2023
            </h1>
        <div>
            <h2 className="text-center" style={{marginTop: "20px", marginBottom: "10px"}}>Current Rankings</h2>
            <div className="text-center" style={{color: "white",  fontSize:"large"}}>Total Invested: ${getTotalInvested()}</div>
            {hackInvestmentTotals &&

            <table  className="team-hacks-table">
                <thead>
                <tr>

                    <th>Hack Name</th>
                    <th>Hack Type</th>
                    <th>Team Name</th>
                    <th>Total Invested</th>
                </tr>
                </thead>
                <tbody>
                {
                    hackInvestmentTotals.map(hackInv =>
                        <tr>
                            <td>{hackInv.hackName}</td>
                            <td>{hackInv.hackType}</td>
                            <td>{hackInv.teamName}</td>
                            <td><p className="text-end">{hackInv.totalCapital}</p></td>
                        </tr>
                )
                }
                </tbody>
            </table>
            }
            {/* Status indicator displaying the last updated date and time */}
            {lastUpdated && (
                <>
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    Latest Rankings as of {lastUpdated}
                </div>
                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: 'small' }}>
                    Updates every 30 seconds
                </div>
                </>
            )}
        </div>
        </div>
    );
};

export default InvestmentRankings;
