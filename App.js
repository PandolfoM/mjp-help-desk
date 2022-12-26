import "react-native-gesture-handler";
import * as SplashScreen from "expo-splash-screen";

import { auth } from "./firebaseConfig";
import { AuthContextProvider } from "./app/auth/context";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth/react-native";
import NavigateContainer from "./app/navigation/NavigateContainer";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, () => {
      setIsReady(true);
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
