import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { setUser, setMovies } from "../../actions/actions";
import { connect } from "react-redux";
import moment from "moment";
import "./profile-view.scss";

import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birth: null,
      FavoriteMovies: [],
      //baseUrl: 'http://localhost:8080',
    };
  }

  componentDidMount() {
    this.getUser();
    console.log("this.props", this.props);
  }

  getUser = () => {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .get(`https://mymovies-api-jbm.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birth: response.data.Birth,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  updateUser = (e) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    console.log(
      "Username",
      this.state.Username,
      "Password",
      this.state.Password,
      "Email",
      this.state.Email,
      "Birth",
      this.state.Birth
    );
    axios
      .put(
        `https://mymovies-api-jbm.herokuapp.com/users/${Username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birth: this.state.Birth,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log("response", response);
        alert("Profile was successfully updated");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birth: response.data.Birth,
        });
        localStorage.setItem("user", data.Username);

        window.location.pathname = "/";
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  deleteUser = (e) => {
    const confirmDelete = window.confirm("Confirm to remove :(");

    if (confirmDelete) {
      const Username = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      axios
        .delete(`https://mymovies-api-jbm.herokuapp.com/users/${Username}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          alert("Profile successfully deleted");
          window.location.pathname = "/";
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  removeFavoriteMovie = (e, movie) => {
    e.preventDefault();
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://mymovies-api-jbm.herokuapp.com/users/${Username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  setUsername(value) {
    this.setState({
      Username: value,
    });
  }

  setPassword(value) {
    this.setState({
      Password: value,
    });
  }

  setEmail(value) {
    this.setState({
      Email: value,
    });
  }

  setBirth(value) {
    this.setState({
      Birth: value,
    });
  }

  render() {
    const { movies, user } = this.props;
    const { FavoriteMovies, Username, Email, Birth } = this.state;
    console.log("my profile user action", user);
    //const { FavoriteMovies } = this.state;
    const favoriteMovie = FavoriteMovies.map((movieId) =>
      movies.find((movie) => movie._id === movieId)
    );
    //console.log('My favoriteMovie fetch',favoriteMovie);

    return (
      <Container className="profile-view" align="center" lg={2} md={6} xs={12}>
        <Row className="justify-content-md-center text-center">
          <Col>
            <Card border="dark">
              <Card.Body>
                <Card.Title>
                  <h3>Profile</h3>
                </Card.Title>
                <br />
                <Card.Text>Username: {Username}</Card.Text>
                <Card.Text>Email: {Email}</Card.Text>
                <Card.Text>
                  Birthday: {moment(Birth).format("Do MMMM YYYY")}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-md-center text-center">
          <Col>
            <Card border="dark" className="mt-5">
              <Card.Body>
                <Card.Title className="mb-4">
                  <h4>Change Yourself!</h4>
                </Card.Title>
                <Form className="form-update">
                  <Form.Group className="mb-4" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="Username"
                      placeholder={this.state.Username}
                      onChange={(e) => this.setUsername(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="Password"
                      placeholder="New Password"
                      onChange={(e) => this.setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="Email"
                      placeholder={this.state.Email}
                      onChange={(e) => this.setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-4" controlId="formBirth">
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type="date"
                      name="Birth"
                      placeholder={this.state.Birth}
                      onChange={(e) => this.setBirth(e.target.value)}
                    />
                  </Form.Group>
                  <Button
                    type="submit"
                    className="mr-2 update-button"
                    onClick={this.updateUser}
                  >
                    Update Profile
                  </Button>
                  <Button
                    type="submit"
                    className="mr-2 delete-button"
                    onClick={this.deleteUser}
                  >
                    Delete Profile
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h4>My Favorite Movies</h4>
          </Col>
        </Row>
        <Row className="favorite-movies">
          {/*Under created a logic to generate the movies*/}
          {favoriteMovie.map((m) => (
            <Col md={4} key={m._id}>
              <Row>
                <Button
                  className="delete-button ml-1 mt-3"
                  value={m._id}
                  onClick={(e) => {
                    this.removeFavoriteMovie(e, m);
                  }}
                >
                  Remove
                </Button>
                <Link to={`/movies/${m._id}`}>
                  <h5 className="movie-link link ">{m.Title}</h5>
                </Link>
              </Row>
            </Col>
          ))}
        </Row>
      </Container>
    );
  }
}

let mapStateToProps = (state) => {
  return {
    user: state.user,
    movies: state.movies,
  };
};

export default connect(mapStateToProps, { setUser, setMovies })(ProfileView);
