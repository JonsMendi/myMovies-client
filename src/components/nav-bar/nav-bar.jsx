import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import './nav-bar.scss';

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
        <Navbar className="main-nav project-jo mb-5 pb-3" border="primary" sticky="top" variant="light" expand="lg">
            <Container className="bg-dark">
                <Navbar.Brand className="text-white" href="/">MyMovies</Navbar.Brand>
                <Navbar.Toggle  aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="bg-dark" id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isAuth() && (<Nav.Link className="bg-dark"  href={`/users/${user}`}>{user}</Nav.Link>)}
                    {isAuth() && (<Button className="bg-dark"  variant="link" onClick={() => {onLoggedOut() }}>Logout</Button>)}
                    {!isAuth() && (<Nav.Link className="bg-dark" href="/">Sign-in</Nav.Link>)}
                    {!isAuth() && (<Nav.Link className="bg-dark" href="/register">Sign-up</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}