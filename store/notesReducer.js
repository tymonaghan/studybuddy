const SET_CURRENT_NOTES = "SET_CURRENT_NOTES";
const ADD_NEW_NOTE = "ADD_NEW_NOTE";
const GET_NOTES_BY_PROJECT = "GET_NOTES_BY_PROJECT";
const DELETE_NOTE = "DELETE_NOTE";
const UPDATE_NOTE = "UPDATE_NOTE";

const Axios = require("axios");

const addNewNote = (note) => {
  return { type: ADD_NEW_NOTE, note };
};

const deleteNote = (noteId) => {
  return { type: DELETE_NOTE, noteId };
};

const setCurrentNotes = (notes) => {
  return { type: SET_CURRENT_NOTES, notes };
};

const getAllTheNotes = (notes) => {
  return { type: GET_NOTES_BY_PROJECT, notes };
};

const updateNote = (noteId, note) => {
  return { type: UPDATE_NOTE, noteId, note };
};

export const getNotesForProject = (projectId) => async (dispatch) => {
  try {
    const response = await Axios({
      method: "get",
      url: `/api/projects/${projectId}/getNotes`,
    });
    dispatch(getAllTheNotes(response.data));
  } catch (error) {
    console.log(`error in the "get notes for project" thunk: ${error}`);
  }
};

export const addNewNoteToDb =
  (projectId, sourceId, newNote) => async (dispatch) => {
    try {
      const response = await Axios({
        method: "post",
        url: `/api/projects/${projectId}/source/${sourceId}/addNote`,
        data: newNote,
      });
      dispatch(addNewNote(response.data));
    } catch (error) {
      console.log(`error in the addNewNoteToDb thunk: ${error}`);
    }
  };

export const setCurrentNotesThunk = (noteId) => async (dispatch) => {
  try {
    const response = await Axios.get(
      `/api/projects/:projectId/source/${noteId}`
    );
    dispatch(setCurrentNotes(response.data));
  } catch (error) {
    console.log(`error in the setCurrentNotesThunk: ${error}`);
  }
};

export const attachNoteToClaimInDb = (noteId, claimId) => async (dispatch) => {
  try {
    const response = await Axios({
      method: "put",
      url: `/api/projects/:projectId/note/${noteId}/attachToClaim/${claimId}`,
    });
    dispatch(updateNote(noteId, response.data));
  } catch (error) {
    console.log(`error in the attachNoteToClaimInDb thunk: ${error}`);
  }
};

export function currentNotesReducer(state = [], action) {
  switch (action.type) {
    case SET_CURRENT_NOTES:
      return [...action.notes];
    case GET_NOTES_BY_PROJECT:
      return [...action.notes];
    case ADD_NEW_NOTE:
      return [...state, action.note];
    case UPDATE_NOTE:
      return state.map((note) => {
        if (note.id == action.noteId) return action.note;
        else return note;
      });
    default:
      return state;
  }
}
