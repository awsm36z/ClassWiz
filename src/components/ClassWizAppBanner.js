import React, {Component} from 'react';
import {Font} from 'expo';
import {View, Text, StyleSheet} from 'react-native';
import colors from 'config/colors';
import FontLoadingComponent from './FontLoadingComponent';

class ClassWizAppBanner extends FontLoadingComponent {
    render() {
        return (
            <View ID="AppBanner">
            {this.state.fontLoaded ? (              
                <View style={styles.loginTitle}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleText}>QuranConnect</Text>
                    </View>
                    <View style={{ marginTop: -5 }}>
                        <Text style={styles.subtitleText}>Serving your passion for the Quran</Text>
                    </View>
                </View>
            ) : (
                <Text>Welcome to QuranConnect...</Text>
                )
            }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleText: {
        color: colors.primaryDark,
        fontSize: 30,
        fontFamily: 'regular',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      },
      subtitleText: {
        color: colors.darkGrey,
        fontSize: 12,
        fontFamily: 'regular',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }
});

export default ClassWizAppBanner;

