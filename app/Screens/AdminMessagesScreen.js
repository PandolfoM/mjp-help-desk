import * as MailComposer from "expo-mail-composer";
import dayjs from "dayjs";
import {
  arrayRemove,
  collection,
  doc,
  FieldValue,
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
import ListItemReadActions from "../components/ListItemReadActions";
import ListItemDeleteActions from "../components/ListItemDeleteActions";

function AdminMessagesScreen({ navigation }) {
  const { messages, setMessages } = useContext(MessageContext);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const messagesRef = collection(db, "userMessages");

  const refreshMessages = async () => {
    setLoading(true);
    setRefreshing(true);
    const getMessages = await getDocs(messagesRef);
    getMessages.forEach((doc) => {
      if (doc.data) {
        setMessages(doc.data().messages);
      }
      setLoading(false);
      setRefreshing(false);
    });
  };

  const handleRead = async (message, email) => {
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

    // toggle between read and unread
    newArr[messageIndex] = {
      ...newArr[messageIndex],
      read: !newArr[messageIndex].read,
    };

    // set the messages state to the new array
    setMessages(newArr);

    // update firebase with the new array
    await setDoc(doc(db, "userMessages", userUid), {
      messages: newArr,
    });
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
      {!messages && !loading && (
        <View style={styles.noMessages}>
          <Text style={styles.text}>No Messages</Text>
          <TouchableOpacity onPress={refreshMessages}>
            <Text style={styles.refreshButton}>Refresh</Text>
          </TouchableOpacity>
        </View>
      )}
      {messages && !loading && (
        <FlatList
          data={messages.reverse()}
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
                <>
                  <ListItemDeleteActions
                    onPress={() => handleDelete(item.id, item.email, item)}
                  />
                  <ListItemReadActions
                    onPress={() => handleRead(item.id, item.email)}
                  />
                </>
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

export default AdminMessagesScreen;
