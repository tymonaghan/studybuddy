const SET_USER_PROJECTS = "SET_USER_PROJECTS";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";

import Axios from "axios";

const setUserProjects = (projects) => {
  // console.dir(projects);
  return { type: SET_USER_PROJECTS, projects };
};

const addNewProject = (newProject) => {
  // console.log(`logging newProject from addNewProject action creator:`);
  // console.dir(newProject);
  return { type: ADD_NEW_PROJECT, newProject };
};

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
