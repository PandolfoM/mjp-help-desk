import React from "react";
import { StyleSheet, Image, TouchableOpacity } from "react-native";

function Header({ onPress, image, IconComponent }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      {IconComponent}
      {image && <Image style={styles.image} source={{ uri: image }} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 35,
    height: 35,
    borderRadius: "50%",
    marginHorizontal: 10,
    flexDirection: "row",
    alignSelf: "center",
  },
});

export default Header;
