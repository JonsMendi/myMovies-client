import react from 'react';
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
        <Navbar className="main-nav mb-5 pb-3" sticky="top" bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">MyMovies</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {isAuth() && (<Nav.Link href={`/users/${user}`}>{user}</Nav.Link>)}
                    {isAuth() && (<Button variant="link" onClick={() => {onLoggedOut() }}>Logout</Button>)}
                    {!isAuth() && (<Nav.Link href="/">Sign-in</Nav.Link>)}
                    {!isAuth() && (<Nav.Link href="/register">Sign-up</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}