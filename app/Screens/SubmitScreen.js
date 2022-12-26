import * as Yup from "yup";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

import { AuthContext } from "../auth/context";
import ActivityIndicator from "../components/ActivityIndicator";
import { db } from "../../firebaseConfig";
import useNotifications from "../auth/useNotifications";
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
      } catch (err) {
        setErr(err);
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
      <Screen style={styles.container}>
        {currentUser && (
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
