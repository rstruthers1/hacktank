import React, {useEffect, useState} from "react";
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchInvestments, getInvestments, getInvestmentsError, getInvestmentsStatus, postedInvestmentsStatus
} from "../slices/investment";
import HacksInvestmentsForm from "./HacksInvestmentsForm";
import {fetchInvestor, getInvestor, getInvestorError, getInvestorStatus} from "../slices/investor";
import {Atom} from "react-loading-indicators";

const Dashboard = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const investments = useSelector(getInvestments);
    const investmentsStatus = useSelector(getInvestmentsStatus);
    const error = useSelector(getInvestmentsError);

    const investor = useSelector(getInvestor)
    const investorStatus = useSelector(getInvestorStatus);
    const investorError = useSelector(getInvestorError);



    useEffect(() => {

            dispatch(fetchInvestments(currentUser.id));
            dispatch(fetchInvestor(currentUser.id))
    }, [currentUser.id]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }


  /*
    let investmentsContent = 'TODO: list investments';

    if (investmentsStatus === 'loading' || investorStatus === 'loading') {
        investmentsContent = <h2>Loading...</h2>
    } else if (investmentsStatus === 'succeeded' && investorStatus === 'succeeded') {
        investmentsContent = <div>
            <HacksInvestmentsForm investments={investments} investor={investor}/>
        </div>
    } else if (investmentsStatus === 'failed') {
        investmentsContent = <p>{JSON.stringify(error)}</p>;
    }

   */

  return (
    <div className="container">

        <h1>
           Team {currentUser.username}
        </h1>


        <div>
            <HacksInvestmentsForm investments={investments} investor={investor}/>
        </div>

    </div>
  );
};

export default Dashboard;
