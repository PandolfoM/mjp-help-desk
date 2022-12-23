import React from "react";
import { View } from "react-native";
import colors from "../config/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function Icon({
  name,
  size = 40,
  backgroundColor = colors.black,
  iconColor = colors.white,
  style,
  sizeMultiplier = 0.5,
}) {
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}>
      <MaterialCommunityIcons
        name={name}
        color={iconColor}
        size={size * sizeMultiplier}
      />
    </View>
  );
}

export default Icon;
