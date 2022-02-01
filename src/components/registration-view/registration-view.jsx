import React, { useState } from 'react';
import propTypes from 'prop-types';
import './registration-view.scss';
import { Container, Row, Col, Card,Form, Button } from 'react-bootstrap';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth, setBirth ] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onRegister(username, password, email, birth)
    };

    return (
        <Container>
            <Row className='justify-content-md-center text-center'>
                <Col md={5}>
                    <Card border="danger" className="mt-5">
                        <Card.Body>
                        <Card.Title className="mb-4"><h3>Register here brother!</h3></Card.Title>
                            <Form>
                                <Form.Group className="mb-4" controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" placeholder="..." value={username} onChange={e => setUsername(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="..." value={password} onChange={e => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="..." value={email} onChange={e => setEmail(e.target.value)}/>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control type="text" placeholder="..." value={birth} onChange={e => setBirth(e.target.value)}/>
                                </Form.Group>
                                <Button variant="secondary" type="submit" onClick={handleSubmit}>Register</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
// propTypes - Give warnings in browser/console if data does not match with the required.
RegistrationView.propTypes = {
    onRegister: propTypes.func//temporarily not required 
}