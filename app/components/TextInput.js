import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../config/colors";

import defaultStyles from "../config/styles";

function AppTextInput({ icon, ...otherProps }) {
  return (
    <View style={[styles.container]}>
      <TextInput
        placeholderTextColor={colors.medium}
        style={defaultStyles.textInput}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 50,
    flexDirection: "row",
    marginVertical: 10,
    overflow: "hidden",
  },
});

export default AppTextInput;
