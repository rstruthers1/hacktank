import {Outlet} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {GiSharkFin} from "react-icons/gi";
import {useSelector} from "react-redux";


export default function Root() {
    const { isLoggedIn } = useSelector((state) => state.auth);
    return (
        <>
            <Navbar style={{background: "lightgray"}}>
                <LinkContainer to="/">
                    <Navbar.Brand >
                        <div style={{display: "flex", justifyContent: "center", verticalAlign: "bottom"}}>
                        <GiSharkFin style={{verticalAlign: "bottom", height:"50px", marginLeft: "5px"}}/>
                        </div>
                    </Navbar.Brand>
                </LinkContainer>
                <Nav>
                    <NavDropdown title="Sharks" id="basic-nav-dropdown" >
                        <LinkContainer to="/invest">
                            <NavDropdown.Item disabled={!isLoggedIn}>Invest</NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/rankings">
                            <NavDropdown.Item disabled={!isLoggedIn}>View Rankings</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <div id="detail" style={{background: "black", color: "white", minHeight: "100vh"}}><Outlet/></div>
        </>
    );
}