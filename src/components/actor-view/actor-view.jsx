import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Row, Card } from 'react-bootstrap';
import './actor-view.scss';

export class ActorView extends React.Component {
    render () {
        const { actor } = this.props;
        
    

        return (
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <div>
                                <Card.Title><h2></h2></Card.Title>
                                <div className="director-bio">
                                <span className="label">Bio: </span>
                                <span className="value"><p>{actor}</p></span>
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
                                <Link to={`/`}><Button variant='dark'>Back</Button></Link>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        ) 
    }
    

}