import React from "react";
import { Outlet, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";

const ProjectViewWrapper = () => {
  const params = useParams();
  return (
    <Container>
      <h1>Project View: ProjectID {params.projectId}</h1>
      <Outlet />
    </Container>
  );
};

export default ProjectViewWrapper;
