import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import './main-view.scss';

export class MainView extends React.Component {
    // constructor() starts before then render.
    // constructor() is the method that React uses to actually create the component in-memory.
    // super() it will call the parent React.Component’s constructor, which will give your class the actual React component’s features.
    constructor() {
      super();
      this.state = {
        movies: [],
        user: null //initial state set to null
      };
    }

    componentDidMount(){
      // code executed right after the component is added to the DOM.
      // is a good place to add code for performing async tasks such as making ajax requests or adding event listeners(ex: fetch the list of movies from your database).
      // Under, every time a user loads the page and the componentDidMount method is called, you check if the user is logged in (by retrieving this information from localStorage). Only if the user is already logged in do you make the same GET request to the “movies” endpoint (by calling the getMovies method).
      let accessToken = localStorage.getItem('token');
      if (accessToken !== null) {
        this.setState({
          user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
      }
    }

    ////Under the Methods that Updates the state.
    //When a movie is clicked this function is called and updated the state going to the selectedMovie.
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }
    //If !user it activates this method. Goes to LoginView.
    onLoggedIn(authData) {
      console.log(authData);
      this.setState({
        user: authData.user.Username
      });
      //'localStorage'Tis a mechanism that stores the token and the logged in user in the browser, so that the next time you open your app, the browser remembers you’re already logged in. 
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.user.Username);
      this.getMovies(authData.token);//The moment a user logs in, a GET request(the method getMovies is defined under onLoggedIn method) is made to the “movies” endpoint by passing the bearer authorization in the header of the HTTP request (the getMovies method is called).
    }
    
    //Under, since a GET request has to be made to the “movies” endpoint in two cases (the moment a user logs in and every time a user loads(componentDidMount) the page), you refactored your code and moved the common code in the newly created getMovies(under) method to avoid repeating yourself.
    getMovies(token) {
      axios.get('https://mymovies-api-jbm.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then (response => {
        //assign the result to set the state.
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    onLoggedOut() {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.setState({
        user: null
      });
    }

    // render() renders the code into the virtualDOM 
    render() {
      const { movies, selectedMovie, user, registration } = this.state;

      
      // If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView
      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
      // Before the movies have been loaded
      if (movies.length === 0) return <div className="main-view" />;

      return (
        <Row className="justify-content-md-center main-view">
          {/*If the state of `selectedMovie` is not null, that selected movie will be returned otherwise, all *movies will be returned*/}
          {selectedMovie
        ? 
          <Col md={8}>
            <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
        : 
          movies.map(movie => (
          <Col md={3}>
            <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            <Col>
              <Button variant="secondary" onClick={() => { this.onLoggedOut() }} >Logout</Button>
            </Col>
          </Col>
          ))
        }
        </Row>
      );
    }
}