import React from 'react';
import { PropTypes } from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { Button, Col, Row, Card } from 'react-bootstrap';
import './director-view.scss';

export function DirectorView (props) {
    const { director } = props;
    const goHistory = useHistory();

    return (
        <Row >
            <Col>
                <Card className="mt-4 mx-auto text-center" style={{ width: "80%" }}>
                    <Card.Body>
                        <div>
                            <Card.Title as="h3">{director.Name}</Card.Title>
                            <div className="director-bio mt-3">
                            <span className="label text-muted">Bio: </span>
                            <span className="value"><p>{director.Bio}</p></span>
                            </div>
                            {/*<div className="director-movies">
                            <span className="label">Movies: </span>
                            <span className="value"><p>{director.Movies}</p></span>
                            </div>*/}
                            <div className='d-flex flex-row justify-content-center'>
                                <div className="director-birth mr-4">
                                    <span className="label text-muted">Birth: </span>
                                    <span className="value"><p>{director.Birth}</p></span>
                                </div>
                                <div className="director-death">
                                    <span className="label text-muted">Death: </span>
                                    <span className="value"><p>{director.Death}</p></span>
                                </div>
                            </div>
                            <div className="text-center align-items-end pt-4">
                                <Button variant="outline-secondary mr-3" className='back-button' onClick={goHistory.goBack}>Back</Button>
                                <Link to={`/`}><Button className='movies-list-button'>Movies List</Button></Link>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )

}

DirectorView.propTypes = {
    movie: PropTypes.shape({
      Director: PropTypes.shape({
        Name: PropTypes.string.isRequired,
        Bio: PropTypes.string.isRequired,
        BirthYear: PropTypes.string.isRequired,
        Death: PropTypes.string.isRequired
      }).isRequired,
    })
  };