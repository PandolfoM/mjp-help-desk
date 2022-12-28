import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useContext } from "react";
import { Keyboard } from "react-native";
import { AuthContext } from "../auth/context";
import Header from "../components/Header";
import Icon from "../components/Icon";
import colors from "../config/colors";
import AppDetailsScreen from "../Screens/AppDetailsScreen";
import EditAdmins from "../Screens/EditAdminsScreen";

const Tab = createBottomTabNavigator();

const DashboardNavigator = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const photo = currentUser.photoURL;
  console.log(photo);

  return (
    <Tab.Navigator
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
          headerTitle: "App Details",
          tabBarShowLabel: false,
          tabBarIcon: ({ focused, color }) => (
            <Icon
              iconColor={color}
              backgroundColor="transparent"
              name={focused ? "note-edit" : "note-edit-outline"}
              size={55}
            />
          ),
        }}
        name="AppDetails"
        component={AppDetailsScreen}
      />
    </Tab.Navigator>
  );
};

export default DashboardNavigator;
