import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import ItemSeparator from "../components/ItemSeparator";
import ListItem from "../components/ListItem";

import Screen from "../components/Screen";
import colors from "../config/colors";

const messages = [
  {
    id: 1,
    title: "Message 1",
    date: Date.now(),
  },
  {
    id: 2,
    title: "Message 2",
    date: Date.now(),
  },
  {
    id: 3,
    title: "Message 3",
    date: Date.now(),
  },
  {
    id: 4,
    title: "Message 4",
    date: Date.now(),
  },
];

function MessagesScreen() {
  return (
    <Screen style={styles.screen}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ListItem title={item.title} subtitle={item.date} />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
});

export default MessagesScreen;
