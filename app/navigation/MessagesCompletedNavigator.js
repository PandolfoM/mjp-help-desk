import MessageDetailsScreen from "../Screens/MessageDetailsScreen";
import MessagesCompletedScreen from "../Screens/MessagesCompletedScreen";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");
const { default: MessagesScreen } = require("../Screens/MessagesScreen");

const Stack = createNativeStackNavigator();

const MessagesCompletedNavigator = () => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="Messages" component={MessagesCompletedScreen} />
    <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
  </Stack.Navigator>
);

export default MessagesCompletedNavigator;
