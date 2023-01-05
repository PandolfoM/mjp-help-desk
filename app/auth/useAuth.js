import * as Notifications from "expo-notifications";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth/react-native";
import { useContext } from "react";
import { arrayRemove, doc, setDoc, updateDoc } from "firebase/firestore";

import { AuthContext } from "./context";
import { auth, db } from "../../firebaseConfig";

export default useAuth = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);

  const signIn = ({ email, password }) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
      })
      .catch((e) => {
        const errorCode = e.code;
        const errorMessage = e.message;
      });
  };

  const signUp = async ({ name, email, password }) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await updateProfile(res.user, {
          displayName: name,
        });

        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName: name,
          email,
          admin: false,
        });

        await setDoc(doc(db, "userMessages", res.user.uid), {
          messages: [],
        });
      } catch (e) {
        console.error(e);
      }
      setCurrentUser(res.user);
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = async () => {
    setCurrentUser(undefined);
    token = (await Notifications.getExpoPushTokenAsync()).data;
    await updateDoc(doc(db, "users", currentUser.uid), {
      notificationTokens: arrayRemove(token),
    });
    signOut(auth);
  };

  return { signIn, signUp, logOut };
};
