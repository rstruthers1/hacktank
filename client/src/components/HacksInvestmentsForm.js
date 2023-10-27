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
import sharkTankJudgeImageLeftFacing from "../images/shark-judge-facing-left.png";
import sharkTankJudgeImageRightFacing from "../images/shark-judge-facing-right.png";
import {useGetHackEventByIdQuery} from "../services/hackEventApi";

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
    const [deadline, setDeadline] = useState(null);
    const [votingOpen, setVotingOpen] = useState(true);
    const [timeLeft, setTimeLeft] = useState('');


    const {
        data: hackEvent,
        isLoading,
        isFetching
    } = useGetHackEventByIdQuery(1, {
        skip: false,
    })


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Check if the current time is past the deadline
    useEffect(() => {
        if (deadline) {
            const interval = setInterval(() => {
                const currentTime = new Date();
                const timeDifference = deadline - currentTime;
                if (currentTime > deadline) {
                    setVotingOpen(false);
                    setTimeLeft('Time is up!');
                } else {

                    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
                    let formattedTimeLeft = ""
                    if (days > 0) {
                        formattedTimeLeft = `${days}d `;
                    }
                    if (hours > 0) {
                        formattedTimeLeft = `${hours}h `
                    }


                    // Format the time left as a string
                    formattedTimeLeft = formattedTimeLeft + `${minutes}m ${String(seconds).padStart(2, '0')}s`;
                    setTimeLeft(formattedTimeLeft);
                }
            }, 1000);

            // Clear the interval when the component is unmounted or when voting is closed
            return () => clearInterval(interval);
        }
    }, [deadline]);

    useEffect(() => {
        console.log(`*** hackEvent: ${JSON.stringify(hackEvent)}`)
        try {
            const incomingDeadline = new Date(Date.parse(hackEvent?.votingDeadline));
            setDeadline(incomingDeadline)
        } catch (err) {
            console.error(err)
        }
    }, [hackEvent])



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

    const timeLeftStyle = {
        fontSize: '24px',
        fontWeight: 'bold'
        // Add more CSS styles as needed
    };

    function getDeadlineString() {
        let deadlineString = "";
        if (deadline) {
            try {
                deadlineString = deadline.toLocaleString()
            } catch (err) {
                console.err(err)
            }
        }
        return deadlineString;
    }

    return (

        <>
            <h1 className="text-center">
                Team {investor.teamName}
            </h1>
            <div className="row">
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={sharkTankJudgeImageRightFacing} className="img-fluid center-image" alt="Left Image" width="150px"/>
                </div>
                <div className="col-md-4 middle-text">
            <h2 className="text-center">Hack Investments</h2>
            <div style={{textAlign: "center"}}>Total Budget: ${investor.budget}</div>
            <div style={{textAlign: "center"}}>Total Investments: ${totalInvestments}</div>
            <div style={{textAlign: "center"}}>Remaining Budget: ${remainingBudget}</div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <img src={sharkTankJudgeImageLeftFacing} className="img-fluid center-image" alt="Right Image" width="150px"/>
                </div>
            </div>


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
                                        disabled={postedInvestmentsStatusSelector === 'loading' || !votingOpen}
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
                <div style={{paddingTop: "20px", textAlign: "center"}}>
                    <div>
                        Deadline: {getDeadlineString()}
                    </div>
                    <div>
                        Voting open: {votingOpen ? "Yes" : "No"}
                    </div>
                    <div style={{fontSize: 'large',
                        fontWeight: 'bold'}}>
                        Time remaining:
                    </div>
                    <div>
                        <pre style={timeLeftStyle}>
                        {timeLeft}
                            </pre>
                    </div>
                </div>

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