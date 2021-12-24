import { SET_ERRORS, CLEAR_ERRORS } from './types';

// RETURN ERRORS
export const setErrors = (msg, status, id = null) => {
  return {
    type: SET_ERRORS,
    payload: { msg, status, id }
  };
};

// CLEAR ERRORS
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
