import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
import dayjs from "dayjs";
import ItemSeparator from "../components/ItemSeparator";
import ListItem from "../components/ListItem";

import { db } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";
import Screen from "../components/Screen";
import AppText from "../components/Text";
import colors from "../config/colors";

function MessagesScreen() {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getMessages = () => {
      const unsub = onSnapshot(
        doc(db, "userMessages", currentUser.uid),
        (doc) => {
          doc.data() ? setMessages(doc.data().messages) : setMessages([]);
        }
      );

      return () => unsub();
    };

    currentUser.uid && getMessages();
  }, [currentUser.uid]);

  return (
    <Screen style={styles.screen} disableScroll>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.subject}
              subtitle={dayjs(new Date(item.date * 1000)).format(
                "MM/DD/YYYY, h:mm:ss A"
              )}
              clickable
              onPress={() => console.log(item)}
            />
          )}
        />
      ) : (
        <View style={styles.noMessages}>
          <AppText style={styles.text}>No Messages</AppText>
        </View>
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

export default MessagesScreen;
