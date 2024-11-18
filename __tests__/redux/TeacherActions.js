import { addClass } from "model/actions/addClass";
import { addStudent } from "model/actions/addStudent";
import { deleteStudent } from "model/actions/deleteStudent";
import { addAttendance } from "model/actions/addAttendance";
import { addNewAssignment } from "../../src/model/actions/addNewAssignment";
import { completeCurrentAssignment } from "../../src/model/actions/completeCurrentAssignment";
import {saveTeacherInfo} from "../../src/model/actions/saveTeacherInfo"
import { editCurrentAssignment } from "../../src/model/actions/editCurrentAssignment"; 
import actionTypes from "model/actions/actionTypes";

describe('actions', () => {
  // ----------- ADD_CLASS Dispatch ------------------------
  it('should create an action to add a class', () => {
    const classInfo = {
        name: "test class",
        imageId: 1,
        students: []
      };
    const expectedAction = {
      type: actionTypes.ADD_CLASS,
      classInfo
    }
    expect(addClass(classInfo)).toEqual(expectedAction)
  })

  // ----------- ADD_STUDENT Dispatch ------------------------
  it('should create an action to add a student to a class', () => {
      const studentInfo = {
        classIndex: 0,
        studentInfo: {
          name: "Tester Student 1",
          avatar: "http://test.avatar.url",
          currentAssignment: "Test assignment",
          assignmentHistory: [],
          attendanceHistory: []
        }
      };

    const expectedAction = {
      type: actionTypes.ADD_STUDENT,
      studentInfo
    }
    expect(addStudent(studentInfo)).toEqual(expectedAction)
  })

  // ----------- DELETE_STUDENT Dispatch ------------------------
  it('should create an action to delete a student from a class', () => {

    classIndex = 0;
    studentIndex = 3;

    const expectedAction = {
      type: actionTypes.DELETE_STUDENT,
      classIndex,
      studentIndex
    }
    expect(deleteStudent(classIndex, studentIndex)).toEqual(expectedAction)
  })

  // ----------- ADD_ATTENDANCE Dispatch ------------------------
  it('should create an action to update a class attendance', () => {

    let date = Date.now
    const attendanceInfo =[
        {
            date: date,
            isHere: false
        },
        {
            date: date,
            isHere: true
        },
        {
            date: date,
            isHere: false
        },
        {
            date: date,
            isHere: true
        },
        {
            date: date,
            isHere: false
        },
        {
            date: date,
            isHere: true
        }
    ];
    const classIndex = 0;

    const expectedAction = {
      type: actionTypes.ADD_ATTENDANCE,
      classIndex,
      attendanceInfo
    }
    expect(addAttendance(classIndex, attendanceInfo)).toEqual(expectedAction)
  })

// ----------- SAVE_TEACHER_INFO Dispatch ------------------------
it('should create an action to save teacher info', () => {

  teacherIndex = 0;
  teacherInfo = {
    name: "test name"
  };

  const expectedAction = {
    type: actionTypes.SAVE_TEACHER_INFO,
    teacherIndex,
    teacherInfo
  }
  expect(saveTeacherInfo(teacherIndex, teacherInfo)).toEqual(expectedAction)
})

// ----------- EDIT_CURRENT_ASSIGNMENT Dispatch ------------------------
it("should create an action to edit student's assignment", () => {

  classIndex = 0;
  studentIndex = 3;
  newAssignment = {
    name: "current assignment"
  }

  const expectedAction = {
    type: actionTypes.EDIT_CURRENT_ASSIGNMENT,
    classIndex,
    studentIndex,
    newAssignment
  }
  expect(editCurrentAssignment(classIndex, studentIndex, newAssignment)).toEqual(expectedAction)
})

// ----------- ADD_NEW_ASSIGNMENT Dispatch ------------------------
it('should create an action to add a new assignment', () => {

  classIndex = 0;
  studentIndex = 3;
  newAssignmentName = "test name"

  const expectedAction = {
    type: actionTypes.ADD_NEW_ASSIGNMENT,
    classIndex,
    studentIndex,
    newAssignmentName
  }
  expect(addNewAssignment(classIndex, studentIndex, newAssignmentName)).toEqual(expectedAction)
})

// ----------- COMPLETE_ASSIGNMENT Dispatch ------------------------
it("should create an action to complete a student's assignment", () => {

  classIndex = 0;
  studentIndex = 3;
  evaluation = {
    mainGrade: 4,
    categoriesGrades: [
      {
        name: "Memorization",
        grade: 'not graded',
      }
    ],
    notes: "good job"
  }

  const expectedAction = {
    type: actionTypes.COMPLETE_CURRENT_ASSIGNMENT,
    classIndex,
    studentIndex, 
    evaluation
  }
  expect(completeCurrentAssignment(classIndex, studentIndex, evaluation)).toEqual(expectedAction)
})

})
