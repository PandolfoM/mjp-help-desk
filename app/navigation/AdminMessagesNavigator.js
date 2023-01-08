import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AdminMsgsCompletedNavigator from "./AdminMsgsCompletedNavigator";
import AdminMsgsOutgoingNavigator from "./AdminMsgsOutgoingNavigator";

const Tab = createMaterialTopTabNavigator();

const AdminMessagesNavigator = () => (
  <Tab.Navigator screenOptions={{ presentation: "modal", headerShown: false }}>
    <Tab.Screen
      options={{ tabBarLabel: "Outgoing" }}
      name="AdminMsgsOutgoingNavigator"
      component={AdminMsgsOutgoingNavigator}
    />
    <Tab.Screen
      options={{ tabBarLabel: "Completed" }}
      name="AdminMsgsCompletedNavigator"
      component={AdminMsgsCompletedNavigator}
    />
  </Tab.Navigator>
);

export default AdminMessagesNavigator;
