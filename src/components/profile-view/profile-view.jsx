import React from 'react';
import axios from 'axios';
import moment from 'moment';

import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';


export class ProfileView extends React.Component {
    constructor() {
        super();
        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birth: null,
            FavoriteMovies: [],
            
        };
    }

    componentDidMount() {
        
        this.getUser();
        console.log(this.props);
    }

    getUser = () => {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.get(`https://mymovies-api-jbm.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(response => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birth: response.data.Birth,
                FavoriteMovies: response.data.FavoriteMovies
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updateUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://mymovies-api-jbm.herokuapp.com/users/${Username}`, {
            Username: this.state.Username,
            Password: this.state.Password,
            Email: this.state.Email,
            Birth: this.state.Birth
        }, { headers: { Authorization: `Bearer ${token}` }, })
        .then((response) => {
            this.setState({
                Username: response.data.Username,
                Password: response.data.Password,
                Email: response.data.Email,
                Birth: response.data.Birth
            });
            localStorage.setItem('user', response.data.Username)
            alert('Profile was successfully updated');
            window.location.pathname = "/";
        })
        .catch(function (error) {
            console.log(error);
        });
        
    }

    deleteUser = (e) => {
        const confirmDelete = window.confirm('Confirm to remove :(')

        if (confirmDelete) {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        

        axios.delete(`https://mymovies-api-jbm.herokuapp.com/users/${Username}`, 
        {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            alert('Profile successfully deleted')
            window.location.pathname = "/";
        })
        .catch(function (error) {
            console.log(error);
        })};
    }

    removeFavoriteMovie = (e, movie) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://mymovies-api-jbm.herokuapp.com/users/${Username}/movies/${movie._id}`, 
        { 
            headers: { Authorization: `Bearer ${token}` } 
        })
        .then((response) => {
            console.log(response);
            alert('Movie was removed');
            this.componentDidMount();
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    setUsername(value){
        this.setState({
            Username: value,
        });
    }

    setPassword(value){
        this.setState({
            Password: value
        });
    }

    setEmail(value){
        this.setState({
            Email: value
        });
    }

    setBirth(value){
        this.setState({
            Birth: value
        });
    }

    render () {
        const { movie } = this.props;
        const { FavoriteMovies, Username, Email, Birth } = this.state;
        
        
        return (
            <Container className="profile-view" align="center" lg={2} md={6} xs={12}>
                <Row className="justify-content-md-center text-center">
                    <Col>
                        <Card border="dark">
                            <Card.Body >
                                <Card.Title><h3>{Username}</h3></Card.Title>  
                                <br/>
                                <Card.Text>Email: {Email}</Card.Text>
                                <Card.Text>Birthday: {moment(Birth).format('Do MMMM YYYY')}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="justify-content-md-center text-center">
                    <Col>
                        <Card border="dark" className="mt-5">
                            <Card.Body>
                                <Card.Title className="mb-4"><h4>Change Yourself!</h4></Card.Title>
                                <Form className="form-update">
                                    <Form.Group className="mb-4" controlId="formUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="text" name="Username" placeholder="New Username" value={Username || ""} onChange={(e) => this.setUsername(e.target.value)} required/>       
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" name="Password" placeholder="New Password" value={""} onChange={(e) => this.setPassword(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" name="Email" placeholder="New Email" value={Email || ""} onChange={(e) => this.setEmail(e.target.value)} required/>
                                    </Form.Group>
                                    <Form.Group className="mb-4" controlId="formBirth">
                                        <Form.Label>Birthday</Form.Label>
                                        <Form.Control type="date" name="Birth"  onChange={(e) => this.setBirth(e.target.value)}/>
                                    </Form.Group>
                                    <Button variant="outline-danger" type="submit" className="mr-2" onClick={this.updateUser}>Update Profile</Button>
                                    <Button variant="outline-danger" type="submit" className="mr-2" onClick={this.deleteUser}>Delete Profile</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h4>My Favorite Movies</h4>
                    </Col>
                </Row>
                <Row className="favorite-movies">
                    {/*Under created a logic to generate the movies*/}
                    { movie.map((movie) => {
                        if(movie._id === FavoriteMovies.find((fv) => fv === movie._id))
                        { return (
                            <Col key={movie._id}>
                            <Card border="dark" className="m-2"  xs={12} md={6} lg={3}>
                                <Card.Img className="fav-poster" variant="top" crossOrigin='anonymous' src={movie.ImageUrl}/>
                                <Card.Body>
                                    <Card.Title className="movie_title">{movie.Title}</Card.Title>
                                    <Button variant="outline-danger" value={movie._id} onClick={(e) => { this.removeFavoriteMovie(e, movie)}}>Remove</Button>
                                </Card.Body>
                            </Card> 
                            </Col>
                        )}}) }
               </Row>
            </Container>
        );

    }


}