import actionTypes from './actionTypes';

export const saveEvaluationPage = (evaluationInfo, classIndex, studentIndex) => (
    {
      type: actionTypes.SAVE_EVALUATION_PAGE,
      classIndex,
      evaluationInfo,
      studentIndex
    }
);