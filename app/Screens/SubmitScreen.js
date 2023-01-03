import * as Yup from "yup";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
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
  company: Yup.string().label("Company"),
  message: Yup.string().required().min(1).label("Message"),
});

function SubmitScreen() {
  const tokens = [];
  const [loading, setLoading] = useState(false);
  const { currentUser, isAdmin } = useContext(AuthContext);
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

  const handleSubmit = (data, { resetForm }) => {
    if (isAdmin) {
      Alert.alert(
        "Continue?",
        "Are you sure you wish to submit a message to your team?",
        [
          {
            text: "No",
            onPress: () => {
              return;
            },
          },
          {
            text: "Yes",
            onPress: async () => {
              setLoading(true);
              await sendEmail(data);
              sendPushNotification({
                title: "New Message",
                body: data.name + " has sent you a message",
                company: data.company ? data.company : "",
                token: tokens,
              });
              setLoading(false);
              resetForm();
            },
          },
        ]
      );
    } else {
      sendEmail(data);
      sendPushNotification({
        title: "New Message",
        body: data.name + " has sent you a message",
        company: data.company ? data.company : "",
        token: tokens,
      });
    }
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
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
                company: "",
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
              <FormField name="company" placeholder="Company" />
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
