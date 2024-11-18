import React from 'react';
import {createBottomTabNavigator, createAppContainer, DrawerActions} from 'react-navigation';
import colors from 'config/colors';
import { Icon } from 'react-native-elements';
import ClassMainScreen from './ClassMainScreen';
import ClassAttendanceScreen from './ClassAttendanceScreen';

  const routeConfig = {
    AttendanceTab: {
        screen: ClassAttendanceScreen,
        path: '/first_run',
        navigationOptions: {
        tabBarLabel: 'Attendance',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name="calendar-check-o"
                size={20}
                type="font-awesome"
                color={tintColor}
            />
        )},
    },
    ClassStudentsTab: {
        screen: ClassMainScreen,
        path: '/class',
        navigationOptions: {
        tabBarLabel: 'Class',
        tabBarIcon: ({ tintColor, focused }) => (
            <Icon
                name="group"
                size={20}
                type="font-awesome"
                color={tintColor}
            />
        ),
        },
    },
}

const navigatorConfig = {
    initialRouteName: 'ClassStudentsTab',
    animationEnabled: false,
    swipeEnabled: true,
    // Android's default option displays tabBars on top, but iOS is bottom
    tabBarPosition: 'bottom',
    tabBarOptions: {
      activeTintColor: colors.black,
      inactiveTintColor: colors.darkGrey,
      style: {
        backgroundColor: colors.white,
        height: 70,
        padding: 10,
      },
      labelStyle: {
          fontSize: 14
      },
      // Android's default showing of icons is false whereas iOS is true
      showIcon: true,
    },
    defaultNavigationOptions: {
        drawerLabel: 'ClassStudentsTab',
        drawerIcon: ({ tintColor }) => (
          <Icon
            name="group"
            size={30}
            iconStyle={{
              width: 30,
              height: 30,
            }}
            type="material"
            color={tintColor}
          />
        ),
      }
  };

const TeacherBottomTabNavigator = createBottomTabNavigator(routeConfig, navigatorConfig);

const ClassTabsNavigator = createAppContainer(TeacherBottomTabNavigator);

export default ClassTabsNavigator;
