import Card from "react-bootstrap/Card";
import React from "react";

const ProjectList = () => {
  return (
    <Card border="primary" style={{ width: "80%", margin: "1rem" }}>
      <Card.Header>Your Projects</Card.Header>
      <Card.Body>
        <Card.Text>If you have projects, they will appear here.</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProjectList;
