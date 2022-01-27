import React from 'react';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
    return <div className="movie-card" onClick={() => { onMovieClick(movieData); }}>
        <h2>{movieData.Title}</h2>
        
      </div>;
  }
}