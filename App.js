import { AuthContext, AuthContextProvider } from "./app/auth/context";
import LoginScreen from "./app/Screens/LoginScreen";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import SignUpScreen from "./app/Screens/SignUpScreen";
import SubmitScreen from "./app/Screens/SubmitScreen";
import AccountScreen from "./app/Screens/AccountScreen";
import MessagesScreen from "./app/Screens/MessagesScreen";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./app/navigation/rootNavigation";
import { useContext } from "react";
import AuthNavigator from "./app/navigation/AuthNavigator";
import navigationTheme from "./app/navigation/navigationTheme";

export default function App() {
  // const { currentUser, loading } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <NavigationContainer ref={navigationRef} theme={navigationTheme}>
        <AuthNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
