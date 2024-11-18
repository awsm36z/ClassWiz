import React, {Component} from 'react'
import {StyleSheet, TouchableHighlight, Text} from 'react-native'
import colors from 'config/colors'
import PropTypes from 'prop-types'

//--------------------------------------------------------------------------
// A "link" style button. TouchableHighlight over a text with some styling
//--------------------------------------------------------------------------
export default TouchableText = (props) => {
    return (
        <TouchableHighlight
            onPress={props.onPress}>
            <Text style={styles.container}>{props.text}</Text>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        color: colors.primaryDark,
        marginLeft:10,
        marginTop:10,
        marginBottom:10,
        paddingTop:7,
        paddingBottom:7,
        paddingRight:21,
        paddingLeft:21,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    }
});

TouchableText.propTypes = {
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
}