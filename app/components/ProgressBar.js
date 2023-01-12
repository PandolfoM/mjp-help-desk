import React from "react";
import { View, StyleSheet, Text } from "react-native";

import colors from "../config/colors";

function ProgressBar({ width = 15, height = 25, style }) {
  return (
    <View
      style={[styles.container, style, { height, borderRadius: height / 2 }]}>
      <View
        style={[
          styles.progress,
          {
            width: `${width}%`,
            borderRadius: height / 2,
            backgroundColor:
              width <= 15
                ? colors.danger
                : width <= 99
                ? colors.warning
                : colors.success,
          },
        ]}>
        <Text style={styles.text}>
          {width <= 15 ? "Sent" : width <= 99 ? "In Progress" : "Completed"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    overflow: "hidden",
    position: "relative",
    width: "100%",
  },
  progress: {
    backgroundColor: colors.warning,
    position: "absolute",
    height: "100%",
    justifyContent: "center",
  },
  text: {
    textAlign: "right",
    width: "100%",
    paddingRight: 10,
    fontWeight: "bold",
    color: colors.white,
  },
});

export default ProgressBar;
