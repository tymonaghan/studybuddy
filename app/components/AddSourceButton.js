import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import PopoverBody from "react-bootstrap/PopoverBody";
import PopoverHeader from "react-bootstrap/PopoverHeader";
import Button from "react-bootstrap/Button";
import { NewSourceForm } from ".";

export default function AddSourceButton() {
  return (
    <div className="mb-2">
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        rootClose="true"
        overlay={
          <Popover id={`popover-positioned-bottom`}>
            <Popover.Header as="h3">{`Add a New Source`}</Popover.Header>
            <Popover.Body>
              <NewSourceForm />
            </Popover.Body>
          </Popover>
        }
      >
        <Button
          style={{
            borderRadius: "100px",
          }}
          variant="success"
          size="sm"
        >
          + Add New
        </Button>
      </OverlayTrigger>
    </div>
  );
}
