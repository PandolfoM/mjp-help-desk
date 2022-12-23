import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth/react-native";
import { useContext } from "react";
import { auth } from "../../firebaseConfig";
import { AuthContext } from "./context";

export default useAuth = () => {
  const { setCurrentUser } = useContext(AuthContext);

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
      } catch (e) {
        console.error(e);
      }
      setCurrentUser(res.user);
    } catch (e) {
      console.error(e);
    }
  };

  const logOut = () => {
    setCurrentUser(undefined);
    signOut(auth);
  };

  return { signIn, signUp, logOut };
};
