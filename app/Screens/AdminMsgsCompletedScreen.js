import dayjs from "dayjs";
import {
  arrayRemove,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { db } from "../../firebaseConfig";
import ActivityIndicator from "../components/ActivityIndicator";
import colors from "../config/colors";
import ItemSeparator from "../components/ItemSeparator";
import ListItem from "../components/ListItem";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { TouchableOpacity } from "react-native-gesture-handler";
import { MessageContext } from "../context/MessageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ListItemDeleteActions from "../components/ListItemDeleteActions";

function AdminMsgsCompletedScreen({ navigation }) {
  const { messages, setMessages } = useContext(MessageContext);
  const [completedMessages, setCompletedMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const messagesRef = collection(db, "userMessages");

  useEffect(() => {
    setCompletedMessages([]);
    messages.forEach((i) => {
      if (i.completed) {
        setCompletedMessages((current) => [...current, i]);
      }
    });
  }, [messages]);

  const refreshMessages = async () => {
    // Clear existing messages so it doesn't duplicate
    setMessages([]);

    // Loading states
    setLoading(true);
    setRefreshing(true);

    // get all messages
    const getMessages = await getDocs(messagesRef);

    const tempArr = [];
    getMessages.forEach((doc) => {
      // push messages into global state
      if (doc.data()) {
        tempArr.push(...doc.data().messages);

        tempArr.sort((x, y) => {
          return y.date - x.date;
        });

        setMessages(tempArr);
      }
    });
    // clear loading
    setLoading(false);
    setRefreshing(false);
  };

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
    <Screen disableScroll style={styles.container}>
      <ActivityIndicator visible={loading} />
      {completedMessages.length < 1 && (
        <View style={styles.noMessages}>
          <Text style={styles.text}>No Messages</Text>
          <TouchableOpacity onPress={refreshMessages}>
            <Text style={styles.refreshButton}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
      {completedMessages.length >= 1 && (
        <FlatList
          data={completedMessages}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          onRefresh={() => refreshMessages()}
          refreshing={refreshing}
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
              IconComponent={
                item.read === false && (
                  <MaterialCommunityIcons
                    name="circle"
                    size={10}
                    color={colors.danger}
                  />
                )
              }
            />
          )}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
  },
  noMessages: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  refreshButton: {
    color: colors.primary,
    paddingVertical: 10,
  },
  text: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default AdminMsgsCompletedScreen;
