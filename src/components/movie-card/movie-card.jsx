import React from 'react';
import PropTypes from 'prop-types';
import  Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

import { Link } from "react-router-dom";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;
  console.log(movie);
    return (
      
      <Link className="card-click" to={`/movies/${movie._id}`}>
          <Button variant="none"> 
      <Card className="movie-card-view card text-center shadow m-1 mb-4 overflow ">
          <div className="card-img">
            <Card.Img variant="top" crossOrigin='anonymous' src={movie.ImageUrl} />
          </div>
        <Card.Body className="card-body">
          <Card.Title><h4>{movie.Title}</h4></Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
       </Button>
        </Link>
    )
  }
}

// propTypes - Give warnings in browser/console if data does not match with the required.
MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired
  })
};