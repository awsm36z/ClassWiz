import React from 'react';
import {createDrawerNavigator, createAppContainer} from 'react-navigation';
import { Icon } from 'react-native-elements';
import AddClassNavigator from './AddClass/AddClassNavigator';
import ClassHeaderNavigator from './ClassTabs/ClassHeaderNavigator';
import LeftNavPane from './LeftNavPane';
import TeacherProfileNavigator from './TeacherProfile/TeacherProfileNavigator';

const routeConfig = {
  TeacherProfile: {
    screen: TeacherProfileNavigator,
    navigationOptions: ({ navigation }) => ({
      title: 'Mrs. Eslam',
    })
  },
  //Todo: The drawer must be dynamic and must map out all of the classes and display them in
  //the drawer options
  CurrentClass: {
    screen: ClassHeaderNavigator,
    path: 'teacher/class/tabs', //todo: the path should have class id as a param to be unique
    navigationOptions: ({ navigation }) => ({
        title: 'Monday Class',
      }),
 },
 AddClass: {
  screen: AddClassNavigator,
  path: 'teacher/class/new',
  navigationOptions: ({ navigation }) => ({
     title: 'Add new class',
   }),
}
};

const navigationConfig = {
    contentComponent: LeftNavPane,
    drawerWidth: 325,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    initialRouteName: 'CurrentClass'
}


const drawer = createDrawerNavigator(routeConfig, navigationConfig);

export default createAppContainer(drawer);
