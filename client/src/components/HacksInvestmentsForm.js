import React, {useEffect, useState} from "react";
import './TeamHacksTable.css';
import {Alert, Button, Col, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {ThreeDot} from "react-loading-indicators";
import {
    postedInvestmentsStatus,
    postInvestments,
    investmentsOperation

} from "../slices/investment";
import RandomLoadingIndicator from "./RandomLoadingIndicator";
import 'font-awesome/css/font-awesome.min.css'



const HacksInvestmentsForm = ({investments, investor}) => {
    const [teamsData, setTeamsData] = useState([])
    const [editedInvestments, setEditedInvestments] = useState({});
    const [totalInvestments, setTotalInvestments] = useState(0);
    const [remainingBudget, setRemainingBudget] = useState(0);

    const dispatch = useDispatch();
    const postedInvestmentsStatusSelector = useSelector(postedInvestmentsStatus);
    const investmentsOperationSelector = useSelector(investmentsOperation);
    const { user: currentUser,  isLoggedIn } = useSelector((state) => state.auth);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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

        setTeamsData(output)
        // [`${teamId}-${hackId}`]: value
        const teamHackAmounts = {}
        investments.forEach(inv => {
            teamHackAmounts[`${inv.teamId}-${inv.hackId}`] = inv.investmentCapital;
        })
        setEditedInvestments(teamHackAmounts)

    }, [postedInvestmentsStatusSelector]);

    useEffect(() => {
        if (postedInvestmentsStatusSelector !== 'loading') {
            // Calculate total investments whenever editedInvestments or data changes
            const calculatedTotal = Object.values(editedInvestments).reduce((acc, investment) => acc + parseInt(investment || 0, 10), 0);
            setTotalInvestments(calculatedTotal);
            // Calculate remaining budget
            setRemainingBudget(investor.budget - calculatedTotal);
        }
    }, [editedInvestments, currentUser?.id, investor, postedInvestmentsStatusSelector]);

    const handleInvestmentChange = (teamId, hackId, value) => {
        setEditedInvestments(prevState => ({
            ...prevState,
            [`${teamId}-${hackId}`]: value
        }));
    };



    const submitInvestments = () => {

        const convertedData = investments.map(item => {
            const investmentKey = `${item.teamId}-${item.hackId}`;
            return {
                ...item,
                investmentId: item.investmentId || null,
                investmentCapital: editedInvestments[investmentKey] || null
            };
        });
        dispatch(postInvestments({id: investor.id, investments: convertedData}))
    }

    const handleSubmitInvestments = (ev) => {
        ev.preventDefault();
        if (totalInvestments > investor.budget) {
            handleShow()
        } else {
            submitInvestments()
        }
    }

   if (!isLoggedIn) {
       return  <><h2 className="text-center">Hack Investments</h2>
           <Row style={{marginBottom: "40px", marginTop: "30px"}}>
               <Col lg={4} className="m-auto" >
                   <div style={{textAlign: "center"}}>You must be logged in to invest</div>

               </Col>
           </Row>
           </>
   }

    return (

        <>
            <h2 className="text-center">Hack Investments</h2>

            <Row style={{marginBottom: "40px", marginTop: "30px"}}>
                <Col lg={4} className="m-auto" >
                    <div style={{textAlign: "center"}}>Total Budget: ${investor.budget}</div>
                    <div style={{textAlign: "center"}}>Total Investments: ${totalInvestments}</div>
                    <div style={{textAlign: "center"}}>Remaining Budget: ${remainingBudget}</div>
                </Col>
            </Row>


            {postedInvestmentsStatusSelector === 'loading'  && investmentsOperationSelector === 'fetch' ?
                <ThreeDot  color="darkgrey" size="medium" text="Loading" textColor="" /> :
            <div>
                { totalInvestments > investor.budget && <Alert variant="warning">
                    Warning: you are over budget by ${ totalInvestments - investor.budget}
                </Alert>}
                <table className="team-hacks-table" >
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
                                        value={editedInvestments[`${team.teamId}-${hack.hackId}`]}
                                        onChange={(e) => handleInvestmentChange(team.teamId, hack.hackId, e.target.value)}
                                    /></td>
                                </tr>
                            ))}
                        </React.Fragment>
                    ))}
                    </tbody>
                </table>
                <Button disabled={(postedInvestmentsStatusSelector === 'loading') || (totalInvestments > investor.budget)}
                        onClick={handleSubmitInvestments}>Save</Button>

                {postedInvestmentsStatusSelector === 'loading'  && investmentsOperationSelector === 'save' &&
                    <div style={{marginTop: "20px"}}>

                        <RandomLoadingIndicator color="darkgrey"  text="Saving, hang on!"
                            size="medium"/>
                    </div>
                }

            </div>
            }


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><i className="fa fa-exclamation-triangle text-warning mr-2"></i>&nbsp;Warning</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are over budget. Please adjust your investments before submitting.</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>

                </Modal.Footer>
            </Modal>

        </>
    )
}

export default HacksInvestmentsForm;