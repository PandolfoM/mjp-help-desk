import { onAuthStateChanged } from "firebase/auth/react-native";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { auth, db } from "../../firebaseConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const getAdmin = async () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.data) {
          setIsAdmin(doc.data().admin);
        }
      });

      return () => unsub();
    };

    currentUser?.uid && getAdmin();
  }, [currentUser?.uid]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isAdmin,
        setIsAdmin,
        isSignedUp,
        setIsSignedUp,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
