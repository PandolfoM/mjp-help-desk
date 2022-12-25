import dayjs from "dayjs";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppText from "../components/Text";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function MessageDetailsScreen({ route }) {
  const message = route.params;

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled">
        <View style={styles.textContainer}>
          <AppText style={styles.date}>
            Sent on:{" "}
            {dayjs(new Date(message.date * 1000)).format(
              "MM/DD/YYYY,  h:mm:ss A"
            )}
          </AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText>Name:</AppText>
          <AppText style={[defaultStyles.textInput, styles.text]}>
            {message.name}
          </AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText>Email:</AppText>
          <AppText style={[defaultStyles.textInput, styles.text]}>
            {message.email}
          </AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText>Subject:</AppText>
          <AppText style={[defaultStyles.textInput, styles.text]}>
            {message.subject}
          </AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText>Message:</AppText>
          <AppText
            style={[defaultStyles.textInput, styles.text, styles.message]}>
            {message.message}
          </AppText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  date: {
    color: colors.medium,
    textAlign: "center",
  },
  text: {
    backgroundColor: colors.light,
    flexDirection: "row",
    borderRadius: 30,
    marginVertical: 10,
    overflow: "hidden",
  },
  textContainer: {
    paddingVertical: 5,
  },
});

export default MessageDetailsScreen;
