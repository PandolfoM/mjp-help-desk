import { NavigationContainer } from "@react-navigation/native";
import { useContext, useEffect } from "react";

import AuthNavigator from "./AuthNavigator";
import { AuthContext } from "../auth/context";
import navigationTheme from "./navigationTheme";
import { navigationRef } from "./rootNavigation";
import AppNavigator from "./AppNavigator";
import { auth } from "../../firebaseConfig";

function NavigateContainer() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  console.log("NavigateContainer: ", currentUser);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {currentUser ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default NavigateContainer;
