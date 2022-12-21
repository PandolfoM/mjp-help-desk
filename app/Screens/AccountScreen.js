import React, { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { auth } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

const items = [
  {
    title: "Messages",
    icon: {
      name: "message",
      backgroundColor: "limegreen",
    },
  },
];

function AccountScreen() {
  const { currentUser } = useContext(AuthContext);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={currentUser.displayName}
          subtitle={currentUser.email}
          image={require("../assets/matt.png")}
        />
      </View>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item) => item.title}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
            />
          )}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default AccountScreen;
