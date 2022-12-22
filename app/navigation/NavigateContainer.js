import { NavigationContainer } from "@react-navigation/native";
import { useContext } from "react";

import AuthNavigator from "./AuthNavigator";
import { AuthContext } from "../auth/context";
import navigationTheme from "./navigationTheme";
import { navigationRef } from "./rootNavigation";
import AppNavigator from "./AppNavigator";

function NavigateContainer() {
  const { currentUser, loading } = useContext(AuthContext);

  return (
    <NavigationContainer ref={navigationRef} theme={navigationTheme}>
      {!loading && currentUser ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
}

export default NavigateContainer;
