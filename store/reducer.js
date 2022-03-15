import { Navigate } from "react-router-dom";
import { red } from "chalk";

const Axios = require("axios");

//action type constants
const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";
const SET_CURRENT_SOURCES = "SET_CURRENT_SOURCES";
const SET_CURRENT_NOTES = "SET_CURRENT_NOTES";
const ADD_NEW_NOTE = "ADD_NEW_NOTE";
const ADD_NEW_SOURCE = "ADD_NEW_SOURCE";
const TRASH_SOURCE = "TRASH_SOURCE";
// const TRASH_PROJECT = "TRASH_PROJECT";

// action creator

const addNewSource = (source) => {
  return { type: ADD_NEW_SOURCE, source };
};

const trashSource = (sourceId) => {
  return { type: TRASH_SOURCE, sourceId };
};

const addNewNote = (note) => {
  return { type: ADD_NEW_NOTE, note };
};

export const setCurrentNotes = (notes) => {
  // console.log(`hello from setCurrentNotes action creator. notes:`);
  // console.dir(notes);
  return { type: SET_CURRENT_NOTES, notes };
};

const setCurrentSources = (sources) => {
  // console.log(`this is the sources from setCurrentSources action creator:`);
  // console.dir(sources);
  return { type: SET_CURRENT_SOURCES, sources };
};

export const setCurrentProjectId = (projectId) => {
  return { type: SET_CURRENT_PROJECT_ID, projectId };
};

//thunk creator

export const addNewSourceToDb = (projectId, newSource) => async (dispatch) => {
  try {
    const response = await Axios({
      method: "post",
      url: `/api/projects/${projectId}/addSource`,
      data: newSource,
    });
    // console.log(
    //   `data we got here from axios seems to beeee ${response.data}`
    // );
    // console.dir(response.data);

    dispatch(addNewSource(response.data));
  } catch (error) {
    console.log(`error in the addNewSource thunk: ${error}`);
  }
};

export const trashSourceInDb = (projectId, sourceId) => async (dispatch) => {
  try {
    const response = await Axios({
      method: "delete",
      url: `/api/projects/${projectId}/source/${sourceId}`,
    });
    // console.log(
    //   `data we got here from axios seems to beeee ${response.data}`
    // );
    // console.dir(response.data);

    dispatch(trashSource(sourceId));
  } catch (error) {
    console.log(`error in the trash source thunk: ${error}`);
  }
};

export const addNewNoteToDb =
  (projectId, sourceId, newNote) => async (dispatch) => {
    // console.log(
    //   `gday from the thunk mate.\nprojectId:${projectId}\nsourceId:${sourceId}\nnewNote:${newNote}`
    // );
    try {
      const response = await Axios({
        method: "post",
        url: `/api/projects/${projectId}/source/${sourceId}/addNote`,
        data: newNote,
      });
      // console.log(
      //   `data we got here from axios seems to beeee ${response.data}`
      // );
      // console.dir(response.data);

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

export const getCurrentProjectSourcesFromDb =
  (projectId) => async (dispatch) => {
    // take in the projectId number
    try {
      // console.log(`getting current project sources. projectId is ${projectId}`);
      const response = await Axios.get(`/api/projects/${projectId}/getSources`);
      // console.log(`logging response.data:`);
      // console.dir(response.data);
      dispatch(setCurrentSources(response.data));
      //send that response to the setCurrentSources action creator
    } catch (error) {
      console.log(
        red(`error in getCurrentProjectSourcesFromDb (reducer file): ${error}`)
      );
    }
  };

export function currentProjectReducer(state = NaN, action) {
  switch (action.type) {
    case SET_CURRENT_PROJECT_ID:
      return action.projectId;
    default:
      return state;
  }
}

export function currentSourcesReducer(state = [], action) {
  switch (action.type) {
    case SET_CURRENT_SOURCES:
      return [...action.sources];
    case ADD_NEW_SOURCE:
      return [...state, action.source];
    case TRASH_SOURCE:
      let newState = state.filter((source) => {
        return source.id != action.sourceId;
      });

      return newState;
    default:
      return state;
  }
}

export function currentNotesReducer(state = [], action) {
  switch (action.type) {
    case SET_CURRENT_NOTES:
      return [...action.notes];
    case ADD_NEW_NOTE:
      return [...state, action.note];
    default:
      return state;
  }
}
