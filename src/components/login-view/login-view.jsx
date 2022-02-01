import React, { useState } from 'react';
import propTypes from 'prop-types';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
    };

    const handleRegistration = (e) => {
        e.preventDefault();
        console.log(username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.toRegistrationView(username);
    };

    return (
        <Row className="justify-content-md-center text-center">
            <Col md={5}>
                <Card border="danger" className="mt-5">
                    <Card.Body>
                        <Card.Title><h1>Welcome to MyMovies</h1></Card.Title>
                        <Form>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="..." value={username} onChange={e => setUsername(e.target.value)}/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="..." value={password} onChange={e => setPassword(e.target.value)}/>
                            </Form.Group>
                            <Button variant="danger" type="submit" className="mr-2" onClick={handleSubmit}>Submit</Button>
                            <Button variant="secondary" className="mr-2" type="submit" onClick={handleRegistration}>Register</Button> 
                            <Button variant="secondary" className="mr-2" type="submit" onClick={handleRegistration}>Logout</Button> 
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
// propTypes - Give warnings in browser/console if data does not match with the required.
LoginView.propTypes = {
    onLoggedIn: propTypes.func.isRequired,
    toRegistrationView: propTypes.func//temporarily not required 
}