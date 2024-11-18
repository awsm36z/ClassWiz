import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import TeacherProfileScreen from './TeacherProfileScreen';
import TopBanner from 'components/TopBanner';

const TeacherProfileNavigator = createStackNavigator({
    TeacherProfile: {
        screen: TeacherProfileScreen,
        navigationOptions: ({ navigation }) => ({
            header: (
                <TopBanner
                  LeftIconName="navicon"
                  LeftOnPress={() => navigation.openDrawer()}
                  Title="My Profile"
                />
            )
        })
    }
},
{
    drawerLabel: 'My Profile',
    drawerIcon: ({ tintColor }) => (
        <Icon
          name="plus"
          size={30}
          iconStyle={{
            width: 30,
            height: 30,
          }}
          type="material"
          color={tintColor}
        />
      ),
});

export default TeacherProfileNavigator;