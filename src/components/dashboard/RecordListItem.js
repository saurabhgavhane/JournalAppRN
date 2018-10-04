import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

export default class RecordListItem extends React.PureComponent {
  _onPress = () => {
    this.props.onPressItem(this.props.id);
  };

  render() {
    return (
      <TouchableOpacity onPress={this._onPress}>
        <View>
          <Text style={styles.textStyle}>{this.props.serialNo}</Text>
          <Text style={styles.textStyle}>{this.props.signerName}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  boldtext: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold"
  },
  normalText: {
    fontSize: 18,
    color: "#000"
  }
});
