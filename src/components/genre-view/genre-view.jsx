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
                        <div className="genre-description">
                        <span className="label">Description: </span>
                        <span className="value"><p>{genre.Description}</p></span>
                        </div>
                        <Button variant="outline-secondary mr-3" onClick={goHistory.goBack}>Back</Button>
                        <Link to={`/`}><Button variant="outline-light">Movies List</Button></Link>
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