import actionTypes from './actionTypes';

export const addStudent = studentInfo => (
    {
      type: actionTypes.ADD_STUDENT,
      studentInfo,
    }
  );