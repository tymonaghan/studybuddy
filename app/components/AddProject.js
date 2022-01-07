import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";
import Stack from "react-bootstrap/Stack";
import { useDispatch, useSelector } from "react-redux";
import { addNewProjectToDb } from "../../store/reducer";

const AddProject = () => {
  const userId = useSelector((state) => state.auth.id);
  const dispatch = useDispatch();

  return (
    <div className="bg-dark-border">
      <Stack direction="horizontal" gap={2}>
        <Form style={{ width: "75%" }}>
          <Form.Control
            id="new-project-text"
            className="me-auto"
            placeholder="New Project Name"
          />
        </Form>
        <Button
          variant="secondary"
          onClick={() => {
            const thisForm = document.getElementById("new-project-text");
            dispatch(addNewProjectToDb(thisForm.value, userId));
            thisForm.value = "";
          }}
        >
          Add Project
        </Button>
      </Stack>
    </div>
  );
};

export default AddProject;
