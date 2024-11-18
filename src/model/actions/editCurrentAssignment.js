import actionTypes from './actionTypes';

export const editCurrentAssignment = (classIndex, studentIndex, newAssignment) => (
    {
        type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
        classIndex,
        studentIndex,
        newAssignment
    }
);