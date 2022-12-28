import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";

import { AuthContext } from "../auth/context";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";
import routes from "../navigation/routes";

function DrawerItems({ navigation }) {
  const { currentUser, isAdmin } = useContext(AuthContext);
  const { logOut } = useAuth();
  const photo = currentUser.photoURL;

  return (
    <Screen disableScroll style={styles.screen}>
      <View>
        <ListItem
          style={styles.profile}
          title={currentUser.displayName}
          subtitle={currentUser.email}
          image={photo && { uri: photo }}
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
        <ListItem
          title="Home"
          clickable
          onPress={() => navigation.navigate(routes.HOME)}
          IconComponent={<Icon name="home" backgroundColor={"dodgerblue"} />}
        />
      </View>
      <View style={styles.bottom}>
        {isAdmin && (
          <ListItem
            title="Dashboard"
            clickable
            onPress={() => navigation.navigate(routes.DASHBOARD)}
            IconComponent={
              <Icon name="view-dashboard" backgroundColor={colors.secondary} />
            }
          />
        )}
        <ListItem
          title="Settings"
          clickable
          onPress={() => navigation.navigate(routes.SETTINGS)}
          IconComponent={<Icon name="cog" backgroundColor={colors.dark} />}
        />
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
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
  },
  profile: {
    marginBottom: 5,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default DrawerItems;
