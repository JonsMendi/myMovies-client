import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col, Container } from 'react-bootstrap';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ActorView } from '../actor-view/actor-view';
import { NavBar } from '../nav-bar/nav-bar';
import './main-view.scss';

export class MainView extends React.Component {
    // constructor() starts before then render.
    // constructor() is the method that React uses to actually create the component in-memory.
    // super() it will call the parent React.Component’s constructor, which will give your class the actual React component’s features.
    constructor() {
      super();
      this.state = {
        movies: [],
        user: null, //initial state set to null
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
      const { movies, user } = this.state;
  
      
      return (
        <Router>
          <NavBar user={user}/>
          <Container>
          <Row className="justify-content-md-center main-view">
            <Route exact path="/" render= {() => {
              // Under the If statement in this section prevents you from loading the register view if no user is logged in.By placing this line inside the route path, you’ll no longer have issues accessing the registration view. 
              if (!user) {
                return <Redirect to="/login" />
              }
              // Under, if there is no movies in the list it activates the condition and shows empty page.
              if (movies.length === 0) return <div className="main-view" />;
              // Under Show All Movies - If the previous If statements are ignored (user is Logged and there is Movies in the list) a mapping will be made and show all movies.
              return movies.map(m => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }} />
            {/*Under Login endpoint*/}
            <Route path="/login" render= {() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />
              </Col>
            }} />
            {/*Under Register endpoint*/}
            <Route path="/register" render= {() => {
              if (user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />
            {/*Under Movies endpoint*/}
            <Route path="/movies/:movieId" render= {({ match, history }) => {
              //Under both If statement (both) exist to prevent that users access the endpoints manually(typing in the URL).
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            {/*Under Directors endpoint*/}
            <Route path="/directors/:DirectorName" render={({ match, history }) => {
              //Under both If statement (both) exist to prevent that users access the endpoints manually(typing in the URL).
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.DirectorName).Director} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            <Route path="/actors/:ActorName" render={({ match, history }) => {
              //Under both If statement (both) exist to prevent that users access the endpoints manually(typing in the URL).
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <ActorView actor={movies.find(m => m.Actors === match.params.ActorName)} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            {/*Under Genre endpoint*/}
            <Route path="/genres/:GenreName" render={({ match, history }) => {
              //Under both If statement (both) exist to prevent that users access the endpoints manually(typing in the URL).
              if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
              if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.GenreName).Genre} onBackClick={() => history.goBack()} />
              </Col>
            }} />
            {/*Under Profile endpoint*/}
            <Route path={`/users/${user}`} render= {({ history }) => {
              if (!user) return <Redirect to="/" />
              return <Col lg={8} md={8}>
                <ProfileView movie={movies} user={user} onBackClick={() => history.goBack()} />
              </Col>
            }} />
          </Row>
          </Container>
        </Router>
      );
    }
}