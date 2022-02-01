import React from 'react';
import PropTypes from 'prop-types';
import  Button  from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;

    return (
      
    <Card className="card-view card text-center shadow m-1 mb-4" onClick={() => { onMovieClick(movieData)}}>
      <div className="overflow">
        <Card.Img className="card-img" variant="top" crossOrigin='anonymous' src={movieData.ImageUrl} />
      </div>
      <Card.Body className="card-body">
        <Card.Title><h4>{movieData.Title}</h4></Card.Title>
        <Card.Text>{movieData.Description}</Card.Text>
      </Card.Body>
    </Card>
    )
  }
}

// propTypes - Give warnings in browser/console if data does not match with the required.
MovieCard.propTypes = {
  movieData: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageUrl: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};