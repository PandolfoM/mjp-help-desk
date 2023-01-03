import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { Keyboard } from "react-native";
import { AuthContext } from "../auth/context";
import Header from "../components/Header";
import Icon from "../components/Icon";
import colors from "../config/colors";
import { MessageContext } from "../context/MessageContext";
import EditAdmins from "../Screens/EditAdminsScreen";
import AdminMessagesNavigator from "./AdminMessagesNavigator";

const Tab = createBottomTabNavigator();

const DashboardNavigator = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const { unreadCount } = useContext(MessageContext);
  const photo = currentUser.photoURL;

  return (
    <Tab.Navigator
      initialRouteName="AdminMessagesScreen"
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
            onPress={() => {
              navigation.toggleDrawer();
              Keyboard.dismiss();
            }}
          />
        ),
      }}>
      <Tab.Screen
        options={{
          headerTitle: "Edit Admins",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              iconColor={color}
              backgroundColor="transparent"
              name={focused ? "account-group" : "account-group-outline"}
              size={55}
            />
          ),
        }}
        name="EditAdmins"
        component={EditAdmins}
      />
      <Tab.Screen
        options={{
          headerTitle: "Messages",
          tabBarBadge: unreadCount === 0 ? null : unreadCount,
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              iconColor={color}
              backgroundColor="transparent"
              name={focused ? "message" : "message-outline"}
              size={55}
            />
          ),
        }}
        name="AdminMessagesScreen"
        component={AdminMessagesNavigator}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
