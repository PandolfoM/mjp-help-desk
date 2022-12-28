import Constants from "expo-constants";
import React from "react";
import { View, StyleSheet, SafeAreaView, ScrollView } from "react-native";

function Screen({ children, style, disableScroll }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      {disableScroll ? (
        <View style={[styles.view, style]}>{children}</View>
      ) : (
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled">
          <View style={[styles.view, style]}>{children}</View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

export default Screen;
