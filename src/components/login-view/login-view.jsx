import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Card, Form, Button} from 'react-bootstrap';
import './login-view.scss'

export function LoginView(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ usernameErr, setUsernameErr ] = useState('');
    const [ passwordErr, setPasswordErr ] = useState('');

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
            setPasswordErr('Password is required.')
            isReq = false;
        }else if(password.length < 5){
            setPasswordErr('Password must be at least 5 characters long.');
            isReq = false;
        }
        return isReq;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
            if(isReq) {
            /* When a user clicks on the submit button of the login form, a POST request is made to the login endpoint of myMovies API using Axios. */
            axios.post('https://mymovies-api-jbm.herokuapp.com/login', {
                Username: username,
                Password: password
            })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('User does not exist')
                alert('User does not exist')
            });
        }
    };

    return (
        <Row className="justify-content-md-center text-center">
            <Col lg={9} md={8} sm={8}>
                <Card border="white" className="mt-5">
                    <Card.Body>
                        <Card.Title><h1>Welcome to MyMovies</h1></Card.Title>
                        <Form>
                            <Form.Group className="mb-4" controlId="formUsername">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="..." value={username} onChange={e => setUsername(e.target.value)}/>
                                {/* code added here to display validation error */}
                                    {usernameErr && <p>{usernameErr}</p>}
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="..." value={password} onChange={e => setPassword(e.target.value)}/>
                                 {/* code added here to display validation error */}
                                    {passwordErr && <p>{passwordErr}</p>}
                            </Form.Group>
                            <Button variant="outline-light" type="submit" className="mr-2" onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
// propTypes - Give warnings in browser/console if data does not match with the required.
LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired
      }),
    onLoggedIn: PropTypes.func.isRequired
}