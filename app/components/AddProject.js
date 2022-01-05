import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Stack from "react-bootstrap/Stack";

const AddProject = () => {
  return (
    <div className="bg-dark-border">
      <Stack direction="horizontal" gap={2}>
        <Form.Control className="me-auto" placeholder="New Project Name" />
        <Button variant="secondary">Add Project</Button>
      </Stack>
    </div>
  );
};

export default AddProject;
