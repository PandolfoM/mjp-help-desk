import MessageDetailsScreen from "../Screens/MessageDetailsScreen";

const {
  createNativeStackNavigator,
} = require("@react-navigation/native-stack");
const { default: MessagesScreen } = require("../Screens/MessagesScreen");

const Stack = createNativeStackNavigator();

const MessagesOutgoingNavigator = () => (
  <Stack.Navigator
    screenOptions={{ presentation: "modal", headerShown: false }}>
    <Stack.Screen name="Messages" component={MessagesScreen} />
    <Stack.Screen name="MessageDetails" component={MessageDetailsScreen} />
  </Stack.Navigator>
);

export default MessagesOutgoingNavigator;
