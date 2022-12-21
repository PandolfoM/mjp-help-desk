import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        autoPlay
        loop
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
