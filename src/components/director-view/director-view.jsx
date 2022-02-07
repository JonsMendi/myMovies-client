import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Card } from 'react-bootstrap';
import './director-view.scss';

export function DirectorView (props) {
    const { director } = props;

    return (
        <Row>
            <Col>
                <Card>
                    <Card.Body>
                        <div>
                            <Card.Title><h2>{director.Name}</h2></Card.Title>
                            <div className="director-bio">
                            <span className="label">Bio: </span>
                            <span className="value"><p>{director.Bio}</p></span>
                            </div>
                            <div className="director-movies">
                            <span className="label">Movies: </span>
                            <span className="value"><p>{director.Movies}</p></span>
                            </div>
                            <div className="director-birth">
                            <span className="label">Birth: </span>
                            <span className="value"><p>{director.Birth}</p></span>
                            </div>
                            <div className="director-death">
                            <span className="label">Death: </span>
                            <span className="value"><p>{director.Death}</p></span>
                            </div>
                            <Link to={`/`}><Button variant='dark'>Back</Button></Link>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}