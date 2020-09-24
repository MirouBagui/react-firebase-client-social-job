import {
  SET_JOBS,
  LOADING_DATA,
  LIKE_JOB,
  UNLIKE_JOB,
  DELETE_JOB,
  SET_ERRORS,
  POST_JOB,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_JOB,
  STOP_LOADING_UI,
  SUBMIT_COMMENT
} from '../types';
import axios from 'axios';

// Get all jobs
export const getJobs = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get('/jobs')
    .then((res) => {
      dispatch({
        type: SET_JOBS,
        payload: res.data
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_JOBS,
        payload: []
      });
    });
};
export const getJob = (jobId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/job/${jobId}`)
    .then((res) => {
      dispatch({
        type: SET_JOB,
        payload: res.data
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
// Post a job
export const postJob = (newJob) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post('/job', newJob)
    .then((res) => {
      dispatch({
        type: POST_JOB,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
// Like a job
export const likeJob = (jobId) => (dispatch) => {
  axios
    .get(`/job/${jobId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_JOB,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Unlike a job
export const unlikeJob = (jobId) => (dispatch) => {
  axios
    .get(`/job/${jobId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_JOB,
        payload: res.data
      });
    })
    .catch((err) => console.log(err));
};
// Submit a comment
export const submitComment = (jobId, commentData) => (dispatch) => {
  axios
    .post(`/job/${jobId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data
      });
    });
};
export const deleteJob = (jobId) => (dispatch) => {
  axios
    .delete(`/job/${jobId}`)
    .then(() => {
      dispatch({ type: DELETE_JOB, payload: jobId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_JOBS,
        payload: res.data.jobs
      });
    })
    .catch(() => {
      dispatch({
        type: SET_JOBS,
        payload: null
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
