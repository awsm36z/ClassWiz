import React, { Component } from "react";
import { ScrollView, View, StyleSheet, TextInput, FlatList } from "react-native";
import Toast, {DURATION} from 'react-native-easy-toast'
import { connect } from "react-redux";
import StudentCard from "components/StudentCard";
import colors from "config/colors";
import { bindActionCreators } from "redux";
import { deleteStudent } from "model/actions/deleteStudent";
import { addStudent } from "model/actions/addStudent";
import ClassWizActionButton from "components/ClassWizActionButton";
import studentImages from "config/studentImages";

export class ClassEditScreen extends Component {
  state = {
    newStudentName: ""
  };

  getAvatarUrl() {
    let photoNum = Math.floor(Math.random() * Math.floor(99));
    let url =
      "https://randomuser.me/api/portraits/thumb/men/" + photoNum + ".jpg";
    return url;
  }

  getImageId() {
    let photoNum = Math.floor(Math.random() * Math.floor(30));
    return photoNum;
  }

  addNewStudent(classIndex) {
    if (this.state.newStudentName) {
    this.props.addStudent({
      classIndex: classIndex,
      studentInfo: {
        name: this.state.newStudentName,
        avatar: this.getAvatarUrl(),
        imageId: this.getImageId(),
        currentAssignment: {
          name: "None",
          startDate: ""
        },
        assignmentHistory:[],
        attendanceHistory: []
      }
    });
    this.refs.toast.show(this.state.newStudentName + " is now added to the class", 
    DURATION.LENGTH_SHORT);
    ;} else {
      alert("Please input a Name!")
    }
  }

  getStudentImage(imageId, avatar) {
    console.log(imageId, avatar)
    return imageId? studentImages.images[imageId] : { uri: avatar };
  }

  render() {
    const { params } = this.props.navigation.state;
    const { deleteStudent, addStudent, classes } = this.props;
    
    classIndex = params && params.classIndex? params.classIndex : 0;

    return (
      <ScrollView style={styles.container}>
        <View ID={classIndex} style={styles.inputContainer}>
          <TextInput
            placeholder="Enter new student's name"
            onChangeText={newStudentName => this.setState({ newStudentName })}
            value={this.state.newStudentName}
          />
          <ClassWizActionButton
            text="Add student"
            onPress={() => this.addNewStudent(classIndex)}
          />
        </View>
        <FlatList
          data={classes[classIndex].students}
          keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
          renderItem={({ item, index }) => (
            <StudentCard
              key={index}
              studentName={item.name}
              profilePic={ this.getStudentImage(item.imageId, item.avatar)}
              background={colors.white}
              onPress={() =>
                deleteStudent(
                  classIndex,
                  index
                )
              }
            />
          )}
        />
        <Toast ref="toast"/>
      </ScrollView>
    );
  }
}

//Styles for the entire container along with the top banner
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    backgroundColor: colors.lightGrey,
    flex: 1
  },
  inputContainer: {
    flexDirection: "column",
    backgroundColor: colors.white,
    padding: 10,
    flex: 1
  },
  classTitle: {
    color: colors.primaryDark,
    fontSize: 25
  }
});

const mapStateToProps = state => {
  const { classes } = state.data.teachers[0];
  return { classes };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteStudent,
      addStudent
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClassEditScreen);
 