import React, { useEffect } from "react";
import { Outlet, useParams, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveUserProjectsFromDb,
  setCurrentProjectId,
} from "../../store/reducer";

const ProjectViewWrapper = () => {
  const params = useParams();
  const projectId = params.projectId;
  const currentProjects = useSelector((state) => state.projects);
  const userId = useSelector((state) => state.auth.id);

  const currentProject = currentProjects.filter((projectObject) => {
    return projectObject.id == projectId;
  })[0];
  //the block above grabs the current project from state based on URL parameters
  // console.dir(currentProject);
  const dispatch = useDispatch();
  // console.log(`userId is currently ${userId}`);

  useEffect(() => {
    dispatch(retrieveUserProjectsFromDb(userId));
  }, [userId]);

  useEffect(() => {
    dispatch(setCurrentProjectId(projectId));
  }, [userId, currentProject]);

  return (
    <Container className="project-view-wrapper">
      <Stack gap={2} direction="horizontal">
        <h1>{currentProject ? <b>{currentProject.name}</b> : "No project"}</h1>
        <div className="vr" />
        <Link to="/">
          <Button variant="secondary">Back to Projects List</Button>
        </Link>
      </Stack>
      <Outlet />
    </Container>
  );
};

export default ProjectViewWrapper;
