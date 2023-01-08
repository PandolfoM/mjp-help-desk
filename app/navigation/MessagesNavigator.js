import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import MessageDetailsScreen from "../Screens/MessageDetailsScreen";
import MessagesCompletedNavigator from "./MessagesCompletedNavigator";
import MessagesOutgoingNavigator from "./MessagesOutgoingNavigator";

const Tab = createMaterialTopTabNavigator();

const MessagesNavigator = () => (
  <Tab.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Tab.Screen
      options={{ tabBarLabel: "Outgoing" }}
      name="MessagesOutgoingNavigator"
      component={MessagesOutgoingNavigator}
    />
    <Tab.Screen
      options={{ tabBarLabel: "Completed" }}
      name="MessagesCompletedNavigator"
      component={MessagesCompletedNavigator}
    />
  </Tab.Navigator>
);

export default MessagesNavigator;
