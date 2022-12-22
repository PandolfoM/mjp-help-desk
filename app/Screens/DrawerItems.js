import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../auth/context";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

function DrawerItems({ navigation }) {
  const { currentUser } = useContext(AuthContext);

  return (
    <Screen disableScroll style={styles.screen}>
      <View style={styles.container}>
        <ListItem
          title={currentUser.displayName}
          subtitle={currentUser.email}
          image={require("../assets/matt.png")}
        />
      </View>
      <View style={styles.bottom}>
        <ListItem
          title="Logout"
          clickable
          onPress={() => console.log("logged out")}
          IconComponent={
            <Icon name="logout" backgroundColor={colors.primary} />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  screen: {
    backgroundColor: colors.light,
    justifyContent: "space-between",
  },
});

export default DrawerItems;
