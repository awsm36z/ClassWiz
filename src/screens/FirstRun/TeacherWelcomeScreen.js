import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, ToastAndroid, KeyboardAvoidingView } from 'react-native';
import ClassWizActionButton from 'components/ClassWizActionButton';
import Toast, {DURATION} from 'react-native-easy-toast'
import { saveTeacherInfo } from "model/actions/saveTeacherInfo";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import colors from 'config/colors';
import ImageSelectionRow from 'components/ImageSelectionRow'
import ImageSelectionModal from 'components/ImageSelectionModal'
import TeacherInfoEntries from 'components/TeacherInfoEntries'
import teacherImages from 'config/teacherImages'

//To-Do: All info in this class is static, still needs to be hooked up to data base in order
//to function dynamically
export class TeacherWelcomeScreen extends Component {
    
    //--- state captures the inputted user info ------------------
    state = {
        name: this.props.name,
        phoneNumber: this.props.phoneNumber,
        emailAddress: this.props.emailAddress,
        modalVisible: false,
        profileImageId: this.props.profileImageId,
        highlightedImagesIndices: [1, 2, 3, 10]
    }

    //--- event handlers, handle user interaction ------------------
    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onImageSelected(index) {
        let candidateImages = this.state.highlightedImagesIndices;

        if (!this.state.highlightedImagesIndices.includes(index)) {
            candidateImages.splice(0, 1);
            candidateImages.splice(0, 0, index);
        }

        this.setState({
            profileImageId: index,
            highlightedImagesIndices: candidateImages
        })

        this.setModalVisible(false);
    }

    onTeacherFlow = () => {
        //todo: get the first class to show from redux persist (current class)
        this.props.navigation.push('TeacherScreens', { classIndex: 0, classTitle: "Quran Clas" });
    }

    //this method saves the new profile information to the redux database
    saveProfileInfo = (teacherID) => {
        this.props.saveTeacherInfo(
            teacherID,
            this.state
        );
        this.refs.toast.show('Your profile has been saved', DURATION.LENGTH_SHORT);
        this.onTeacherFlow();
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

    //---------- render method ---------------------------------
    // The following custom components are used below:
    // -    ImageSelectionModal: implements the pop up modal to allow users to customize their avatar
    // -    TeacherInfoEntries: contains entries to capture user info (name, email, and phone number)
    // -    ImageSelectionRow: a row with suggested avatars, and a button to invoke the pop up with more avatars
    //-----------------------------------------------------------
    render() {
        return (
            //Random image appears, still need to hook up database, see to-do above
            <View style={styles.container}>
                <ImageSelectionModal
                    visible={this.state.modalVisible}
                    images={teacherImages.images}
                    cancelText="Cancel"
                    setModalVisible={this.setModalVisible.bind(this)}
                    onImageSelected={this.onImageSelected.bind(this)}
                />

                <View style={styles.picContainer}>
                    <Image
                        style={styles.welcomeImage}
                        source={require('assets/images/salam.jpg')} />
                    <Text style={styles.quote}>Teachers are very dear to our hearts.  It is our
great honor and pleasure to serve your dedication to nurturing your students.</Text>
                </View>
                <KeyboardAvoidingView style={styles.editInfo} behavior="padding">
                    <TeacherInfoEntries
                        name={this.state.name}
                        phoneNumber={this.state.phoneNumber}
                        emailAddress={this.state.emailAddress}
                        onNameChanged={this.onNameChanged}
                        onPhoneNumberChanged={this.onPhoneNumberChanged}
                        onEmailAddressChanged={this.onEmailAddressChanged}
                    />
                    <ImageSelectionRow
                        highlightedImagesIndices={this.state.highlightedImagesIndices}
                        onImageSelected={this.onImageSelected.bind(this)}
                        onShowMore={() => this.setModalVisible(true)}
                        selectedImageIndex={this.state.profileImageId}
                    /> 
                </KeyboardAvoidingView>
                <View style={styles.buttonsContainer}>
                    <ClassWizActionButton
                        text="Save"
                        onPress={() => this.saveProfileInfo(0)} //to-do: Make sure that teacher ID 
                    //is passed instead of 0
                    />
                </View>
                <Toast ref="toast"/>
            </View>
        )
    }

}

//-----------------   Styles for the Teacher profile class-----------------------------------
const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: colors.lightGrey,
        flex: 1
    },
    picContainer: {
        paddingTop: 10,
        alignItems: 'center',
        paddingBottom: 10,
        marginTop: 15,
        marginBottom: 10,
        backgroundColor: colors.white,
        flex: 1
    },
    quote: {
        fontSize: 16,
        paddingLeft: 20,
        fontStyle: 'italic',
        paddingBottom: 15,
        color: colors.darkGrey
    },
    welcomeImage: {
        marginTop: 25,
        width: 180,
        height: 111,
        resizeMode: 'contain',
    },
    editInfo: {
        flexDirection: 'column',
        backgroundColor: colors.white,
        color: colors.darkGrey
    },
    buttonsContainer: {
        flexDirection: 'column',
        marginTop: 10,
        backgroundColor: colors.white,
        justifyContent: 'center',
    }
})

//-------------- Redux hooks ----------------------------------------------------
const mapStateToProps = state => {
    const { name, phoneNumber, emailAddress, profileImageId } = state.data.teachers[0];
    return { name, phoneNumber, emailAddress, profileImageId };
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveTeacherInfo
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(TeacherWelcomeScreen);
