import {Outlet} from "react-router-dom";
import {Nav, Navbar, NavDropdown} from "react-bootstrap";
import {LinkContainer} from 'react-router-bootstrap'
import {GiSharkFin, GiSharkJaws} from "react-icons/gi";


export default function Root() {
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
                    <NavDropdown title="Team" id="basic-nav-dropdown" >
                        <LinkContainer to="/dashboard">
                            <NavDropdown.Item >Dashboard</NavDropdown.Item>
                        </LinkContainer>
                    </NavDropdown>
                </Nav>
            </Navbar>
            <div id="detail"><Outlet/></div>
        </>
    );
}