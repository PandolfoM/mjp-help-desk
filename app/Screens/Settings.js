import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/Text";

function SettingsScreen() {
  return (
    <Screen style={styles.container}>
      <AppText>Settings</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default SettingsScreen;
