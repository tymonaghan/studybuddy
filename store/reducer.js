import { Navigate } from "react-router-dom";
import { red } from "chalk";

const Axios = require("axios");

//action type constants
const SET_USER_PROJECTS = "SET_USER_PROJECTS";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const SET_CURRENT_PROJECT_ID = "SET_CURRENT_PROJECT_ID";
const SET_CURRENT_SOURCES = "SET_CURRENT_SOURCES";
const SET_CURRENT_NOTES = "SET_CURRENT_NOTES";
const ADD_NEW_NOTE = "ADD_NEW_NOTE";
const ADD_NEW_SOURCE = "ADD_NEW_SOURCE";
// const TRASH_PROJECT = "TRASH_PROJECT";

// action creator
const setUserProjects = (projects) => {
  // console.dir(projects);
  return { type: SET_USER_PROJECTS, projects };
};

const addNewSource = (source) => {
  return { type: ADD_NEW_SOURCE, source };
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

const addNewProject = (newProject) => {
  // console.log(`logging newProject from addNewProject action creator:`);
  // console.dir(newProject);
  return { type: ADD_NEW_PROJECT, newProject };
};

//thunk creator
export const addNewProjectToDb = (projectName, userId) => async (dispatch) => {
  try {
    const response = await Axios.post("/api/projects/addNew", {
      projectName,
      userId,
    });
    dispatch(addNewProject(response.data));
  } catch (error) {
    console.log(`error in addNewProjectToDb thunk: ${error}`);
  }
};

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

export const retrieveUserProjectsFromDb = (userId) => async (dispatch) => {
  // console.log(`Retrieving user projects from db... userId is ${userId}`);
  try {
    const response = await Axios.get(`/api/user/${userId}/projects`);
    // console.log(`projects loaded from db. dispatching setUserProjects`);
    dispatch(setUserProjects(response.data));
  } catch (error) {
    console.log(`error in retrieveUserProjectsFromDb thunk creator: ${error}`);
  }
};

export function projectsReducer(state = [], action) {
  switch (action.type) {
    case SET_USER_PROJECTS:
      return [...action.projects];
    case ADD_NEW_PROJECT:
      return [...state.projects, action.newProject];
    default:
      return state;
  }
}

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
