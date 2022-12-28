import { FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Screen from "../components/Screen";
import Text from "../components/Text";
import TextInput from "../components/TextInput";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import ActivityIndicator from "../components/ActivityIndicator";
import ListItem from "../components/ListItem";
import ItemSeparator from "../components/ItemSeparator";
import Icon from "../components/Icon";
import colors from "../config/colors";
import ListItemDeleteActions from "../components/ListItemDeleteActions";

function DashboardScreen() {
  const [admins, setAdmins] = useState([]);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAdmins = async () => {
      const q = query(collection(db, "users"), where("admin", "==", true));

      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setAdmins((current) => [...current, doc.data()]);
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }

      return () => {
        unsub();
      };
    };

    getAdmins();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    const q = query(collection(db, "users"), where("email", "==", email));

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        console.log(doc.data().email);
        if (!doc.data()) {
          console.log("Not a valid email");
        }
        if (doc.data().admin === true) {
          setError(doc.data().displayName + " Is already an admin");
          return;
        }
        setUser(doc.data());
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  const updateUser = async (user) => {
    console.log(user);
    const userRef = doc(db, "users", user);

    await updateDoc(userRef, {
      admin: false,
    });

    setAdmins((current) => current.filter((admin) => admin.uid !== user));
  };

  return (
    <>
      <ActivityIndicator visible={loading} />
      <Screen disableScroll style={styles.container}>
        <Text>Add Admins</Text>
        <TextInput
          autoCapitalize={false}
          autoComplete={false}
          autoCorrect={false}
          autoFocus={false}
          placeholder="Enter Email"
          onChangeText={(email) => setEmail(email)}
          onEndEditing={handleSearch}
          value={email}></TextInput>
        <ActivityIndicator visible={loading} />
        {error && <Text>{error}</Text>}
        {user && <ListItem title={user.displayName} subtitle={user.email} />}
        {admins.length > 0 && (
          <>
            <Text>Current Admins:</Text>
            <FlatList
              data={admins}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={({ item }) => (
                <ListItem
                  title={item.displayName}
                  subtitle={item.email}
                  image={item.photoURL && item.photoURL}
                  o
                  renderRightActions={() => (
                    <ListItemDeleteActions
                      onPress={() => updateUser(item.uid)}
                    />
                  )}
                  IconComponent={
                    !item.photoURL && (
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
              )}
              keyExtractor={(item) => item.uid}
            />
          </>
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default DashboardScreen;
