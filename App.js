import { StyleSheet } from "react-native";
import Screen from "./app/components/Screen";
import WelcomeScreen from "./app/Screens/WelcomeScreen";

export default function App() {
  return <WelcomeScreen />;
}

const styles = StyleSheet.create({
  text: {
    color: "gray",
  },
});
