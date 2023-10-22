import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginPage.css';
import {Button, Container} from "react-bootstrap";



const LoginPage = () => {


    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{marginTop: "-10vh"}}>
            <form className="p-4 border rounded">
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    Submit
                </button>
            </form>

        </div>

    );
};

export default LoginPage;