import React from 'react';

export class MovieView extends React.Component {

  render() {
    const { movieData, onBackClick } = this.props;
    
    return (
    <div className="movie-view">
      <div className="movie-poster">
        <img src={movieData.ImageUrl} />
      </div>
      <div className="movie-title">
        <span className="label"></span>
        <span className="value"><h2>{movieData.Title}</h2></span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movieData.Description}</span>
      </div>
      <div className="movie-releaseYear">
        <span className="label">Release Year: </span>
        <span className="value">{movieData.ReleaseYear}</span>
      </div>
      <div className="movie-genre">
        <span className="label">Genre: </span>
        <span className="value">{movieData.Genre.Name}</span>
      </div>
      <div className="movie-director">
        <span className="label">Director: </span>
        <span className="value">{movieData.Director.Name}</span>
      </div>
      <div className="movie-actor">
        <span className="label">Actors: </span>
        <span className="value">{movieData.Actors}</span>
      </div>
      <div className="movie-rating">
        <span className="label">Rating: </span>
        <span className="value">{movieData.Rating}</span>
      </div>
      <div className="movie-featured">
        <span className="label">Featured: </span>
        <span className="value">{movieData.Featured}</span>
      </div>
      <div className="movie-button">
        <button onClick={() => { onBackClick(null); }}>Get back!</button>
      </div>
    </div>
    );
  }
}