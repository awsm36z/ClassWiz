import actionTypes from './actionTypes';

export const addNewAssignment = (classIndex, studentIndex, newAssignmentName) => (
    {
        type: actionTypes.ADD_NEW_ASSIGNMENT,
        classIndex,
        studentIndex,
        newAssignmentName
    }
);