import React from "react";
import { View, Text, StyleSheet } from "react-native";

function AppText({ children, style, ...props }) {
  return (
    <Text style={[styles.container, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AppText;
