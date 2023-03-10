import React from "react";
import {
  StyleSheet,
  Image,
  View,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import * as Yup from "yup";
import useAuth from "../auth/useAuth";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function LoginScreen() {
  const { signIn } = useAuth();

  const handleSubmit = async ({ email, password }) => {
    signIn({ email, password });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}>
      <Screen style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.icon} source={require("../assets/icon.png")} />
          <Text style={styles.text}>MJP Systems</Text>
        </View>
        <View style={styles.form}>
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
        </View>
      </Screen>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  form: {
    backgroundColor: colors.white,
    width: "100%",
  },
  icon: {
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

export default LoginScreen;
