import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getCurrentProjectSourcesFromDb } from "../../store/reducer";
import { SourceList } from ".";

const ProjectView = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const projects = useSelector((state) => state.projects);
  const projectId = params.projectId;
  const currentProject = projects.filter((project) => {
    return project.id === +projectId; //gotta remember to coerce projectId to number!
  })[0];

  useEffect(() => {
    dispatch(getCurrentProjectSourcesFromDb(projectId));
  }, [projects]);

  return (
    <Container className="project-view-container">
      {currentProject ? (
        <Tabs defaultActiveKey="sources" className="mb-3">
          <Tab eventKey="sources" title="Sources">
            <Row>
              <Col md>
                <h2>{currentProject.name} Sources</h2>
              </Col>
              <Col>
                <Button variant="success">Add New Source</Button>
              </Col>
            </Row>
            <SourceList />
          </Tab>
          <Tab eventKey="notes" title="Notes">
            View, edit, and organize your individual notes here.
          </Tab>
          <Tab eventKey="project info" title="Project Info" disabled>
            edit project title, summary, and status here.{" "}
          </Tab>
        </Tabs>
      ) : (
        <p>please wait, loading...</p>
      )}
    </Container>
  );
};

export default ProjectView;
