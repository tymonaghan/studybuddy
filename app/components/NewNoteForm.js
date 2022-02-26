import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addNewNoteToDb } from "../../store/reducer";
import { useParams } from "react-router-dom";

const NewNoteForm = () => {
  // console.log(useParams());
  const params = useParams();
  const [formData, setFormData] = useState({
    headline: "",
    text: "",
    pageNumber: "",
  });
  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  const { projectId, sourceId } = params;
  console.log(`projectId: ${projectId}\nsourceId:${sourceId}`);

  return (
    <Form>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="headline">headline</Form.Label>
          <Form.Control
            id="headline"
            placeholder="add a headline"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="text">text</Form.Label>
          <Form.Control
            id="text"
            placeholder="add some text"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="pageNumber">page number(s)</Form.Label>
          <Form.Control
            id="pageNumber"
            placeholder="pg 23-25"
            onChange={handleChange}
          />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="disabledFieldsetCheck"
            label="Can't check this"
          />
        </Form.Group> */}
        <Button
          onClick={() =>
            dispatch(addNewNoteToDb(projectId, sourceId, formData))
          }
        >
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};

export default NewNoteForm;
