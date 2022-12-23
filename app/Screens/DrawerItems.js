import React, { useContext } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { AuthContext } from "../auth/context";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

function DrawerItems() {
  const { currentUser } = useContext(AuthContext);
  const { logOut } = useAuth();
  const photo = currentUser.photoURL;

  return (
    <Screen disableScroll style={styles.screen}>
      <View>
        <ListItem
          title={currentUser.displayName}
          subtitle={currentUser.email}
          image={photo && photo}
          IconComponent={
            !photo && (
              <Icon
                sizeMultiplier={1}
                iconColor={colors.dark}
                backgroundColor="transparent"
                name="account-circle"
                size={60}
              />
            )
          }
        />
      </View>
      <View style={styles.bottom}>
        <ListItem
          title="Logout"
          clickable
          onPress={() => logOut()}
          IconComponent={
            <Icon name="logout" backgroundColor={colors.primary} />
          }
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    justifyContent: "space-between",
  },
});

export default DrawerItems;
