import React, { useEffect } from "react";
import { Keyboard, ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import { auth } from "../../firebaseConfig";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  message: Yup.string().required().min(10).label("Message"),
});

function SubmitScreen(props) {
  const handleSubmit = ({ name, email, message }) => {
    console.log(name, email, message);
  };

  return (
    <Screen style={styles.container}>
      <Form
        inititalValues={{ name: "", email: "", message: "" }}
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
          name="message"
          placeholder="Message"
          multiline
          numberOfLines={3}
          style={{ maxHeight: 200 }}
        />
        <SubmitButton title="Send" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
  },
});

export default SubmitScreen;
