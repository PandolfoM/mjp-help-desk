import React from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { StyleSheet, Image, View } from "react-native";
import * as Yup from "yup";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { auth } from "../../firebaseConfig";
import colors from "../config/colors";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(8).label("Password"),
});

function SignUpScreen() {
  const handleSubmit = async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName: name,
        });
      } catch (e) {
        console.error(e);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
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
            autoCapitalize="words"
            autoCorrect={false}
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
      </View>
    </Screen>
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

export default SignUpScreen;
