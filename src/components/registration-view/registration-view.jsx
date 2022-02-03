import React, { useState } from 'react';
import propTypes from 'prop-types';
import './registration-view.scss';
import { Container, Row, Col, Card,Form, Button } from 'react-bootstrap';
import axios from 'axios';

export function RegistrationView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birth, setBirth ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');
    const [ emailErr, setEmailErr ] = useState('');
    const [ birthErr, setBirthErr ] = useState('');

    const validate = () => {
        let isReq = true;
        if(!username){
            setUsernameErr('Username is required.');
            isReq = false;
        }else if(username.length < 5){
            setUsernameErr('Username must be at least 5 characters long.');
            isReq = false;
        }
        if(!password){
            setPasswordErr('Password is required.');
            isReq = false;
        }else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long.');
            isReq = false;
        }
        if(!email){
            setEmailErr('Email is required.');
            isReq = false;
        }else if(email.indexOf('@') === -1){
            setEmailErr('Email should contain "@".')
            isReq = false;
        }
        if(!birth){
            setBirthErr('Birthday is required.');
            isReq = false;
        }
        return isReq;
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if(isReq){
            axios.post('https://mymovies-api-jbm.herokuapp.com/users', {
                Username: username,
                Password: password,
                Email: email,
                Birth: birth
            })
            .then(response => {
                const data = response.data;
                console.log(data);
                alert('You have been successfully registered, please log in.');
                window.open('/', '_self');//'_self' to make sure that opens in the same tab instead of another one as is on default.
            })
            .catch(e => {
                console.error(response)
                alert('unable to register.');
            }); 
        }  
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
                                    <Form.Control type="text" placeholder="At least 5 characters" value={username} onChange={e => setUsername(e.target.value)}/>
                                    {/* code added here to display validation error */}
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="At least 5 characters" value={password} onChange={e => setPassword(e.target.value)}/>
                                    {/* code added here to display validation error */}
                                    {passwordErr && <p>{passwordErr}</p>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formEmail">
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="email" placeholder="Do not forget to use '@'" value={email} onChange={e => setEmail(e.target.value)}/>
                                    {/* code added here to display validation error */}
                                    {emailErr && <p>{emailErr}</p>}
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="formBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control type="text" placeholder="You dont need to be honest :)" value={birth} onChange={e => setBirth(e.target.value)}/>
                                    {/* code added here to display validation error */}
                                    {emailErr && <p>{emailErr}</p>}
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