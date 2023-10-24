import {Outlet} from "react-router-dom";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {GiSharkFin} from "react-icons/gi";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect} from "react";
import {logout} from "../slices/auth";
import EventBus from "../common/EventBus";


export default function Root() {

    const dispatch = useDispatch();
    const { user: currentUser,  isLoggedIn } = useSelector((state) => state.auth);

    const logOut = useCallback(() => {
        console.log("Log out")
        dispatch(logout());
    }, [dispatch]);

    useEffect(() => {


        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
        <>
            <Navbar style={{background: "lightgray"}} className="bg-body-tertiary" >
                <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <div style={{display: "flex", justifyContent: "center", verticalAlign: "bottom"}}>
                        <GiSharkFin style={{verticalAlign: "bottom", height:"50px", marginLeft: "5px"}}/>
                        </div>
                    </Navbar.Brand>
                </LinkContainer>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                        <LinkContainer to="/invest">
                            <Nav.Link disabled={!isLoggedIn}>Invest</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/rankings">
                            <Nav.Link >View Rankings</Nav.Link>
                        </LinkContainer>

                </Nav>
                <Nav>
                    {isLoggedIn ?
                    <>
                        <Navbar.Text>
                            Current Team: {currentUser.username}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </Navbar.Text>
                        <Nav.Link href="#logout" onClick={logOut}>Log out</Nav.Link>

                    </>:
                        <LinkContainer to="/login">
                            <Nav.Link href="#login">Log in</Nav.Link>
                        </LinkContainer>
                    }

                </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div id="detail" style={{background: "black", color: "white", minHeight: "100vh"}}><Outlet/></div>
        </>
    );
}