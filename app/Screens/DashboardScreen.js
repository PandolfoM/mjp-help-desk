import React from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/Text";

function DashboardScreen(props) {
  return (
    <Screen style={styles.container}>
      <AppText>Dashboard</AppText>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DashboardScreen;
