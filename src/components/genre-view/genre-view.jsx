import React from 'react';
import { connect } from 'react-redux';
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
                        <Button variant="primary mr-3" onClick={goHistory.goBack}>Back</Button>
                        <Link to={`/`}><Button variant='dark'>Movies List</Button></Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    </Row>
    )
}
