import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";

import MessagesScreen from "../Screens/MessagesScreen";
import SubmitScreen from "../Screens/SubmitScreen";
import Icon from "../components/Icon";
import colors from "../config/colors";
import Header from "../components/Header";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerItems from "../Screens/DrawerItems";
import { AuthContext } from "../auth/context";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function TabRoutes({ navigation }) {
  const { currentUser } = useContext(AuthContext);
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
          tabBarIcon: ({ focused }) => (
            <Icon
              iconColor={colors.primary}
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
          tabBarBadge: 4,
          tabBarIcon: ({ focused }) => (
            <Icon
              iconColor={colors.secondary}
              backgroundColor="transparent"
              name={focused ? "message" : "message-outline"}
              size={55}
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
