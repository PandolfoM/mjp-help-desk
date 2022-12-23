import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { AuthContextProvider } from "./app/auth/context";
import NavigateContainer from "./app/navigation/NavigateContainer";
import { useEffect, useState } from "react";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth/react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setIsReady(true);
      console.log(user);
    });
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) return null;

  return (
    <AuthContextProvider>
      <NavigateContainer />
    </AuthContextProvider>
  );
}
