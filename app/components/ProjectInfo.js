import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";

import { useSelector } from "react-redux";

const ProjectInfo = () => {
  const currentProject = useSelector((state) =>
    state.projects.find((project) => project.id == state.currentProjectId)
  );
  // console.log(currentProject);
  const [currentProjectData, updateProjectData] = useState({ currentProject });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    updateProjectData(currentProject);
    setLoaded(true);
  }, []);

  function toggleEdit(event) {
    event.nativeEvent.target.nextSibling.disabled = false;
  }

  function handleChange(event) {
    console.log(currentProjectData);
    updateProjectData({
      ...currentProjectData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Container>
      <b>View and Edit your project info here:</b>
      {loaded ? (
        <div>
          <Form.Group className="mb-3">
            <Form.Label>Project Title</Form.Label>
            <InputGroup>
              <Button
                variant="secondary"
                onClick={(e) => {
                  toggleEdit(e);
                }}
              >
                Edit
              </Button>
              <Form.Control
                name="name"
                value={currentProjectData?.name}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project Theme</Form.Label>
            <InputGroup>
              <Button
                variant="secondary"
                onClick={(e) => {
                  toggleEdit(e);
                }}
              >
                Edit
              </Button>
              <Form.Control
                name="theme"
                value={currentProjectData?.theme}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project Topic</Form.Label>
            <InputGroup>
              <Button
                variant="secondary"
                onClick={(e) => {
                  toggleEdit(e);
                }}
              >
                Edit
              </Button>
              <Form.Control
                name="topic"
                value={currentProjectData?.topic}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Project Thesis</Form.Label>
            <InputGroup>
              <Button
                variant="secondary"
                onClick={(e) => {
                  toggleEdit(e);
                }}
              >
                Edit
              </Button>
              <Form.Control
                as="textarea"
                name="thesis"
                value={currentProjectData?.thesis}
                disabled
                onChange={(e) => {
                  handleChange(e);
                }}
              />
            </InputGroup>
          </Form.Group>
        </div>
      ) : (
        <p>loading</p>
      )}
    </Container>
  );
};

export default ProjectInfo;
