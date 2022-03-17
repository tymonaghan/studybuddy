const SET_USER_PROJECTS = "SET_USER_PROJECTS";
const ADD_NEW_PROJECT = "ADD_NEW_PROJECT";
const UPDATE_CURRENT_PROJECT = "UPDATE_CURRENT_PROJECT";
const ADD_CLAIM = "ADD_CLAIM";

import Axios from "axios";

const setUserProjects = (projects) => {
  // console.dir(projects);
  return { type: SET_USER_PROJECTS, projects };
};

const addClaimToProject = (projectId, claim) => {
  return { type: ADD_CLAIM, projectId, claim };
};

const addNewProject = (newProject) => {
  // console.log(`logging newProject from addNewProject action creator:`);
  // console.dir(newProject);
  return { type: ADD_NEW_PROJECT, newProject };
};

const updateCurrentProject = (updatedProject) => {
  return {
    type: UPDATE_CURRENT_PROJECT,
    updatedProject,
  };
};

export const updateCurrentProjectInDb =
  (projectId, updatedProject) => async (dispatch) => {
    try {
      const response = await Axios({
        method: "put",
        url: `/api/projects/${projectId}/updateProject`,
        data: updatedProject,
      });
      dispatch(updateCurrentProject(response.data));
    } catch (error) {
      console.log(`error in the updateCurrentProjectInDb thunk: ${error}`);
    }
  };

export const addNewClaimToDb =
  (projectId, claimNumber, claimText) => async (dispatch) => {
    try {
      const response = await Axios({
        method: "post",
        url: `/api/projects/${projectId}/addClaim`,
        data: { claimNumber, claimText },
      });
      // console.log(response.data);
      dispatch(addClaimToProject(projectId, response.data));
    } catch (error) {
      console.log(`error in the addNewClaimtoDb thunk: ${error}`);
    }
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
      return [...state, action.newProject];
    case UPDATE_CURRENT_PROJECT:
      return state.map((project) => {
        if (project.id == action.updatedProject.id)
          return { ...project, ...action.updatedProject };
        else return project;
      });
    case ADD_CLAIM:
      // console.log(`add_claim action: ${action}`);
      // console.dir(action);
      return state.map((project) => {
        if (project.id == action.projectId) {
          project.claims.push(action.claim);
          return project;
        }
        // return { ...project, [...project.claims] };
        else return project;
      });
    default:
      return state;
  }
}
