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

import { RECORDS, PROFILE } from "../../utils/constants";

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      recordList: [],
      selectedItem: RECORDS
    };
    // Bind the this context to the handler function
    this.drawerClickHandler = this.drawerClickHandler.bind(this);

    this.recordListItemClickHandler = this.recordListItemClickHandler.bind(
      this
    );
  }

  // This method will be sent to the child component
  drawerClickHandler(selectedScreen) {
    // ToastAndroid.show(selectedScreen, ToastAndroid.SHORT);
    //console.log("selectedScreen", selectedScreen);
    this.setState({
      selectedItem: selectedScreen
    });
  }

  recordListItemClickHandler(item) {
    Actions.editRecords();
    ToastAndroid.show("recordListItemClickHandler", ToastAndroid.SHORT);
    ToastAndroid.show(item.serialNo, ToastAndroid.SHORT);
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
    //console.log("Data flatlist", JSON.stringify(nextProps.records));
    //console.log("Data flatlist s", JSON.stringify(nextProps.records.records.s));

    if (nextProps.records != "" && nextProps.records != undefined) {
      if (nextProps.records.records.s) {
        // console.log(
        //   "Data flatlist",
        //   JSON.stringify(nextProps.records.records.d)
        // );

        this.setState({
          recordList: nextProps.records.records.d
        });
      }
    }
  }

  toggleDrawer() {
    if (this._drawer.open()) {
      console.log("onPress Drawer Close");
      closeControlPanel();
    } else {
      console.log("onPress Drawer Open");
      this.openControlPanel();
    }
  }

  makeRecordFetchRequest = () => {
    //console.log("Record", this.state.token);
    this.props.fetchRecords(this.state.token);
  };

  closeControlPanel = () => {
    this._drawer.close();
  };
  openControlPanel = () => {
    this._drawer.open();
  };

  toolBar() {
    return (
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
                styles.addImage,
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
                {this.state.selectedItem}
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
      </View>
    );
  }

  dyanamicScreens() {
    return (
      <View>
        {this.state.selectedItem == RECORDS ? (
          <View style={styles.container}>
            {this.state.recordList.length > 0 ? (
              <FlatList
                data={this.state.recordList}
                renderItem={({ item }) => (
                  <RecordListItem
                    onPressItem={this.recordListItemClickHandler}
                    serialNo={"Serial No: " + item.serialNo}
                    signerName={"Signer Name: " + item.signer[0].firstName}
                    createdDate={"Created Date: " + item.createdAt}
                    modifiedDate={"Modified Date: " + item.updatedAt}
                  />
                )}
                keyExtractor={item => item.serialNo + ""}
              />
            ) : (
              <Text>FlatList</Text>
            )}
          </View>
        ) : (
          <Text>FlatList</Text>
        )}
      </View>
    );
  }

  render() {
    return (
      <Drawer
        ref={ref => (this._drawer = ref)}
        openDrawerOffset={0.2}
        tapToClose={true}
        height={65}
        content={
          <DrawerLayout
            drawerAction={this.drawerClickHandler}
            refer={this._drawer}
          />
        }
      >
        {this.toolBar()}

        {this.dyanamicScreens()}
      </Drawer>
    );
  }
}

const DEVICE_WIDTH = Dimensions.get("window").width;
const DEVICE_HEIGHT = Dimensions.get("window").height;
const MARGIN = 45;

const styles = StyleSheet.create({
  container: {},
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
    padding: 10,
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
