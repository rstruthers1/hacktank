import React from 'react';

const Team = ({ teamName, hacks, onVote, budget }) => {
    /*
     "hackId": curr.hackId,
                    "hackName": curr.hackName,
                    "hackType": curr.hackType,
                    "investmentId": curr.investmentId || null,
                    "investmentCapital": curr.investmentCapital || 0
     */
    return (
        <>
        <div className="team">
            <h2>{teamName}</h2>
            <ul>
                {hacks.map(hack => (
                    <li key={hack.hackId}>
                        {hack.hackName}: <input value={hack.investmentCapital}/>

                    </li>
                ))}
            </ul>
        </div>









        </>
    );
};


export default Team;