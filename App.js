import LoginScreen from "./app/Screens/LoginScreen";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import SignUpScreen from "./app/Screens/SignUpScreen";
import SubmitScreen from "./app/Screens/SubmitScreen";
import AccountScreen from "./app/Screens/AccountScreen";
import { AuthContextProvider } from "./app/auth/context";

export default function App() {
  return (
    <AuthContextProvider>
      <AccountScreen />
    </AuthContextProvider>
  );
}
