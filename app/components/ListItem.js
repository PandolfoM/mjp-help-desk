import React from "react";
import { View, StyleSheet, TouchableHighlight, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import Text from "./Text";
import { Swipeable } from "react-native-gesture-handler";

function ListItem({
  addAction,
  check,
  clickable,
  IconComponent,
  image,
  onPress,
  style,
  subtitle,
  title,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.dark} onPress={onPress}>
        <View style={[styles.container, style]}>
          {IconComponent}
          {image && <Image style={styles.image} source={image} />}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subtitle && (
              <Text
                style={styles.subtitle}
                numberOfLines={1}
                adjustsFontSizeToFit>
                {subtitle}
              </Text>
            )}
          </View>
          {clickable && (
            <MaterialCommunityIcons
              name="chevron-right"
              size={25}
              color={colors.dark}
            />
          )}
          {check && (
            <MaterialCommunityIcons
              onPress={addAction}
              name="plus"
              size={25}
              color={colors.dark}
            />
          )}
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 15,
  },
  detailsContainer: {
    marginLeft: 10,
    justifyContent: "center",
    flex: 1,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 35,
  },
  subtitle: {
    color: colors.medium,
  },
  title: {
    color: colors.dark,
    fontWeight: "500",
  },
});

export default ListItem;
