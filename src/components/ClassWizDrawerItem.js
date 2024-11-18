import React, {Component} from 'react'
import {ListItem} from 'react-native-elements'
import PropTypes from 'prop-types';
import colors from "config/colors";
import {StyleSheet} from "react-native";
import FontLoadingComponent from './FontLoadingComponent';

// a card that displays one menu item in the left navigation menu (hamburger menu)
// params: 
class ClassWizDrawerItem extends FontLoadingComponent {
    render() {
      const {title, image, icon, onPress} = this.props;

      return(
        <ListItem
                backgroundColor={colors.white}
                containerStyle={styles.cardStyle}
                title={title}
                fontFamily='regular'
                leftAvatar={image? {
                  rounded: true,
                  source: image
                } : {
                  rounded: true,
                  icon: {
                    name: icon,
                    type: 'font-awesome',
                    color: colors.primaryDark,
                  },
                  overlayContainerStyle: styles.avatarStyle
                } }

                onPress={() => onPress()}
              />
              )
    }
}

ClassWizDrawerItem.propTypes = {
    title: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    image: PropTypes.number,
    icon: PropTypes.string
}

//Styles that control the look of the card, and everything within it
const styles = StyleSheet.create({
  cardStyle: {
    margin: 5, 
    marginTop: 0,
    borderBottomWidth: 1, 
    borderBottomColor: colors.lightGrey,
  },
  avatarStyle: {
    backgroundColor: colors.primaryLight,
  }
});

export default ClassWizDrawerItem;