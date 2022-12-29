import React from "react";
import { View, StyleSheet, Modal } from "react-native";
import AnimatedLottieView from "lottie-react-native";

function DoneScreen({ onDone, visible = false }) {
  return (
    <Modal visible={visible}>
      <View style={styles.container}>
        <AnimatedLottieView
          autoPlay
          loop={false}
          onAnimationFinish={onDone}
          source={require("../assets/animations/done.json")}
          style={styles.animation}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  animation: {
    width: 150,
  },
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
});

export default DoneScreen;
