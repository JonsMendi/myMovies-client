import React from 'react';
import axios from 'axios';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
    // constructor() starts before then render.
    // constructor() is the method that React uses to actually create the component in-memory.
    // super() it will call the parent React.Component’s constructor, which will give your class the actual React component’s features.
    constructor() {
      super();
      this.state = {
        movies: [],
        selectedMovie: null
      }
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    // render() renders the code into the virtualDOM 
    render() {
      const { movies, selectedMovie } = this.state;

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <div className = 'main-view'>
          {selectedMovie
        ? <MovieView movieData={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
        : movies.map(movie => (
          <MovieCard key={movie._id} movieData={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
            ))
          }
        </div>
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