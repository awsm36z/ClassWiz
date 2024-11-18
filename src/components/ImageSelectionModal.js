import React, { Component } from 'react'
import { View, StyleSheet, Modal } from 'react-native'
import PropTypes from 'prop-types'
import ImageSelectionGrid from 'components/ImageSelectionGrid'
import TouchableText from 'components/TouchableText'
import colors from 'config/colors'

//-------------------------------------------------------------
// A Modal dialog that renders passed in data over ImageSelectionGrid
// + a cancel button. It also styles the Modal to center it, wrap content,
//  and adds shadow and other styling.
//---------------------------------------------------------------
export default ImageSelectionModal = (props) => {
    return (
        <Modal
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"
            visible={props.visible}
            onRequestClose={() => {
            }}>

            <View style={{ flexDirection: 'row', flexWap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.container}>
                    <ImageSelectionGrid
                        images={props.images}
                        onImageSelected={props.onImageSelected}
                    />
                    <TouchableText
                        text={props.cancelText}
                        onPress={() => {
                            props.setModalVisible(false);
                        }} />
                </View>
            </View>
        </Modal>
    );
}

ImageSelectionModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    images: PropTypes.array.isRequired,
    cancelText: PropTypes.string.isRequired,
    setModalVisible: PropTypes.func.isRequired,
    onImageSelected: PropTypes.func.isRequired
}

//Styles for the Teacher profile class
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: 170,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: colors.grey,
        borderBottomWidth: 1,
        shadowColor: colors.darkGrey,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        paddingRight: 15,
        paddingLeft: 15
    },
})