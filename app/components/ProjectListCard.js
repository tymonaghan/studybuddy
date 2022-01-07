import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React from "react";
import Image from "react-bootstrap/Image";

const ProjectListCard = (props) => {
  const { entry } = props;

  return (
    <Card className="bg-light-border">
      <Link to={`/project/${entry.id}`}>
        <Card.Body>
          <Container>
            <Row>
              <Col xs="0" sm="3" md="2">
                <Image
                  thumbnail="true"
                  style={{ width: "3rem" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Noun_Project_task_icon_1251563.svg/105px-Noun_Project_task_icon_1251563.svg.png"
                />
              </Col>
              <Col lg="8" md="8" sm="9" xs="9">
                <h2 className="project-title">{entry.name}</h2>
                <em>{entry.summary}</em>
              </Col>
              <Col xs sm lg="2">
                <Stack>
                  <div style={{ textAlign: "right" }}># Sources</div>
                  <div style={{ textAlign: "right" }}># Notes</div>
                  <div
                    style={{ textAlign: "right" }}
                    className={`${entry.status}-project`}
                  >
                    {entry.status}
                  </div>
                </Stack>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default ProjectListCard;
