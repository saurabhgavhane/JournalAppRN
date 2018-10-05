import { Router, Scene, Drawer } from "react-native-router-flux";
import React from "react";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import DrawerLayout from "./components/dashboard/DrawerLayout";

const RouterComponent = () => (
  <Router>
    <Scene key="root" hideNavBar>
        <Scene key="login" component={Login} initial hideNavBar />
     
      {/* <Drawer
        key="main"
        contentComponent={DrawerLayout}
        drawerWidth={250}
        drawerPosition="left"
      > */}
        <Scene key="records" component={Dashboard} hideNavBar />
        <Scene key="myProfile" component={Login} hideNavBar />
      {/* </Drawer> */}
    </Scene>
  </Router>
);

export default RouterComponent;
