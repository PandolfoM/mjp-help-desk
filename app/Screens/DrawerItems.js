import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { db } from "../../firebaseConfig";
import { AuthContext } from "../auth/context";
import useAuth from "../auth/useAuth";
import Icon from "../components/Icon";
import ListItem from "../components/ListItem";
import Screen from "../components/Screen";
import colors from "../config/colors";

function DrawerItems({ navigation }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { logOut } = useAuth();
  const photo = currentUser.photoURL;

  useEffect(() => {
    const getUser = async () => {
      const unsub = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        if (doc.data) {
          setIsAdmin(doc.data().admin);
        }
      });

      return () => unsub();
    };

    currentUser.uid && getUser();
  }, [currentUser.uid]);

  return (
    <Screen disableScroll style={styles.screen}>
      <View>
        <ListItem
          style={styles.profile}
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
        <ListItem
          title="Home"
          clickable
          onPress={() => navigation.navigate("Home")}
          IconComponent={<Icon name="home" backgroundColor={"dodgerblue"} />}
        />
      </View>
      <View style={styles.bottom}>
        {isAdmin && (
          <ListItem
            title="Dashboard"
            clickable
            onPress={() => navigation.navigate("Dashboard")}
            IconComponent={
              <Icon name="view-dashboard" backgroundColor={colors.secondary} />
            }
          />
        )}
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
  profile: {
    marginBottom: 5,
  },
  screen: {
    backgroundColor: colors.light,
    justifyContent: "space-between",
  },
});

export default DrawerItems;
