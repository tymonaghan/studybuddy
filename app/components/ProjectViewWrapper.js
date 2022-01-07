import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";

const ProjectViewWrapper = () => {
  const params = useParams();
  const projectId = params.projectId;
  const currentProjects = useSelector((state) => state.projects);
  const currentProject = currentProjects.filter((projectObject) => {
    return projectObject.id == projectId;
  })[0];
  console.dir(currentProject);

  return (
    <Container>
      <h1>Project View: {currentProject.name}</h1>
      <Outlet />
    </Container>
  );
};

export default ProjectViewWrapper;
