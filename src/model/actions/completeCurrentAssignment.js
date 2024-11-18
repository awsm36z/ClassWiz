import actionTypes from './actionTypes';

export const completeCurrentAssignment = (classIndex, studentIndex, evaluation) => (
    {
        type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
        classIndex,
        studentIndex,
        evaluation
    }
);