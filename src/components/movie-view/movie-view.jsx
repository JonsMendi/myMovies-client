import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Figure, Link } from 'react-bootstrap';
import { Link } from "react-router-dom";

export class MovieView extends React.Component {

  

  addFavoriteMovie = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    console.log(token);
    axios.post(`https://mymovies-api-jbm.herokuapp.com/users/${Username}/movies/${this.props.movie._id}`, {},
    { 
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log(response);
            alert('Movie was added to Favorites');
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { movie, actor } = this.props;
    
    return (
      <Row className="justify-content-md-center text-center">
        <Col>
          <Figure>
            <Figure.Image
              width={270}
              height={320}
              alt="171x180"
              crossOrigin='anonymous'
              src={movie.ImageUrl}
            />
          </Figure>
          <div className="movie-view">
            <div className="movie-title">
              <span className="label"></span>
              <span className="value"><h2>{movie.Title}</h2></span>
            </div>
            <div className="movie-description">
              <span className="label">Description: </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-releaseYear">
              <span className="label">Release Year: </span>
              <span className="value">{movie.ReleaseYear}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre: </span>
              <Link to={`/genres/${movie.Genre.Name}`}><Button variant="link">Genre</Button></Link>
            </div>
            <div className="movie-director">
              <span className="label">Director: </span>
              <Link to={`/directors/${movie.Director.Name}`}><Button variant="link">Director</Button></Link>
            </div>
            <div className="movie-actor">
              <span className="label">Actors: </span>
              <Link to={`/actors/${actor}`}><Button variant="link">Actor</Button></Link>
            </div>
            <div className="movie-rating">
              <span className="label">Rating: </span>
              <span className="value">{movie.Rating}/10</span>
            </div>
            <div className="movie-featured">
              <span className="label">Featured: </span>
              <span className="value">{movie.Featured}</span>
            </div>
            <div className="m-4">
              <Link to={`/`}><Button variant='dark'>Back</Button></Link>
              <Button className="ml-3" variant="primary" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
            </div>
          </div>
        </Col>
      </Row>
    );
  }
}

// propTypes - Give warnings in browser/console if data does not match with the required.
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired,
    ReleaseYear: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string.isRequired
    }),
    Actors: PropTypes.array.isRequired,
    Rating: PropTypes.string.isRequired,
    Featured: PropTypes.bool.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};