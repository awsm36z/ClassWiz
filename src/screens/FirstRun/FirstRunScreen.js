import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground} from 'react-native';
import ClassWizActionButton from 'components/ClassWizActionButton'
import ClassWizAppBanner from 'components/ClassWizAppBanner'

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const BG_IMAGE = require('assets/images/read_child_bg.jpg');

class FirstRunScreen extends React.Component {

    onTeacherFlow = () => {
      //todo: get the first class to show from redux persist (current class)
        this.props.navigation.push('TeacherWelcomeScreen', { classIndex: 0, classTitle: "Quran Clas"});
    }

    render() {
        const { navigation } = this.props;
        return (
          <View style={styles.container}>
                <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
                    <ClassWizAppBanner />
                    <View style={styles.spacer}></View>
                    <ClassWizActionButton
                        navigation={navigation}
                        text="I am a teacher"
                        onPress={this.onTeacherFlow} />
                </ImageBackground>
            </View>  
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    spacer: {
      marginTop: 150 //hack, change this to be flex based.
    },
    bgImage: {
      flex: 1,
      top: 0,
      left: 0,
      width: SCREEN_WIDTH,
      height: SCREEN_HEIGHT,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

export default FirstRunScreen;