import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Container
} from "reactstrap";

export default function BookingPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const { movieId } = useParams();
  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
  }, []);

  function getMovieDetail() {
    setLoading(true);
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=33c89a65`)
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        setData(result);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  function onClickBook() {
    alert("Ticket Booked");
  }

  return (
    <Container>
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          <section className="movie-details-section">
            <br />
            <h2>Welcome to booking Section</h2>
            <br />
            <h4>Movie - {data.Title}</h4>
            <br />
            <Card className="align-items-center ">
              <CardImg
                top
                style={{ height: "480px", width: "360px" }}
                src={data.Poster}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  <h3>{data.Title}</h3>
                </CardTitle>
                <CardText>
                  <p>
                    <strong>Released Date: </strong>
                    {data.Released}
                  </p>
                  <p>
                    <strong>Movie RunTime: </strong>
                    {data.Runtime}
                  </p>
                  <p>
                    <strong>Genre:</strong>
                    {data.Genre}
                  </p>
                  <p>
                    <strong>Director: </strong>
                    {data.Director}
                  </p>
                  <p>
                    <strong>Actors: </strong>
                    {data.Actors}
                  </p>
                  <p>
                    <strong>Plot: </strong>
                    {data.Plot}
                  </p>
                  <p>
                    <strong>Language: </strong>
                    {data.Language}
                  </p>
                  <p>
                    <strong>Rating: </strong>
                    {data.imdbRating}
                  </p>
                  <p>
                    <strong>Votes: </strong>
                    {data.imdbVotes}
                  </p>
                  <p>
                    <strong>Box Office:</strong>
                    {data.BoxOffice}
                  </p>
                </CardText>
                <Button color="primary" onClick={onClickBook}>
                  Watch Movie
                </Button>
                &nbsp;
                <Button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => history.goBack()}
                >
                  Go Back
                </Button>
              </CardBody>
            </Card>
          </section>
        </>
      )}
    </Container>
  );
}
