/* eslint-disable no-unused-vars */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./src/screen/Login";
import Signup from "./src/screen/Signup";
import Welcome from "./src/screen/Welcome";
import Table from "./src/screen/Table";
import Home from "./src/screen/Home";
import Details from "./src/screen/Details";

const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={"Welcome"} component={Welcome} />
        <Stack.Screen name={"Login"} component={Login} />
        <Stack.Screen name={"Signup"} component={Signup} />
        <Stack.Screen name={"Table"} component={Table} />
        <Stack.Screen name={"Home"} component={Home} />
        <Stack.Screen name={"Details"} component={Details} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
