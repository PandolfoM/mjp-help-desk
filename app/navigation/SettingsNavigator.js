import { useContext } from "react";
import { AuthContext } from "../auth/context";
import Header from "../components/Header";
import Icon from "../components/Icon";
import colors from "../config/colors";
import SettingsScreen from "../Screens/Settings";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

const SettingsNavigator = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const photo = currentUser.photoURL;

  return (
    <Stack.Navigator
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
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
    </Stack.Navigator>
  );
};

export default SettingsNavigator;
