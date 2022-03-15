import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import { setCurrentNotesThunk } from "../../store/notesReducer";
import {
  setCurrentSources,
  getCurrentProjectSourcesFromDb,
} from "../../store/sourcesReducer";
import { useParams, useNavigate } from "react-router-dom";
import { NewNoteForm } from ".";

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

  const navigate = useNavigate();
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
        <Col sm="auto">
          {currentSource ? <h3>{currentSource.name} </h3> : <h3>loading...</h3>}
        </Col>
        <Col>
          <OverlayTrigger
            trigger="click"
            placement="bottom"
            rootClose="true"
            overlay={
              <Popover id={`popover-positioned-bottom`}>
                <Popover.Header as="h3">{`Add a New Note`}</Popover.Header>
                <Popover.Body>
                  <NewNoteForm sourceId={sourceId} />
                </Popover.Body>
              </Popover>
            }
          >
            <Button
              style={{
                fontSize: "0.75rem",
                borderRadius: "100px",
              }}
              variant="success"
              size="sm"
            >
              + Add New Note for this Source
            </Button>
          </OverlayTrigger>
        </Col>
        <Col>
          <Button
            style={{
              fontSize: "0.65rem",
              maxWidth: "5rem",
              maxHeight: "5rem",
              borderRadius: "100px",
            }}
            size="sm"
            onClick={() => {
              navigate("./../..");
            }}
          >
            Back to Sources List
          </Button>
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
