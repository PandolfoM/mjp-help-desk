import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";

import MessagesScreen from "../Screens/MessagesScreen";
import SubmitScreen from "../Screens/SubmitScreen";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Header from "../components/Header";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, Image, View } from "react-native";
import Screen from "../components/Screen";
import ListItem from "../components/ListItem";
import { AuthContext } from "../auth/context";
import DrawerItems from "../Screens/DrawerItems";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabRoutes({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Submit"
      screenOptions={{
        tabBarShowLabel: false,
        headerRight: () => (
          <Header
            image={require("../assets/matt.png")}
            onPress={navigation.toggleDrawer}
          />
        ),
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              iconColor={colors.primary}
              backgroundColor="transparent"
              name={focused ? "send" : "send-outline"}
              size={50}
            />
          ),
        }}
        name="Submit"
        component={SubmitScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              iconColor={colors.secondary}
              backgroundColor="transparent"
              name={focused ? "message" : "message-outline"}
              size={50}
            />
          ),
        }}
        name="Messages"
        component={MessagesScreen}
      />
    </Tab.Navigator>
  );
}

function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerItems {...props} />}
      screenOptions={() => ({
        headerShown: false,
        headerLeft: () => null,
        drawerPosition: "right",
      })}>
      <Drawer.Screen component={TabRoutes} name="Home" />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
