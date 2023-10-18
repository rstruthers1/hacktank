import React, {useEffect, useState} from "react";
import './TeamHacksTable.css';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {Atom, Mosaic, ThreeDot} from "react-loading-indicators";
import {
    postedInvestments,
    postedInvestmentsStatus,
    postedInvestmentsError,
    postInvestments,
    investmentsOperation

} from "../slices/investment";
import RandomLoadingIndicator from "./RandomLoadingIndicator";




const HacksInvestmentsForm = ({investments, investor}) => {
    const [teamsData, setTeamsData] = useState([])
    const [editedInvestments, setEditedInvestments] = useState({});
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(investor.budget);

    const dispatch = useDispatch();
    const postedInvestmentsSelector = useSelector(postedInvestments);
    const postedInvestmentsStatusSelector = useSelector(postedInvestmentsStatus);
    const postedInvestmentErrorSelector = useSelector(postedInvestmentsError);
    const investmentsOperationSelector = useSelector(investmentsOperation);

    console.log(`*** HacksInvestmentsForm, investor: ${JSON.stringify(investor)}`)
    console.log(`*** HacksInvestmentsForm, investments: ${JSON.stringify(investments)}`)

    useEffect(() => {
        // Calculate total investments whenever editedInvestments or data changes
        const calculatedTotal = Object.values(editedInvestments).reduce((acc, investment) => acc + parseInt(investment || 0, 10), 0);
        setTotalInvestments(calculatedTotal);
        // Calculate remaining budget
        setRemainingBudget(investor.budget - calculatedTotal);
    }, [editedInvestments, teamsData]);

    const handleInvestmentChange = (teamId, hackId, value) => {
        setEditedInvestments(prevState => ({
            ...prevState,
            [`${teamId}-${hackId}`]: value
        }));
    };

    useEffect(() => {
        const output = investments.reduce((acc, curr) => {
            const team = acc.find(item => item.teamId === curr.teamId);
            if (team) {
                team.hacks.push({
                    "hackId": curr.hackId,
                    "hackName": curr.hackName,
                    "hackType": curr.hackType,
                    "investmentId": curr.investmentId || null,
                    "investmentCapital": curr.investmentCapital || ''
                });
            } else {
                acc.push({
                    "teamId": curr.teamId,
                    "teamName": curr.teamName,
                    "hacks": [
                        {
                            "hackId": curr.hackId,
                            "hackName": curr.hackName,
                            "hackType": curr.hackType,
                            "investmentId": curr.investmentId || null,
                            "investmentCapital": curr.investmentCapital || ''
                        }
                    ]
                });
            }
            return acc;
        }, []);

        console.log(JSON.stringify(output, null, 2));
        setTeamsData(output)
        // [`${teamId}-${hackId}`]: value
        const teamHackAmounts = {}
        investments.forEach(inv => {
            teamHackAmounts[`${inv.teamId}-${inv.hackId}`] = inv.investmentCapital;
        })
        setEditedInvestments(teamHackAmounts)

    }, [investments, investor]);

    const submitInvestments = () => {
        const convertedData = investments.map(item => {
            const investmentKey = `${item.teamId}-${item.hackId}`;
            return {
                ...item,
                investmentId: item.investmentId || null,
                investmentCapital: editedInvestments[investmentKey] || null
            };
        });
        console.log(`*** convertedData: ${JSON.stringify(convertedData)}`)
        console.log(`*** investor: ${JSON.stringify(investor)}`)
        dispatch(postInvestments({id: investor.id, investments: convertedData}))

    }

    const handleSubmitInvestments = (ev) => {
        ev.preventDefault();
        submitInvestments()
    }


    return (
        <>
            <h2>Hack Investments</h2>

            {postedInvestmentsStatusSelector === 'loading'  && investmentsOperationSelector === 'fetch' ?
                <ThreeDot  color="darkgrey" size="medium" text="Loading" textColor="" /> :
            <div>
                <div>Total Budget: ${investor.budget}</div>
                <div>Total Investments: ${totalInvestments}</div>
                <div>Remaining Budget: ${remainingBudget}</div>
                <table className="team-hacks-table">
                    <thead>
                    <tr>
                        <th>Team Name</th>
                        <th>Hack Name</th>
                        <th>Hack Type</th>
                        <th>Investment Capital</th>
                    </tr>
                    </thead>
                    <tbody>
                    {teamsData.map((team) => (
                        <React.Fragment key={team.teamId}>
                            <tr>
                                <td rowSpan={team.hacks.length + 1}>{team.teamName}</td>
                            </tr>
                            {team.hacks.map((hack) => (
                                <tr key={hack.hackId}>
                                    <td>{hack.hackName}</td>
                                    <td>{hack.hackType}</td>
                                    <td><input
                                        disabled={postedInvestmentsStatusSelector === 'loading'}
                                        type="text"
                                        value={editedInvestments[`${team.teamId}-${hack.hackId}`] || hack.investmentCapital}
                                        onChange={(e) => handleInvestmentChange(team.teamId, hack.hackId, e.target.value)}
                                    /></td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                <Button disabled={postedInvestmentsStatusSelector === 'loading'} onClick={handleSubmitInvestments}>Save</Button>
                {postedInvestmentsStatusSelector === 'loading'  && investmentsOperationSelector === 'save' &&
                    <div style={{marginTop: "20px"}}>

                        <RandomLoadingIndicator color="darkgrey"  text="Saving, hang on!"
                            size="medium"/>
                    </div>
                }
            </div> }

        </>
    )
}

export default HacksInvestmentsForm;