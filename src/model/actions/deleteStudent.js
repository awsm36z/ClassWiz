import actionTypes from './actionTypes';

export const deleteStudent = (classIndex, studentIndex) => (
    {
      type: actionTypes.DELETE_STUDENT,
      classIndex,
      studentIndex
    }
);