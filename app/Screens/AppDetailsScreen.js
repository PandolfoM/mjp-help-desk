import React from "react";
import { View, StyleSheet } from "react-native";
import AppText from "../components/Text";

function AppDetailsScreen(props) {
  return (
    <View style={styles.container}>
      <AppText>App Details</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppDetailsScreen;
