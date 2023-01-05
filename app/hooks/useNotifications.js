import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { useContext, useEffect, useState } from "react";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import uuid from "react-native-uuid";

import { db } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";

export default useNotifications = (notificationListener) => {
  const { currentUser } = useContext(AuthContext);
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    registerForNotifications();

    if (notificationListener)
      Notifications.addNotificationResponseReceivedListener(
        notificationListener
      );
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const q = query(collection(db, "users"), where("admin", "==", true));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setTokens((current) => [
            ...current,
            ...doc.data().notificationTokens,
          ]);
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
        notificationTokens: arrayUnion(token),
      });
    }
  };

  const sendEmail = async ({ email, company, message, name }) => {
    try {
      await addDoc(collection(db, "mail"), {
        to: "matt@pandolfo.com",
        message: {
          subject: company,
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
          company: company,
          message: message,
          date: Timestamp.now().seconds,
          read: false,
        }),
      });
    } catch (e) {
      console.log(e);
    }
  };

  const sendPushNotification = ({ title, body, company }) => {
    tokens.forEach((t) => {
      fetch("https://exp.host/--/api/v2/push/send", {
        body: JSON.stringify({
          to: t,
          title: title,
          subtitle: company,
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
