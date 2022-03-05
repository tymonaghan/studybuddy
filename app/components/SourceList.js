import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "react-bootstrap";
import { trashSourceInDb } from "../../store/reducer";

const SourceList = () => {
  const currentSources = useSelector((state) => state.currentSources);
  const dispatch = useDispatch();
  const params = useParams();
  const { projectId } = params;

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        {currentSources[0] ? (
          currentSources.map((currentSource, i) => {
            return (
              <Col key={i}>
                <Card style={{ maxWidth: "12rem" }} border="primary">
                  <Card.Header
                    id={`${currentSource.classification}-source-card-${currentSource.id}`}
                    className="py-0 px-2"
                  >
                    {currentSource.classification}
                  </Card.Header>
                  <Card.Body className="p-2">
                    <Link to={`source/${currentSource.id}`}>
                      <Card.Title bg="secondary">
                        "{currentSource.name}"
                      </Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">
                        {currentSource.authorLastName},{" "}
                        {currentSource.authorFirstName}
                      </Card.Subtitle>
                      <Card.Text>{currentSource.notes}</Card.Text>
                    </Link>
                    <Row>
                      <Col>
                        <Button variant="warning" size="sm">
                          Edit
                        </Button>
                      </Col>
                      <Col>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => {
                            dispatch(
                              trashSourceInDb(projectId, currentSource.id)
                            );
                          }}
                        >
                          Delete
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            );
          })
        ) : (
          <p>No sources here!</p>
        )}
      </Row>
    </Container>
  );
};

export default SourceList;
