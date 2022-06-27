import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Figure, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import './movie-view.scss';

export class MovieView extends React.Component {

  addFavoriteMovie = (e) => {
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

  render() {
    const { movie, actor } = this.props;

    
    return (
      
      <div className="mt-4 mx-auto" style={{ width: "60%" }}>
         <Card className="d-flex flex-column flex-md-row align-items-center ml-xs-5 border-def">
          <Card.Body className='mr-5 pr-5'>
          <span className="d-flex align-items-center">
              
              <h1 className="display-4">{movie.Title}</h1>
            </span>
            <span className="d-flex align-items-center">
              <h5 className="text-muted mt-4 mr-3">Genre: </h5>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <h5 className="genre-link link mt-4">{movie.Genre.Name}</h5>
              </Link>
            </span>
            <span className="d-flex align-items-center mb-2">
              <h5 className="text-muted mr-2">Director: </h5>
              <Link to={`/directors/${movie.Director.Name}`}>
                <h5 className="director-link link">{movie.Director.Name}</h5>
              </Link>
            </span>
            <span className="d-flex align-items-center mb-2">
              <h5 className="text-muted mr-2">Release Year: </h5>
                <h6 className="">{movie.ReleaseYear}</h6>  
            </span>
            <span className="d-flex align-items-center mb-2">
              <h5 className="text-muted mr-2">Rating: </h5>
                <h6 className="">{movie.Rating}/10</h6>
            </span>
              <p>{movie.Description}</p>
          </Card.Body>
          <img width={270} height={380} variant="right" className="ml-3" crossOrigin='anonymous' src={movie.ImageUrl}  />
          </Card>
          {/*<Card.Text>Actor: <Link to={`/actors/${actor}`}><Button variant="link">{movie.Actor}</Button></Link></Card.Text>*/}
          
            <Link to={`/`}><Button className="back-btn mt-4 mr-3 ml-3" variant='outline-secondary'>Back</Button></Link>
            <Button className="add-favorite-btn mt-4" variant="outline-light" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>
            <span className="d-flex align-items-center">
            <i className="material-icons heart mr-3">Add to favorites</i>
              </span>
            </Button>
          
      </div>
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