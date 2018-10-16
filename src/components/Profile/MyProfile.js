import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Image,
  TouchableOpacity,
  Text,
  ToastAndroid,
  AsyncStorage,
  ToolbarAndroid,
  ImageBackground,
  FlatList
} from "react-native";
import TextInput from "react-native-material-textinput";

import Drawer from "react-native-drawer";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Dimensions from "Dimensions";

import { APP_COLOR } from "../../utils/constants";

import userImg from "../../images/user.png";

class MyProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.edtBoxViewStyle}>
          <Image source={userImg} />
          <TextInput
            style={styles.inputBoxStyle}
            label="Firstname"
            value={this.state.firstname}
            onChangeText={firstname => this.setState({ firstname })}
          />
        </View>
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginRight: 5,
    marginLeft: 5
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  LabelStyle: {
    fontWeight: "bold",
    fontSize: 25,
    color: APP_COLOR
  },
  edtBoxViewStyle: {
    
    flex: 1,
    width: DEVICE_WIDTH,
    height: 50,
    flexDirection: "row"
  },
  inputBoxStyle: {
    height: 45
  }
});

export default MyProfile;
