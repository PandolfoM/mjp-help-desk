import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button, View } from "react-native";

const Drawer = createDrawerNavigator();

function DrawerView({ navigation }) {
  return (
    <View>
      <Button title="Test Button" />
    </View>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="DrawerView" component={DrawerView} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
