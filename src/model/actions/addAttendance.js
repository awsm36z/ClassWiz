import actionTypes from './actionTypes';

export const addAttendance = (classIndex, attendanceInfo) => (
    {
        type: actionTypes.ADD_ATTENDANCE,
        classIndex,
        attendanceInfo
    }
);