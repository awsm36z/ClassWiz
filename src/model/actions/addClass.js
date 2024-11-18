import actionTypes from './actionTypes';

export const addClass = classInfo => (
    {
      type: actionTypes.ADD_CLASS,
      classInfo,
    }
);