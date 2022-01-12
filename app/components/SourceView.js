import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import {
  getCurrentProjectSourcesFromDb,
  setCurrentNotesThunk,
  setCurrentSources,
} from "../../store/reducer";
import { useParams } from "react-router-dom";

const SourceView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const sourceId = params.sourceId;
  const projectId = params.projectId;
  // console.log(`sourceId is ${sourceId}`);

  useEffect(() => {
    dispatch(setCurrentNotesThunk(sourceId));
    dispatch(getCurrentProjectSourcesFromDb(projectId));
  }, []);

  const { currentNotes, currentSources } = useSelector((state) => state);
  // console.dir(currentSources);
  // console.log(sourceId);
  const currentSource = currentSources.filter((source) => {
    return source.id == +sourceId;
  })[0];
  // console.dir(currentSource);

  return (
    <Container>
      <Row>
        <Col md>
          {currentSource ? (
            <h1>Source: {currentSource.name} </h1>
          ) : (
            <h1>loading...</h1>
          )}
        </Col>
        <Col md="auto">
          <Button>Back to Sources List</Button>
        </Col>
      </Row>
      {currentNotes[0] ? (
        <Row>
          {currentNotes.map((note, i) => {
            return (
              <Col key={i}>
                <Card>
                  <Card.Title>{note.headline}</Card.Title>
                  <p>{note.text}</p>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>No notes found</p>
      )}
    </Container>
  );
};

export default SourceView;
