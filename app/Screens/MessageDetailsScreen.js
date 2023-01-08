import dayjs from "dayjs";
import { composeAsync } from "expo-mail-composer";
import React, { useContext } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../auth/context";
import ItemSeparator from "../components/ItemSeparator";
import AppText from "../components/Text";
import colors from "../config/colors";
import defaultStyles from "../config/styles";

function MessageDetailsScreen({ route }) {
  const { isAdmin } = useContext(AuthContext);
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
          {isAdmin ? (
            <TouchableOpacity
              onPress={() => composeAsync({ recipients: message.email })}>
              <AppText
                style={[
                  defaultStyles.textInput,
                  styles.text,
                  { color: colors.secondary },
                ]}>
                {message.email}
              </AppText>
            </TouchableOpacity>
          ) : (
            <AppText style={[defaultStyles.textInput, styles.text]}>
              {message.email}
            </AppText>
          )}
        </View>

        <View style={styles.textContainer}>
          <AppText>Company:</AppText>
          <AppText style={[defaultStyles.textInput, styles.text]}>
            {message.company}
          </AppText>
        </View>

        <View style={styles.textContainer}>
          <AppText>Message:</AppText>
          <AppText
            style={[defaultStyles.textInput, styles.text, styles.message]}>
            {message.message}
          </AppText>
        </View>

        {message.completed && (
          <>
            <View style={styles.textContainer}>
              <AppText style={[styles.date, { color: colors.success }]}>
                Completed:{" "}
                {dayjs(new Date(message.completedDate * 1000)).format(
                  "MM/DD/YYYY,  h:mm:ss A"
                )}
              </AppText>
            </View>

            <View style={styles.textContainer}>
              <AppText>Note:</AppText>
              <AppText
                style={[defaultStyles.textInput, styles.text, styles.message]}>
                {message.note}
              </AppText>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
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
