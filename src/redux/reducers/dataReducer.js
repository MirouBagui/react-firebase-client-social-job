import {
  SET_JOBS,
  LIKE_JOB,
  UNLIKE_JOB,
  LOADING_DATA,
  DELETE_JOB,
  POST_JOB,
  SET_JOB,
  SUBMIT_COMMENT
} from '../types';

const initialState = {
  jobs: [],
  job: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false
      };
    case SET_JOB:
      return {
        ...state,
        job: action.payload
      };
    case LIKE_JOB:
    case UNLIKE_JOB:
      let index = state.jobs.findIndex(
        (job) => job.jobId === action.payload.jobId
      );
      state.jobs[index] = action.payload;
      if (state.job.jobId === action.payload.jobId) {
        state.job = action.payload;
      }
      return {
        ...state
      };
    case DELETE_JOB:
      index = state.jobs.findIndex(
        (job) => job.jobId === action.payload
      );
      state.jobs.splice(index, 1);
      return {
        ...state
      };
    case POST_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        job: {
          ...state.job,
          comments: [action.payload, ...state.job.comments]
        }
      };
    default:
      return state;
  }
}
