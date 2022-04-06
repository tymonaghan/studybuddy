import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
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
            <Form.Label>
              Project Title{" "}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>The name of your project.</Tooltip>}
              >
                <span
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined"
                >
                  info
                </span>
              </OverlayTrigger>
            </Form.Label>
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
            <Form.Label className="mb-0">
              Project Summary{" "}
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    This summary appears in your project list. Use it to help
                    you identify this particular project.
                  </Tooltip>
                }
              >
                <span
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined"
                >
                  info
                </span>
              </OverlayTrigger>
            </Form.Label>
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
            <Form.Label>
              Project Theme{" "}
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    The general theme or prompt for your research. Default is
                    the current National History Day theme.
                  </Tooltip>
                }
              >
                <span
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined"
                >
                  info
                </span>
              </OverlayTrigger>
            </Form.Label>
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
            <Form.Label>
              Project Topic{" "}
              <OverlayTrigger
                placement="bottom"
                overlay={<Tooltip>The general topic of your research.</Tooltip>}
              >
                <span
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined"
                >
                  info
                </span>
              </OverlayTrigger>
            </Form.Label>
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
            <Form.Label>
              Project Thesis
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    Your project's thesis statement should state your central
                    point or focus in two or three sentences. Use the Argument
                    View to add specific claims that support your thesis.
                  </Tooltip>
                }
              >
                <span
                  style={{ fontSize: "18px" }}
                  className="material-icons-outlined"
                >
                  info
                </span>
              </OverlayTrigger>
            </Form.Label>
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
