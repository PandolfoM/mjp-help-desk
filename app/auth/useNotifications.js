import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useContext, useEffect } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import uuid from "react-native-uuid";

import { db } from "../../firebaseConfig";
import { AuthContext } from "./context";

export default useNotifications = (notificationListener) => {
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    registerForNotifications();

    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);

  const registerForNotifications = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      await updateDoc(doc(db, "users", currentUser.uid), {
        notificationToken: token,
      });
    }
  };

  const sendEmail = async ({ email, subject, message, name }) => {
    try {
      await addDoc(collection(db, "mail"), {
        to: "matt@pandolfo.com",
        message: {
          subject: subject,
          html: `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Message: ${message}</p>
          `,
        },
      });

      await updateDoc(doc(db, "userMessages", currentUser.uid), {
        messages: arrayUnion({
          id: uuid.v4(),
          name: name,
          email: email,
          subject: subject,
          message: message,
          date: Timestamp.now().seconds,
          read: false,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const sendPushNotification = ({ token, title, body, subject }) => {
    token.forEach((t) => {
      fetch("https://exp.host/--/api/v2/push/send", {
        body: JSON.stringify({
          to: t,
          title: title,
          subtitle: subject,
          body: body,
          sound: "default",
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
    });
  };

  return { sendEmail, sendPushNotification };
};
