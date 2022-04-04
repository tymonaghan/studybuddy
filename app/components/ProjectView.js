import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { getCurrentProjectSourcesFromDb } from "../../store/sourcesReducer";
import {
  SourceList,
  NewSourceForm,
  ProjectInfo,
  ArgumentView,
  AddSourceButton,
  SourceView,
} from ".";
import NotesView from "./NotesView";

const ProjectView = (props) => {
  const { source } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const projects = useSelector((state) => state.projects);
  const projectId = params.projectId;
  const currentProject = projects.filter((project) => {
    return project?.id === +projectId; //gotta remember to coerce projectId to number!
  })[0];

  useEffect(() => {
    dispatch(getCurrentProjectSourcesFromDb(projectId));
  }, [projects]);

  return (
    <Container className="project-view-container">
      {currentProject ? (
        <Tabs defaultActiveKey="sources" className="mb-3">
          <Tab eventKey="sources" title="Sources">
            {source ? (
              <SourceView />
            ) : (
              <div>
                <AddSourceButton />
                <SourceList />
              </div>
            )}
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <NotesView />
          </Tab>
          <Tab eventKey="projectInfo" title="Project Info">
            <ProjectInfo currentProject={currentProject} />
          </Tab>
          <Tab eventKey="argumentView" title="Your Argument">
            <ArgumentView currentProject={currentProject} />
          </Tab>
        </Tabs>
      ) : (
        <p>please wait, loading...</p>
      )}
    </Container>
  );
};

export default ProjectView;
