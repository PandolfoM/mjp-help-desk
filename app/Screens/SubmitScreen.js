import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { AuthContext } from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().label("Subject"),
  message: Yup.string().required().min(1).label("Message"),
});

function SubmitScreen() {
  const { currentUser, loading } = useContext(AuthContext);
  const handleSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen style={styles.container}>
        {!loading && (
          <Form
            inititalValues={{
              name: `${currentUser.displayName}`,
              email: `${currentUser.email}`,
              subject: "",
              message: "",
            }}
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
            <FormField name="subject" placeholder="Subject" />
            <FormField
              name="message"
              placeholder="Message"
              multiline
              numberOfLines={3}
              style={{ height: 200 }}
            />
            <SubmitButton title="Send" />
          </Form>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
  },
});

export default SubmitScreen;
