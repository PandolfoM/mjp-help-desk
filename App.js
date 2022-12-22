import "react-native-gesture-handler";
import { AuthContextProvider } from "./app/auth/context";
import NavigateContainer from "./app/navigation/NavigateContainer";

export default function App() {
  return (
    <AuthContextProvider>
      <NavigateContainer />
    </AuthContextProvider>
  );
}
