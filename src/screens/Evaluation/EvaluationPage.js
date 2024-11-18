import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, Image, FlatList, KeyboardAvoidingView } from 'react-native'
import { Rating, AirbnbRating } from 'react-native-elements';
import colors from 'config/colors';
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import ClassWizActionButton from 'components/ClassWizActionButton'
import {completeCurrentAssignment} from 'model/actions/completeCurrentAssignment'

export class EvaluationPage extends Component {

  // -------------  Current evaluation state ---------------------
  state = {
    overallGrade: 0,
    categoriesGrades: [
      {
        name: "Memorization",
        grade: 'not graded',
      },
      {
        name: "Makharej",
        grade: 'not graded',
      },
      {
        name: "Edgham & Ekhfae",
        grade: 'not graded',
      },
      {
        name: "Rulings of Raa'",
        grade: 'not graded',
      },
      {
        name: "Muduud",
        grade: 'not graded',
      },
      {
        name: "Qalqalah",
        grade: 'not graded',
      },
    ], 
    notes: ""
  }

  // --------------  Updates state to reflect a change in a category rating --------------
  updateCategoryRating = (name, rating) => {
    let categoriesGrades = this.state.categoriesGrades.map(cat => (
      cat.name===name? {...cat, grade: rating}: cat
    ))
    this.setState({ categoriesGrades })
  }

  // --------------  Renders Evaluation scree UI --------------
  render() {
    const { classIndex, studentIndex } = this.props.navigation.state.params;

    return (
      //----- outer view, gray background ------------------------
      <KeyboardAvoidingView
        style={styles.container}
        behavior="padding">

        <View style={styles.evaluationContainer}>
          <View style={styles.section}>
            <Image source={{ uri: this.props.avatar }}
              style={styles.profilePic} />
            <Text style={styles.titleText}>{this.props.name}</Text>
            <Text style={styles.subTitleText}>{this.props.currentAssignment.name}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.mainQuestionText}>How was {this.props.name}'s tasmee'?</Text>
            <AirbnbRating
              defaultRating={0}
              size={30}
              showRating={false}
              onFinishRating={(value) => this.setState({overallGrade: value})}
            />

            <FlatList
              numColumns={2}
              data={this.state.categoriesGrades}
              keyExtractor={(item, index) => index} // fix, should be item.id (add id to classes)
              renderItem={({ item, index }) => (
                <View style={styles.box} key={index}>
                  <Text style={styles.subCategoryText}>{item.name}</Text>
                  <Rating
                    startingValue={0}
                    type="custom"
                    imageSize={25}
                    showRating={false}
                    onFinishRating={(value) => this.updateCategoryRating(item.name, value)}
                  />
                </View>
              )} />

            <TextInput
              style={styles.notesStyle}
              multiline={true}
              numberOfLines={3}
              onChangeText={(notes) => this.setState({notes})}
              placeholder="Write a note."
              placeholderColor={colors.black}
            />
          </View>

        </View>

        <View style={styles.buttonsContainer}>
          <ClassWizActionButton
            text="Submit"
            onPress={() => { this.props.completeCurrentAssignment(classIndex, studentIndex, this.state) }}
          />
        </View>
      </KeyboardAvoidingView>

    )
  }
}

//--------------- Styles used on this screen -------------------
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: colors.lightGrey,
    flex: 1,
    justifyContent: "flex-end"
  },
  evaluationContainer: {
    paddingTop: 25,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: colors.white,
    flex: 1,
    borderColor: colors.lightGrey,
    borderWidth: 1,
    justifyContent: "flex-end"
  },
  section: {
    alignItems: "center",
    alignSelf: 'stretch',
    padding: 10
  },
  profilePic: {
    width: 65,
    height: 65,
    borderRadius: 35,
    marginTop: -65,
    marginLeft: 10,
    borderColor: colors.white,
    borderWidth: 3
  },
  titleText: {
    color: colors.darkGrey,
    fontSize: 20
  },
  subTitleText: {
    color: colors.primaryDark,
    fontSize: 18
  },
  mainQuestionText: {
    color: colors.darkGrey,
    fontSize: 16,
    marginBottom: 10
  },
  box: {
    borderWidth: 1,
    borderColor: colors.lightGrey,
    alignItems: "center",
    alignSelf: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,
    elevation: 1,
  },
  subCategoryText: {
    color: colors.darkGrey,
    fontSize: 16,
    paddingBottom: 7
  },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  notesStyle: {
    backgroundColor: colors.lightGrey,
    alignSelf: 'stretch',
    margin: 5,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    textAlignVertical: 'top'
  }
});

// ------------ Redux hook up --------------------------------

const mapStateToProps = (state, ownProps) => {
  const { classIndex, studentIndex } = ownProps.navigation.state.params;
  state = state.data.teachers[0].classes[classIndex].students[studentIndex];
  return state;
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    completeCurrentAssignment
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(EvaluationPage);