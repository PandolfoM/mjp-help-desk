import * as Yup from "yup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import React, { useContext, useEffect, useState } from "react";

import { AppForm as Form, AppFormField as FormField } from "../components/form";
import { AuthContext } from "../auth/context";
import { db } from "../../firebaseConfig";
import ActivityIndicator from "../components/ActivityIndicator";
import useNotifications from "../auth/useNotifications";
import SubmitButton from "../components/form/SubmitButton";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().min(1).label("Name"),
  email: Yup.string().required().email().label("Email"),
  subject: Yup.string().label("Subject"),
  message: Yup.string().required().min(1).label("Message"),
});

function SubmitScreen() {
  const tokens = [];
  const { currentUser } = useContext(AuthContext);
  const { sendEmail, sendPushNotification } = useNotifications();

  useEffect(() => {
    const getToken = async () => {
      const q = query(collection(db, "users"), where("admin", "==", true));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          tokens.push(doc.data().notificationToken);
        });
      } catch (e) {
        console.log(e);
      }

      return () => {
        unsub();
      };
    };

    getToken();
  }, []);

  const handleSubmit = (data) => {
    sendEmail(data);
    sendPushNotification({
      title: "New Message",
      body: data.name + " has sent you a message",
      subject: data.subject ? data.subject : "",
      token: tokens,
    });
  };

  return (
    <>
      <ActivityIndicator visible={!currentUser} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
        style={{ flex: 1 }}>
        <Screen style={styles.container}>
          {currentUser && (
            <Form
              inititalValues={{
                name: `${currentUser.displayName || ""}`,
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
      </KeyboardAvoidingView>
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
