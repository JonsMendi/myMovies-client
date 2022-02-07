import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Row, Col } from 'react-bootstrap';
import './genre-view.scss';

export function GenreView (props) {
    const { genre } = props;

    return (
        <Row>
        <Col>
            <Card>
                <Card.Body>
                    <div>
                        <Card.Title><h2>{genre.Name}</h2></Card.Title>
                        <div className="genre-description">
                        <span className="label">Description: </span>
                        <span className="value"><p>{genre.Description}</p></span>
                        </div>
                        <Link to={`/`}><Button variant='dark'>Back</Button></Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )

}