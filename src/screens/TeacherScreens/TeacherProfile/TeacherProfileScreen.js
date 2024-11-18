import React, { Component } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, ToastAndroid} from 'react-native';
import Toast, {DURATION} from 'react-native-easy-toast'
import ClassWizActionButton from 'components/ClassWizActionButton';
import TouchableText from 'components/TouchableText'
import teacherImages from 'config/teacherImages'
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import colors from 'config/colors';
import ImageSelectionModal from 'components/ImageSelectionModal'
import TeacherInfoEntries from 'components/TeacherInfoEntries'

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherProfileScreen extends Component {
    state = {
        name: this.props.name,
        phoneNumber: this.props.phoneNumber,
        emailAddress: this.props.emailAddress,
        profileImageId: this.props.profileImageId,
        modalVisible: false,
    }
    //this method resets the text inputs back to the teacher's info
    resetProfileInfo = (teacherID) => {
        this.setState({
            name: this.props.name,
            phoneNumber: this.props.phoneNumber,
            emailAddress: this.props.emailAddress,
            profileImageId: this.props.profileImageId,
        })
    }

    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    //to-do: method must be able to update the profile picture
    editProfilePic = (teacherID) => {
        this.setModalVisible(true);
    }

    //this method saves the new profile information to the redux database
    saveProfileInfo = (teacherID) => {
        this.props.saveTeacherInfo(
            teacherID,
            this.state
        );
        this.refs.toast.show("Your profile has been saved", DURATION.LENGTH_SHORT);
    }

    //------ event handlers to capture user input into state as user modifies the entries -----
    onNameChanged = (value) => {
        this.setState({name: value})
    }

    onPhoneNumberChanged = (value) => {
        this.setState({phoneNumber: value})
    }

    onEmailAddressChanged = (value) => {
        this.setState({emailAddress: value})
    }

    onImageSelected(index) {
        this.setState({profileImageId: index,})
        this.setModalVisible(false);
    }

    //-----------renders the teacher profile UI ------------------------------------
    render() {
        return(

            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <ImageSelectionModal
                    visible={this.state.modalVisible}
                    images={teacherImages.images}
                    cancelText="Cancel"
                    setModalVisible={this.setModalVisible.bind(this)}
                    onImageSelected={this.onImageSelected.bind(this)}
                />
                <View style={styles.picContainer}>
                    <Image 
                        style={styles.profilePic} 
                        source={teacherImages.images[this.state.profileImageId]} />
                    <TouchableText
                        text="Update profile image"
                        onPress={() => this.editProfilePic(0)} />
                </View>
               
                <TeacherInfoEntries
                        name={this.state.name}
                        phoneNumber={this.state.phoneNumber}
                        emailAddress={this.state.emailAddress}
                        onNameChanged={this.onNameChanged}
                        onPhoneNumberChanged={this.onPhoneNumberChanged}
                        onEmailAddressChanged={this.onEmailAddressChanged}
                    />
                <View style={styles.buttonsContainer}>
                    <ClassWizActionButton
                    text="Cancel"
                    onPress={() => this.resetProfileInfo()}
                    />
                    <ClassWizActionButton
                    text="Save"
                    onPress={() => this.saveProfileInfo(0)} //to-do: Make sure that teacher ID 
                                                            //is passed instead of 0
                    />
                </View>
                <Toast ref="toast"/>
            </KeyboardAvoidingView>
        )
    }

}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        flexDirection:'column',
        backgroundColor: colors.lightGrey,
        flex: 1,
        justifyContent: "flex-end"
    },
    picContainer: {
        paddingTop: 25,
        alignItems: 'center',
        paddingBottom: 20,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: colors.white,
    },
    profilePic: {
        width: 130,
        height: 130,
        borderRadius: 65
    },
    editInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white
    }, 
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: colors.black,
        borderBottomWidth: 0.25
    },
    //Next one is the same as previous but since it's like a fencepost algorithm, it has no border
    infoRowLast: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    infoTextInput: {
        paddingRight: 20, 
        fontSize: 16
    },
    infoTitle: {
        paddingLeft: 20, 
        fontSize: 16
    },
    buttonsContainer: {
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        marginTop: 10,
        backgroundColor: colors.white,
    }
})

const mapStateToProps = state => {
    const { name, phoneNumber, emailAddress, profileImageId } = state.data.teachers[0];
    return { name, phoneNumber, emailAddress, profileImageId };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveTeacherInfo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherProfileScreen);

