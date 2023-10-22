import React, {useEffect} from "react";
import { Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {
    fetchInvestments
} from "../slices/investment";
import HacksInvestmentsForm from "./HacksInvestmentsForm";
import {fetchInvestor} from "../slices/investor";


const Invest = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const investments = useSelector(getInvestments);


    const investor = useSelector(getInvestor)




    useEffect(() => {
        if (currentUser?.id) {
            dispatch(fetchInvestments(currentUser.id));
            dispatch(fetchInvestor(currentUser.id))
        }
    }, [currentUser?.id]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }



  return (
    <div className="container">

        <h1 className="text-center">
           Team {currentUser.username}
        </h1>



        <div>
            <HacksInvestmentsForm investments={investments} investor={investor}/>
        </div>

    </div>
  );
};

export default Invest;
