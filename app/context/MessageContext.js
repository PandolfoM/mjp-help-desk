import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";

export const MessageContext = createContext();

export const MessageContextProvider = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesRef = collection(db, "userMessages");

  const tempArr = [];

  useEffect(() => {
    const getMessages = async () => {
      const unsub = await getDocs(messagesRef);
      unsub.forEach((doc) => {
        if (doc.data()) {
          tempArr.push(...doc.data().messages);

          tempArr.sort((x, y) => {
            return x.date - y.date;
          });

          setMessages(tempArr);
        }
      });
    };

    isAdmin && getMessages();
  }, [isAdmin]);

  useEffect(() => {
    let count = 0;
    messages?.forEach((msg) => {
      if (msg.read === false) {
        count++;
      }
    });
    setUnreadCount(count);
  }, [messages]);

  return (
    <MessageContext.Provider
      value={{ messages, setMessages, unreadCount, setUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};
