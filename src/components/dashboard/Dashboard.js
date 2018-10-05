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
import RecordListItem from "./RecordListItem";
import DrawerLayout from "./DrawerLayout";
import Drawer from "react-native-drawer";

import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Dimensions from "Dimensions";
import { fetchRecords } from "../../actions";

import addImg from "../.././images/add_white.png";
import toolbarBgImg from "../.././images/header.png";
import drawerMenuImg from "../.././images/drawer_menu.png";

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
        console.log(
          "Data flatlist",
          JSON.stringify(nextProps.records.records.d)
        );

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

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        openDrawerOffset={0.2}
        type="overlay"
        tapToClose={true}
        content={<DrawerLayout />}
      >
        <View style={styles.container}>
          <View style={styles.toolbar}>
            <ImageBackground style={styles.toolbarImage} source={toolbarBgImg}>
              <TouchableOpacity
                onPress={() => {
                  if (this._drawer.open()) {
                    this._drawer.close();
                  } else {
                    this._drawer.open();
                  }
                }}
                style={[
                  styles.addImg,
                  {
                    alignself: "left",
                    marginLeft: 10,
                    justifyContent: "flex-start"
                  }
                ]}
              >
                <Image source={drawerMenuImg} style={styles.addImage} />
              </TouchableOpacity>
              <View
                style={[
                  styles.addImage,
                  { alignself: "center", justifyContent: "center" }
                ]}
              >
                <Text source={addImg} style={styles.headerText}>
                  Records
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.addImage,
                  {
                    alignself: "right",
                    marginRight: 10,
                    justifyContent: "flex-end"
                  }
                ]}
              >
                <Image source={addImg} style={styles.addImage} />
              </TouchableOpacity>
            </ImageBackground>
          </View>

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
      </Drawer>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 45;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  },
  toolbar: {
    height: 56,
    backgroundColor: "#FFFFFFFF"
  },
  addImage: {
    resizeMode: "contain"
  },
  addImageView: {
    flex: 0.33,
    resizeMode: "contain"
  },
  toolbarImage: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  headerText: {
    fontSize: 25,
    color: "#FFF",
    fontWeight: "bold"
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
