import React from "react";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import Text from "../components/Text";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function SignUpScreen() {
  const handleSubmit = async (info) => {
    console.log(info);
  };

  return (
    <Screen style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.icon} source={require("../assets/icon.png")} />
        <Text style={styles.text}>MJP Systems</Text>
      </View>
      <Form
        inititalValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
        <FormField
          autoCapitalize="words"
          autoCorrect={false}
          keyboardType="email-address"
          name="name"
          placeholder="Name"
          textContentType="name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Sign Up" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    position: "absolute",
    top: 70,
  },
  icon: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 25,
    paddingVertical: 20,
    fontWeight: "600",
  },
});

export default SignUpScreen;
