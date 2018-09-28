import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  View,
  Image,
  TouchableOpacity
} from "react-native";

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity>
          <Image
            source={{
              uri:
                "https://reactnativecode.com/wp-content/uploads/2018/04/hamburger_icon.png"
            }}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 0,
    alignItems: "center",
    justifyContent: "center"
  }
});
