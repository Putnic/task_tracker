import axios from 'axios';
import { GET_TASKS, ADD_TASK, EDIT_TASK, DELETE_TASK, TASKS_LOADING } from './types';
import { SET_VISIBILITY_FILTER, SET_SORTING } from './types';
import { tokenConfig } from './authActions';
import { setErrors } from './errorActions';

// Get Tasks
export const getTasks = () => (dispatch, getState) => {
  // Task loading
  dispatch({ type: TASKS_LOADING });
  
  axios
    .get('/api/tasks', tokenConfig(getState))
    .then(res => {
      dispatch({
        type: GET_TASKS,
        payload: res.data
      })
    })
    .catch(err => 
      dispatch(setErrors(err.response.data, err.response.status))
    );
};

// Add Task
export const addTask = task => (dispatch, getState) => {
  // By default, axios serializes JavaScript objects to JSON
  axios
    .post('/api/tasks', task, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: ADD_TASK,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(setErrors(err.response.data, err.response.status, 'ADD_TASK_FAIL'))
    });
};

export const editTask = (id, task) => (dispatch, getState) => {
  axios.put(`/api/tasks/${id}`, task, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: EDIT_TASK,
        payload: res.data.task
      });
    })
    .catch(err =>
      dispatch(setErrors(err.response.data, err.response.status, 'EDIT_TASK_FAIL'))
    );
};

export const deleteTask = id => (dispatch, getState) => {
  axios
    .delete(`/api/tasks/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_TASK,
        payload: id
      })
    )
    .catch(err =>
      dispatch(setErrors(err.response.data, err.response.status))
    );
};

// Task is loading
export const setTasksLoading = () => {
  return {
    type: TASKS_LOADING
  };
};

// Filter Task
export const setVisibilityFilter = filter => ({
  type: SET_VISIBILITY_FILTER,
  payload: filter
})

// Sorting Task
export const setSort = (name, order) => ({
  type: SET_SORTING,
  payload: {name, order}
})
