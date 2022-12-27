import React from "react";
import { View, StyleSheet, ImageBackground, Image } from "react-native";

import Button from "../components/Button";
import Text from "../components/Text";
import routes from "../navigation/routes";

function WelcomeScreen({ navigation }) {
  return (
    <ImageBackground
      blurRadius={10}
      style={styles.background}
      source={require("../assets/background.jpg")}>
      <View style={styles.logoContainer}>
        <Image style={styles.image} source={require("../assets/logo.png")} />
        <Text style={styles.text}>MJP Systems</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate(routes.LOGIN)}
        />
        <Button
          title="Sign Up"
          color="secondary"
          onPress={() => navigation.navigate(routes.SIGNUP)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    alignItems: "center",
    flex: 1,
    justifyContent: "flex-end",
  },
  buttonContainer: {
    width: "100%",
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  text: {
    fontSize: 25,
    paddingVertical: 20,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
