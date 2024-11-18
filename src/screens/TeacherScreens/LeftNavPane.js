import React from "react";
import { View, FlatList, ScrollView, StyleSheet } from "react-native";
import colors from "config/colors";
import classImages from "config/classImages";
import { connect } from "react-redux";
import { SafeAreaView } from "react-navigation";
import { ListItem } from "react-native-elements";
import ClassWizAppBanner from "components/ClassWizAppBanner";
import ClassWizDrawerItem from "components/ClassWizDrawerItem";
import teacherImages from "../../../config/teacherImages";

class LeftNavPane extends React.Component {
  openClass = (i, className) => {
    this.props.navigation.push("CurrentClass", {
      classIndex: i,
      classTitle: className
    });
    this.props.navigation.closeDrawer();
  };

  //todo: change the ListItem header and tgfooter below to the shared drawer component intead
  // generalize the ClassWizDrawerItem to accept either an image or an icon
  render() {
    const {name, profileImageId, classes} = this.props;

    const profileCaption = name + "'s profile"
    const teacherImageId = profileImageId ? profileImageId : 0

    return (
      <ScrollView style={{ flex: 1, backgroundColor: colors.lightGrey }}>
        <SafeAreaView
          style={styles.container}
          forceInset={{ top: "always", horizontal: "never" }}
        >
          <View
            style={{
              padding: 10,
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ClassWizAppBanner />
          </View>

          <ClassWizDrawerItem
            title={profileCaption}
            image={teacherImages.images[teacherImageId]}
            onPress={() => this.props.navigation.push("TeacherProfile")}
          />

          <FlatList
            data={this.props.classes}
            keyExtractor={(item, index) => item.name} // fix, should be item.id (add id to classes)
            renderItem={({ item, index }) => (
              <ClassWizDrawerItem
                title={item.name}
                image={classImages.images[item.imageId]}
                onPress={() => this.openClass(index, item.name)}
              />
            )}
          />

          <ClassWizDrawerItem
            title="Add a new class"
            icon="plus"
            onPress={() => this.props.navigation.push("AddClass")}
          />
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => {
  const { classes, name, profileImageId } = state.data.teachers[0];
  return { classes, name, profileImageId };
};

export default connect(mapStateToProps)(LeftNavPane);
