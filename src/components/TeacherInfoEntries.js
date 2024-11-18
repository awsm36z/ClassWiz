import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import colors from 'config/colors'

//--------------------------------------------------------------------------
// Teacher info entries (Name, Phone number, and Email address). 
// Used from Teacher welcome flow as well as Teacher profile edit page
//--------------------------------------------------------------------------
export default TeacherInfoEntries = (props) => {
    return (
        <View  style={styles.container}>
            <View style={styles.infoRow}>
                <Text style={styles.subtitle}>Information</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoTitle}>Name</Text>
                <TextInput
                    style={styles.infoTextInput}
                    onChangeText={props.onNameChanged}
                    value={props.name} />
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoTitle}>Phone Number</Text>
                <TextInput
                    style={styles.infoTextInput}
                    onChangeText={props.onPhoneNumberChanged}
                    value={props.phoneNumber} />
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.infoTitle}>Email Address</Text>
                <TextInput
                    style={styles.infoTextInput}
                    onChangeText={props.onEmailAddressChanged}
                    value={props.emailAddress} />
            </View>
        </View>
    );
}

TeacherInfoEntries.propTypes = {
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    emailAddress: PropTypes.string.isRequired,
    onNameChanged: PropTypes.func.isRequired,
    onPhoneNumberChanged: PropTypes.func.isRequired,
    onEmailAddressChanged: PropTypes.func.isRequired,
}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
    },
    subtitle: {
        fontSize: 16,
        paddingLeft: 20,
        color: colors.darkGrey
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomColor: colors.grey,
        borderBottomWidth: 0.25
    },
    infoTextInput: {
        paddingRight: 20,
        fontSize: 14,
        color: colors.darkGrey
    },
    infoTitle: {
        paddingLeft: 20,
        fontSize: 14,
        color: colors.darkGrey
    },
})
