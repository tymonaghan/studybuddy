import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Card,
  Container,
  Row,
  Col,
  ButtonGroup,
  Button,
} from "react-bootstrap";

const SourceList = () => {
  const { currentSources } = useSelector((state) => state);

  return (
    <Container>
      <Row xs={1} md={2} lg={3} xl={4}>
        {currentSources[0] ? (
          currentSources.map((currentSource, i) => {
            return (
              <Col key={i}>
                <Card key={i} style={{ width: "15rem" }} border="primary">
                  <Card.Header
                    id={`${currentSource.classification}-source-card-${currentSource.id}`}
                  >
                    {currentSource.classification}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title bg="secondary">
                      "{currentSource.name}"
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {currentSource.authorLastName},{" "}
                      {currentSource.authorFirstName}
                    </Card.Subtitle>
                    <Card.Text>{currentSource.notes}</Card.Text>
                    <Row>
                      <Col>
                        <Button variant="warning">Edit</Button>
                      </Col>
                      <Col>
                        <Button variant="danger">Delete</Button>
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
