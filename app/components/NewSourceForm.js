import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addNewSourceToDb } from "../../store/reducer";

const NewSourceForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    classification: "primary",
    type: "book",
    authorFirstName: "",
    authorLastName: "",
    publicationDate: "",
  });

  const dispatch = useDispatch();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  }

  const params = useParams();
  const { projectId } = params;

  return (
    <Form>
      <fieldset>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="name">Title</Form.Label>
          <Form.Control
            id="name"
            placeholder="the title of your source"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="classification">Classification</Form.Label>
          <Form.Select
            id="classification"
            aria-label="source classification selector"
            onChange={handleChange}
          >
            <option value="primary">Primary Source</option>
            <option value="secondary">Secondary Source</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="type">Type/Format</Form.Label>
          <Form.Select
            id="type"
            aria-label="Source type selector"
            defaultValue={"book"}
            onChange={handleChange}
          >
            <option value="book">book</option>
            <option value="website">website</option>
            <option value="journal article">journal article</option>
            <option value="documentary film or clip">
              documentary film or clip
            </option>
            <option value="newspaper">newspaper</option>
            <option value="archival document">archival document</option>
            <option value="other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="authorFirstName">Author First Name</Form.Label>
          <Form.Control
            id="authorFirstName"
            placeholder=""
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="authorLastName">Author Last Name</Form.Label>
          <Form.Control
            id="authorLastName"
            placeholder=""
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="publicationDate">Publication Date</Form.Label>
          <Form.Control
            id="publicationDate"
            placeholder="2022-09-30"
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
          onClick={() => {
            // console.log(Object.entries(formData));
            dispatch(addNewSourceToDb(projectId, formData));
          }}
        >
          Submit
        </Button>
      </fieldset>
    </Form>
  );
};

export default NewSourceForm;
