import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

const ProjectView = (props) => {
  const params = useParams();
  // const projects = useSelector((state) => state.projects);

  return (
    <Container className="project-view-container">
      <Tabs defaultActiveKey="sources" className="mb-3">
        <Tab eventKey="sources" title="sources">
          <p>hey does this number match the url parameter?</p>
          <h1>{params.projectId}</h1>
          <p>how about this one?</p>
          <h2></h2>{" "}
        </Tab>
        <Tab eventKey="notes" title="notes">
          put yer notes here matey{" "}
        </Tab>
        <Tab eventKey="project info" title="project info" disabled>
          edit project title, summary, and status here.{" "}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProjectView;
