import AdminMessagesScreen from "../Screens/AdminMessagesScreen";
import MessageDetailsScreen from "../Screens/MessageDetailsScreen";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");

const Stack = createNativeStackNavigator();

const AdminMsgsOutgoingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="AdminMessages" component={AdminMessagesScreen} />
    <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
  </Stack.Navigator>
);

export default AdminMsgsOutgoingNavigator;
