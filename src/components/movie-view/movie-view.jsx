import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Row, Col, Button, Figure, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

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
      
      <Row className="mt-4 mx-auto" style={{ width: "60%" }}>
        <Col lg={12} md={5} sm={12}>
          <Card className="movie-view bg-dark " border="white">
          <Card.Header as="h3" className="text-center">{movie.Title}</Card.Header>
          
          <Card.Img variant="right" crossOrigin='anonymous' src={movie.ImageUrl} style={{ height: 520, }} />

          <Card.Body className="bg-black">
            <Card.Text>Description: {movie.Description}</Card.Text>
            <Card.Text>Release Year: {movie.ReleaseYear}</Card.Text>
            <Card.Text>Rating: {movie.Rating}/10</Card.Text>
            <Card.Text><Link to={`/genres/${movie.Genre.Name}`}><Button variant="dark link">Genre: {movie.Genre.Name}</Button></Link></Card.Text>
            <Card.Text><Link to={`/directors/${movie.Director.Name}`}><Button variant="dark link">Director: {movie.Director.Name}</Button></Link></Card.Text>
            {/*<Card.Text>Actor: <Link to={`/actors/${actor}`}><Button variant="link">{movie.Actor}</Button></Link></Card.Text>*/}
              <div className="m-4 text-center">
                <Link to={`/`}><Button variant='outline-secondary'>Back</Button></Link>
                <Button className="ml-3" variant="outline-danger" value={movie._id} onClick={(e) => this.addFavoriteMovie(e, movie)}>Add to Favorites</Button>
              </div>
          </Card.Body>
          </Card>
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