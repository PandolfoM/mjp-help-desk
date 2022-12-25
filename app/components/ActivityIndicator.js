import React from "react";
import AnimatedLottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";
import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <AnimatedLottieView
        style={styles.animation}
        autoPlay
        loop
        source={require("../assets/animations/loading.json")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 200,
    height: 200,
  },
  overlay: {
    position: "absolute",
    height: "100%",
    width: "100%",
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    opacity: 0.8,
  },
});

export default ActivityIndicator;
