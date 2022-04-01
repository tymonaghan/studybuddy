import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getNotesForProject } from "../../store/notesReducer";
import { NoteCard } from ".";

export default function NotesView() {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const [notes, updateNotes] = useState([]);
  const initialNotes = useSelector((state) => state.currentNotes);
  const params = useParams();

  useEffect(() => {
    updateNotes(initialNotes);
  }, [initialNotes]);

  useEffect(() => {
    // console.log(projectId);
    dispatch(getNotesForProject(params.projectId));
  }, []);

  return (
    <div>
      {notes[0]
        ? notes.map((note, key) => {
            return <NoteCard key={key} note={note} />;
          })
        : "no notes...yet?"}
    </div>
  );
}
