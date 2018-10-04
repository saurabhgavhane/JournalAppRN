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
  FlatList
} from "react-native";
import RecordListItem from "./RecordListItem";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Dimensions from "Dimensions";
import { fetchRecords } from "../../actions";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      recordList: []
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("Token")
      .then(value => {
        if (value) {
          this.setState({ token: value });
          this.makeRecordFetchRequest();
        }
      })
      .done();
  }

  componentWillReceiveProps(nextProps) {
    console.log("Data flatlist", JSON.stringify(nextProps.records));
    console.log("Data flatlist s", JSON.stringify(nextProps.records.records.s));

    if (nextProps.records != "" && nextProps.records != undefined) {
      if (nextProps.records.records.s) {
        console.log("Data flatlist", JSON.stringify(nextProps.records.records.d));

        this.setState({
          recordList: nextProps.records.records.d
        });
      }
    }
  }

  // componentDidMount() {
  //   console.log("RecordFetchRequest");
  //   this.makeRecordFetchRequest();
  // }

  makeRecordFetchRequest = () => {
    console.log("Record", this.state.token);
    this.props.fetchRecords(this.state.token);
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.recordList.length > 0 ? (
          <FlatList
            data={this.state.recordList}
            renderItem={({ item }) => (
              <RecordListItem
                serialNo={"Serial No: " + item.serialNo}
                signerName={"Signer Name: " + item.signer[0].firstName}
                createdDate={"Created Date: " + item.createdAt}
                modifiedDate={"Modified Date: " + item.updatedAt}
              />
            )}
            keyExtractor={item => item.serialNo}
          />
        ) : (
          <Text>FlatList</Text>
        )}
      </View>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 45;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

const mapsStateToProps = state => {
  return {
    records: state.records
  };
};

export default connect(
  mapsStateToProps,
  { fetchRecords }
)(DashBoard);
