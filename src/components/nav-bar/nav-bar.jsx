import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

export function NavBar({user}) {
    
    const onLoggedOut = () => {
        localStorage.clear();
        window.open("/", "_self")
    }

    const isAuth = () => {
        if (typeof window == "undefined") {
            return false;
        }
        if (localStorage.getItem("token")) {
            return localStorage.getItem("token");
        } else {
            return false;
        }
    };

    return (
        <Navbar className="main-nav mb-5 pb-3 bg-danger" border="primary" sticky="top" variant="light" expand="lg">
            <Container className="bg-danger">
                <Navbar.Brand className="text-white" href="/">MyMovies</Navbar.Brand>
                <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="bg-danger" id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isAuth() && (<Nav.Link className="bg-danger" href={`/users/${user}`}>{user}</Nav.Link>)}
                    {isAuth() && (<Button className="bg-danger" variant="link" onClick={() => {onLoggedOut() }}>Logout</Button>)}
                    {!isAuth() && (<Nav.Link className="bg-danger" href="/">Sign-in</Nav.Link>)}
                    {!isAuth() && (<Nav.Link className="bg-danger" href="/register">Sign-up</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}