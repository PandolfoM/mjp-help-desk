import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useContext } from "react";

import { AuthContext } from "../auth/context";
import colors from "../config/colors";
import DashboardNavigator from "./DashboardNavigator";
import DrawerItems from "../Screens/DrawerItems";
import Header from "../components/Header";
import Icon from "../components/Icon";
import MessagesNavigator from "./MessagesNavigator";
import SubmitScreen from "../Screens/SubmitScreen";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabRoutes({ navigation }) {
  useNotifications();
  const { currentUser, isAdmin } = useContext(AuthContext);
  const photo = currentUser.photoURL;

  return (
    <Tab.Navigator
      initialRouteName="Submit"
      screenOptions={{
        tabBarShowLabel: false,
        headerRight: () => (
          <Header
            image={photo && photo}
            IconComponent={
              !photo && (
                <Icon
                  sizeMultiplier={1}
                  iconColor={colors.dark}
                  backgroundColor="transparent"
                  name="account-circle"
                  size={35}
                  style={{ marginHorizontal: 10 }}
                />
              )
            }
            onPress={navigation.toggleDrawer}
          />
        ),
      }}>
      <Tab.Screen
        options={{
          headerTitle: "MJP Systems",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              iconColor={color}
              backgroundColor="transparent"
              name={focused ? "send" : "send-outline"}
              size={55}
            />
          ),
        }}
        name="Submit"
        component={SubmitScreen}
      />
      <Tab.Screen
        options={{
          tabBarBadge: null,
          headerTitle: "Messages",
          tabBarIcon: ({ focused, color }) => (
            <Icon
              iconColor={color}
              backgroundColor="transparent"
              name={focused ? "message" : "message-outline"}
              size={55}
            />
          ),
        }}
        name="MessageFeed"
        component={MessagesNavigator}
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
      <Drawer.Screen component={DashboardNavigator} name="Dashboard" />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
