import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Row, Card } from 'react-bootstrap';
import './actor-view.scss';

export function ActorView (props) {
    const { actor } = props;
    const goHistory = useHistory();

    return (
        <Row className="justify-content-md-center text-center">
            <Col>
                <Card>
                    <Card.Body>
                        <div>
                            <Card.Title><h2>{actor}</h2></Card.Title>
                            <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value"><p></p></span>
                            </div>
                            <div className="director-movies">
                            <span className="label">Movies: </span>
                            <span className="value"><p></p></span>
                            </div>
                            <div className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value"><p></p></span>
                            </div>
                            <div className="director-death">
                            <span className="label">Death: </span>
                            <span className="value"><p></p></span>
                            </div>
                            <Button variant="outline-secondary mr-3" onClick={goHistory.goBack}>Back</Button>
                            <Link to={`/`}><Button variant="outline-danger">Movies List</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}