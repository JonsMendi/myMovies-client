import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './genre-view.scss';

export function GenreView (props) {
    const { genre } = props;
    const goHistory = useHistory();

    return (
        <Row className="justify-content-md-center text-center">
        <Col>
            <Card>
                <Card.Body>
                    <div>
                        <Card.Title><h2>{genre.Name}</h2></Card.Title>
                        <div className="genre-description mt-3">
                            <span className="label text-muted">Description: </span>
                            <span className="value"><p>{genre.Description}</p></span>
                        </div>
                        <Button variant="outline-secondary mr-3" className='back-button' onClick={goHistory.goBack}>Back</Button>
                        <Link to={`/`}><Button variant="outline-light" className='movies-list-button'>Movies List</Button></Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}

GenreView.propTypes = {
    movie: PropTypes.shape({
      Genre: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
      }).isRequired,
    })
  };