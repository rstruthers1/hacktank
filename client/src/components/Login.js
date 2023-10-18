import React, { useState, useEffect  } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import { login } from "../slices/auth";
import { clearMessage } from "../slices/message";
import {LinkContainer} from "react-router-bootstrap";

const Login = () => {
    let navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const { isLoggedIn } = useSelector((state) => state.auth);
    const { message } = useSelector((state) => state.message);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("This field is required!"),
        password: Yup.string().required("This field is required!"),
    });

    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);

        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate("/dashboard");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
    };

    /*
    if (isLoggedIn) {
        return <Navigate to="/profile" />;
    }

     */

    return (
        <div className="col-md-12 login-form">
            <div className="card card-container">

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Field name="username" type="text" className="form-control" />
                            <ErrorMessage
                                name="username"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Field name="password" type="password" className="form-control" />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="alert alert-danger"
                            />
                        </div>

                        <div className="form-group" style={{paddingTop: "10px"}}>
                            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
                                {loading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Login</span>
                            </button>

                        </div>
                        <div className="form-group" style={{paddingTop: "10px"}}>
                            <LinkContainer to="/register">
                                <a>Don't have an account? Register</a>
                            </LinkContainer>
                        </div>
                    </Form>
                </Formik>
            </div>

            {message && (
                <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                        {message}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;
