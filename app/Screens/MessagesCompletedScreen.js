import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import dayjs from "dayjs";
import ItemSeparator from "../components/ItemSeparator";
import ListItem from "../components/ListItem";

import { db } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import ActivityIndicator from "../components/ActivityIndicator";
import routes from "../navigation/routes";
import ListItemDeleteActions from "../components/ListItemDeleteActions";

function MessagesCompletedScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [completedMessages, setCompletedMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(
        doc(db, "userMessages", currentUser.uid),
        (doc) => {
          if (doc.data()) {
            setMessages(doc.data().messages);
          }
          setLoading(false);
        }
      );

      return () => unsub();
    };

    currentUser.uid && getMessages();
  }, [currentUser.uid]);

  useEffect(() => {
    setCompletedMessages([]);
    messages.forEach((i) => {
      if (i.completed) {
        setCompletedMessages((current) => [...current, i]);
      }
    });
  }, [messages]);

  const handleDelete = async (message, email, item) => {
    // get the user who sent the message
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnap = await getDocs(q);
    let userUid = null;

    // set the user id
    querySnap.forEach((doc) => {
      userUid = doc.data().uid;
    });

    // add the messages state into a new array
    let newArr = [...messages];

    // find the edited message
    const messageIndex = messages.findIndex((item) => item.id === message);

    // set the messages state to the new array
    newArr.splice(messageIndex, 1);
    setMessages(newArr);

    // remove the object from the array
    await updateDoc(doc(db, "userMessages", userUid), {
      messages: arrayRemove(item),
    });
  };

  return (
    <Screen style={styles.screen} disableScroll>
      <ActivityIndicator visible={loading} />
      {completedMessages.length < 1 && (
        <View style={styles.noMessages}>
          <Text style={styles.text}>No Messages</Text>
        </View>
      )}
      {completedMessages.length >= 1 && (
        <FlatList
          data={completedMessages}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.company}
              subtitle={dayjs(new Date(item.date * 1000)).format(
                "MM/DD/YYYY, h:mm:ss A"
              )}
              clickable
              onPress={() => navigation.navigate(routes.MESSAGE_DETAILS, item)}
              renderRightActions={() => (
                <ListItemDeleteActions
                  onPress={() => handleDelete(item.id, item.email, item)}
                />
              )}
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  noMessages: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  screen: {
    backgroundColor: colors.light,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default MessagesCompletedScreen;
