import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Feather from "react-native-vector-icons/Feather";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
import Home from "./Home";
import { colors } from "../utils/colors";
import Cart from "./Cart";
import Favorites from "./Favorites";
import History from "./History";

const { width, height } = Dimensions.get("window");
const Tab = createBottomTabNavigator();

const TabBar = ({ route }) => {
  const { table } = route.params;
  console.log(table);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.BlurViewStyles}
          ></BlurView>
        ),
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={"home"}
              size={width * 0.07}
              color={focused ? colors.orange : colors.gray}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name={"shopping-bag"}
              size={width * 0.07}
              color={focused ? colors.orange : colors.gray}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={"heart"}
              size={width * 0.07}
              color={focused ? colors.orange : colors.gray}
            />
          ),
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Octicons
              name={"bell"}
              size={width * 0.07}
              color={focused ? colors.orange : colors.gray}
            />
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: height * 0.07,
    position: "absolute",
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: "transparent",
  },
  BlurViewStyles: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
