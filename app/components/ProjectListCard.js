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
  // console.dir(entry);

  return (
    <Card className="bg-light-border">
      <Link to={`/project/${entry.id}`}>
        <Card.Body>
          <Container>
            <Row className="align-items-center">
              <Col xs={12} sm={2}>
                <Image
                  thumbnail="true"
                  // style={{ width: "3rem" }}
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Noun_Project_task_icon_1251563.svg/105px-Noun_Project_task_icon_1251563.svg.png"
                />
              </Col>
              <Col xs={12} sm={7}>
                <h2 className="project-title">{entry.name}</h2>
                <p className="m-0">
                  <em>{entry.summary}</em>
                </p>
              </Col>
              <Col xs={12} sm={3} className="align-items-center">
                <Stack>
                  <div className="text-end">{entry.sourceCount} Sources</div>
                  <div className="text-end"># Notes</div>
                  <div className={`${entry.status}-project text-end`}>
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
