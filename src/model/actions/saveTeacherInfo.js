import actionTypes from './actionTypes';

export const saveTeacherInfo = (teacherIndex, teacherInfo) => (
    {
      type: actionTypes.SAVE_TEACHER_INFO,
      teacherIndex,
      teacherInfo
    }
);