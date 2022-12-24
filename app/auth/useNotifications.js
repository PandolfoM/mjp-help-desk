import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default useNotifications = () => {
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

  return { sendEmail };
};
