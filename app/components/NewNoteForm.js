import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { addNewNoteToDb } from "../../store/reducer";

const NewNoteForm = () => {
  const [formData, setformData] = useState({
    newNoteHeadline: "",
    newNoteText: "",
    pageNumber: "",
  });
  const dispatch = useDispatch();

  return (
    <Form
      onTimeUpdate={() => {
        setFormData(form);
      }}
    >
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="newNoteHeadline">headline</Form.Label>
          <Form.Control id="newNoteHeadline" placeholder="add a headline" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="newNoteText">text</Form.Label>
          <Form.Control id="newNoteText" placeholder="add some text" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="pageNumber">page number(s)</Form.Label>
          <Form.Control id="pageNumber" placeholder="pg 23-25" />
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Check
            type="checkbox"
            id="disabledFieldsetCheck"
            label="Can't check this"
          />
        </Form.Group> */}
        <Button onClick={() => dispatch(addNewNoteToDb(formData))}>
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};

export default NewNoteForm;
