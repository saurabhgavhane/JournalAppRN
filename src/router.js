import { Router, Scene, Drawer } from "react-native-router-flux";
import React from "react";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import EditRecords from "./components/RecordList/EditRecords";
import DrawerLayout from "./components/dashboard/DrawerLayout";

import {
  AUTH,
  LOGIN,
  PROFILE,
  RECORDS,
  MAIN,
  EDIT_RECORDS
} from "./utils/constants";

const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavBar>
      <Scene key={AUTH} hideNavBar initial>
        <Scene key={LOGIN} component={Login} hideNavBar />
      </Scene>
      {/* <Drawer
        key="main"
        contentComponent={DrawerLayout}
        drawerWidth={250}
        drawerPosition="left"
      > */}
      <Scene key={MAIN}>
        <Scene key={RECORDS} component={Dashboard} hideNavBar />
        <Scene key={EDIT_RECORDS} component={EditRecords} hideNavBar />
        <Scene key={PROFILE} component={Login} hideNavBar />
        {/* </Drawer> */}
      </Scene>
    </Scene>
  </Router>
);

export default RouterComponent;
