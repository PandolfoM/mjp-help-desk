import AdminMsgsCompletedScreen from "../Screens/AdminMsgsCompletedScreen";
import MessageDetailsScreen from "../Screens/MessageDetailsScreen";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

const AdminMsgsCompletedNavigator = () => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen
      name="AdminMessagesCompleted"
      component={AdminMsgsCompletedScreen}
    />
    <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
  </Stack.Navigator>
);

export default AdminMsgsCompletedNavigator;
