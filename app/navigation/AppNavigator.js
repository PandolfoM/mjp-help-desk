import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import MessagesScreen from "../Screens/MessagesScreen";
import SubmitScreen from "../Screens/SubmitScreen";
import Icon from "../components/Icon";
import colors from "../config/colors";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
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
          tabBarIcon: () => (
            <Icon
              iconColor={colors.secondary}
              backgroundColor="transparent"
              name="message"
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

export default AppNavigator;
