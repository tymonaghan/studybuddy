import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { updateCurrentProjectInDb } from "../../store/projectsReducer";

const ProjectInfo = (props) => {
  const { currentProject } = props;
  // console.log(currentProject);
  const [currentProjectData, updateProjectData] = useState(currentProject);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    updateProjectData(currentProject);
    setLoaded(true);
  }, []);

  const dispatch = useDispatch();
  const params = useParams();
  function toggleEdit(event) {
    console.dir(event);
    if (event.target.innerText === "Edit") {
      event.target.className = "btn btn-primary";
      event.target.innerText = "Save";
      event.nativeEvent.target.nextSibling.disabled = false;
    } else {
      dispatch(updateCurrentProjectInDb(params.projectId, currentProjectData));
      event.target.className = "btn btn-secondary";
      event.target.innerText = "Edit";
      event.nativeEvent.target.nextSibling.disabled = true;
    }
  }

  function handleChange(event) {
    console.log(currentProjectData);
    updateProjectData({
      ...currentProjectData,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <Container className="pb-3">
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
          <Form.Group className="mb-2">
            <Form.Label className="mb-0">Project Summary</Form.Label>
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
                name="summary"
                value={currentProjectData?.summary}
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
                rows={4}
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
