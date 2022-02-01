import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ButtonLogout } from '../button/button-logout';
import './main-view.scss';

export class MainView extends React.Component {
    // constructor() starts before then render.
    // constructor() is the method that React uses to actually create the component in-memory.
    // super() it will call the parent React.Component’s constructor, which will give your class the actual React component’s features.
    constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null //initial state set to null
      };
    }

    //sa
    //When a movie is clicked this function is called and updated the state going to the selectedMovie.
    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }
    //If !user it activates this function. Goes to LoginView.
    onLoggedIn(user) {
      this.setState({
        user
      });
    }
    
    //Register (not working, need to fix)
    onRegister(registration) {
      this.setState({
        registration
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
          </Col>
          ))
        }
        </Row>
      );
    }

    componentDidMount(){
      // code executed right after the component is added to the DOM.
      // is a good place to add code for performing async tasks such as making ajax requests or adding event listeners(ex: fetch the list of movies from your database).
      axios.get('https://mymovies-api-jbm.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
}