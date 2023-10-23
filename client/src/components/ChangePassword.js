import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import {login, register} from "../slices/auth";
import { clearMessage } from "../slices/message";
import {LinkContainer} from "react-router-bootstrap";
import {Row} from "react-bootstrap";

const ChangePassword = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Navigate to="/login" />;
    }


    const initialValues = {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string().required("This field is required!"),
        newPassword: Yup.string().required("This field is required!"),
        confirmNewPassword: Yup.string().required("This field is required!")
    });

    const handleChangePassword = (formValue) => {
        const { currentPassword, newPassword, confirmNewPassword } = formValue;


        /*
        dispatch(register({ currentPassword, newPassword, confirmNewPassword }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
            })
            .catch(() => {
                setSuccessful(false);
            });

         */
    };


    return (
        <>
            <div style={{paddingTop: "50px", paddingBottom: "20px"}}>
        <h2 className="text-center">Change Password for Team {currentUser.username}</h2>
            </div>
            <div className="col-md-12 signup-form">

            <div className="card card-container">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleChangePassword}
                >
                    <Form>
                        {!successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor="currentPassword">Current Password</label>
                                    <Field name="currentPassword" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="currentPassword"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password</label>
                                    <Field name="newPassword" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="newPassword"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                                    <Field name="confirmNewPassword" type="text" className="form-control" />
                                    <ErrorMessage
                                        name="confirmNewPassword"
                                        component="div"
                                        className="alert alert-danger"
                                    />
                                </div>

                                <div className="form-group" style={{paddingTop: "10px"}}>
                                    <button type="submit" className="btn btn-primary btn-block">Change Password</button>
                                </div>
                            </div>
                        )}
                    </Form>
                </Formik>
            </div>

            {message && (
                <div className="form-group">
                    <div
                        className={successful ? "alert alert-success" : "alert alert-danger"}
                        role="alert"
                    >
                        {message}
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default ChangePassword;
