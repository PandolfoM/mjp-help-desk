import dayjs from "dayjs";
import { collection, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { db } from "../../firebaseConfig";
import ActivityIndicator from "../components/ActivityIndicator";
import ItemSeparator from "../components/ItemSeparator";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import Text from "../components/Text";
import colors from "../config/colors";
import routes from "../navigation/routes";

function AdminMessagesScreen({ navigation }) {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const messagesRef = collection(db, "userMessages");
    const getMessages = async () => {
      const unsub = await getDocs(messagesRef);
      unsub.forEach((doc) => {
        if (doc.data) {
          setMessages(doc.data().messages);
        }
        setLoading(false);
      });
    };

    getMessages();
  }, []);

  return (
    <Screen disableScroll style={styles.container}>
      <ActivityIndicator visible={loading} />
      {!messages && !loading && (
        <View style={styles.noMessages}>
          <Text style={styles.text}>No Messages</Text>
        </View>
      )}
      {messages && !loading && (
        <FlatList
          data={messages.reverse()}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.subject}
              subtitle={dayjs(new Date(item.date * 1000)).format(
                "MM/DD/YYYY, h:mm:ss A"
              )}
              clickable
              onPress={() => navigation.navigate(routes.MESSAGE_DETAILS, item)}
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
  text: {
    fontSize: 30,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default AdminMessagesScreen;
