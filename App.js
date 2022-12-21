import { AuthContextProvider } from "./app/auth/context";
import LoginScreen from "./app/Screens/LoginScreen";
import WelcomeScreen from "./app/Screens/WelcomeScreen";
import SignUpScreen from "./app/Screens/SignUpScreen";
import SubmitScreen from "./app/Screens/SubmitScreen";
import AccountScreen from "./app/Screens/AccountScreen";
import MessagesScreen from "./app/Screens/MessagesScreen";

export default function App() {
  return (
    <AuthContextProvider>
      <SubmitScreen />
    </AuthContextProvider>
  );
}
