import React from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen() {
  const handleSubmit = async ({ email, password }) => {
    console.log(email, password);
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.icon} source={require("../assets/icon.png")} />
      <Form
        inititalValues={{ email: "", password: "" }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}>
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-end",
  },
  form: {
    // alignSelf: "center",
    // marginTop: 50,
    // marginBottom: 20,
    // width: "100%",
  },
  icon: {
    alignSelf: "center",
    position: "absolute",
    top: 70,
    width: 150,
    height: 150,
  },
});

export default LoginScreen;
