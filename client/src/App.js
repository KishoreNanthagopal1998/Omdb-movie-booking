import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Row,
  Col,
  Button
} from "reactstrap";

import SearchSection from "./components/SarchSection";

export default function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function onChangeSearchValue(event) {
    const searchValue = event.target.value;

    setSearchValue(searchValue);
  }

  function onKeyPressSearchValue(event) {
    if (event.charCode === 13) {
      fetchMovies();
    }
  }

  function onClickSearch() {
    fetchMovies();
  }

  function fetchMovies() {
    fetch(`http://localhost:5000`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }

  function onClick4Booking(imdbID) { }

  return (
    <Container style={{ marginTop: "60px" }}>
<h1>Welcome to omdb section</h1>
      <SearchSection
        onChangeSearchValue={onChangeSearchValue}
        onKeyPressSearchValue={onKeyPressSearchValue}
        onClickSearch={onClickSearch}
      />
      <br />

      <section className="movies-section">
        
        <Row>
          {data && data.length > 0 &&
            data.map((movie) => {
              return (
                <Col md={3} key={movie.imdbID}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={movie.Poster}
                      alt="Movie Image"
                    />
                    <CardBody style={{ textAlign: "center" }}>
                      <CardTitle>{movie.Title}</CardTitle>
                      <CardText>
                        {movie.Year} - {movie.Type}
                      </CardText>
                      <Link
                        to={`/booking-page/${movie.imdbID}`}
                        className="btn btn-primary"
                      >
                        Show Movie
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </section>

    </Container>
  );
}