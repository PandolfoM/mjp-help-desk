import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { doc, onSnapshot } from "firebase/firestore";
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

function MessagesCompletedScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
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
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].completed) {
        setIsCompleted(true);
      }
    }
  }, [messages]);

  return (
    <Screen style={styles.screen} disableScroll>
      <ActivityIndicator visible={loading} />
      {!isCompleted && (
        <View style={styles.noMessages}>
          <Text style={styles.text}>No Messages</Text>
        </View>
      )}
      {messages.length >= 1 && isCompleted && (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <>
              {item.completed === true && (
                <ListItem
                  title={item.company}
                  subtitle={dayjs(new Date(item.date * 1000)).format(
                    "MM/DD/YYYY, h:mm:ss A"
                  )}
                  clickable
                  onPress={() =>
                    navigation.navigate(routes.MESSAGE_DETAILS, item)
                  }
                />
              )}
            </>
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
