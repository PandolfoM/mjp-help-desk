import { useContext, useEffect } from "react";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
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
    } catch (e) {
      console.log(e);
    }
  };

  const sendPushNotification = ({ token, title, body, subject }) => {
    return fetch("https://exp.host/--/api/v2/push/send", {
      body: JSON.stringify({
        to: token,
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
  };

  return { sendEmail, sendPushNotification };
};
