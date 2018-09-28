import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  BackHandler,
  ToastAndroid,
  ImageBackground,
  TouchableHighlight
} from "react-native";
import { Actions } from "react-native-router-flux";

export default class DrawerLayout extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener("hardwareBackPress", () => {
      Alert.alert(
        "Exit App",
        "Are you sure you want to exit ?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "OK",
            onPress: () => BackHandler.exitApp()
          }
        ],
        {
          cancelable: false
        }
      );
      return true;
    });
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  renderImage() {}

  showAlert = () => {
    Actions.drawerClose();
    Alert.alert(
      "Confirmation",
      "Are you sure you want to logout?",
      [
        {
          text: "No-Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Yes Logout"
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    const {
      container,
      headerContainer,
      textStyle,
      headerTextStyle,
      itemStyle,
      navListContainer,
      imgStyle,
      drawerLogoImgStyle
    } = styles;

    return (
      <ImageBackground
        source={require("../../images/drawer_bg.png")}
        style={container}
      >
        <View style={headerContainer}>
          <Image
            source={require("../../images/logo.png")}
            style={drawerLogoImgStyle}
          />
          <Text style={headerTextStyle}>{`Saurabh Gavhane`}</Text>
        </View>
        <View style={navListContainer}>
          <TouchableHighlight underlayColor={"#ddd"}>
            <View style={itemStyle}>
              <Image
                source={require("../../images/password.png")}
                style={imgStyle}
              />

              <Text style={textStyle}>Records</Text>
            </View>
          </TouchableHighlight>
          <View style={itemStyle}>
            <Image
              source={require("../../images/password.png")}
              style={imgStyle}
            />
            <Text style={textStyle}>My Profile</Text>
          </View>
          <View style={itemStyle}>
            <Image
              source={require("../../images/password.png")}
              style={imgStyle}
            />
            <Text style={textStyle} onPress={() => this.showAlert()}>
              Logout
            </Text>
          </View>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#052a47"
  },
  headerContainer: {
    flex: 2,
    borderBottomColor: "#fff",
    borderBottomWidth: 1,
    paddingLeft: 20,
    paddingBottom: 10,
    justifyContent: "flex-end"
  },
  headerTextStyle: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginEnd: 30
  },
  navListContainer: {
    flex: 4,
    marginTop: 20
  },
  itemStyle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 10
  },
  textStyle: {
    fontSize: 16,
    color: "#fff",
    paddingLeft: 10
  },
  circle: {
    borderRadius: 30,
    backgroundColor: "#ddd",
    margin: 12
  },
  imgStyle: {
    height: "80%",
    width: "20%",
    padding: 10,
    resizeMode: "contain"
  },
  drawerLogoImgStyle: {
    flex: 4,
    width: "80%",
    height: "50%",
    padding: 10,
    margin: 10,
    resizeMode: "contain"
  }
});
