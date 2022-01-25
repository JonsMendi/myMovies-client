import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';


export class MainView extends React.Component {

    constructor() {
      super();
      this.state = {
        movies: [
            { _id: 1, Title: 'Inception', Description: 'A lot of people sleeping all the time!', ImagePath: require('../../img/inception.jpeg')},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'A guy escapes the prison and live la vida loca!', ImagePath: require('../../img/tsr.jpeg')},
            { _id: 3, Title: 'Gladiator', Description: 'The main character dies, don\'t watch!', ImagePath: require('../../img/gladiator.png')}
        ]
      }
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    render() {
      const { movies, selectedMovie } = this.state;

      if (movies.length === 0) return <div className="main-view">The list is empty brother!</div>;

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
}