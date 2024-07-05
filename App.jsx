/* eslint-disable no-unused-vars */
import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/provider/cartprovider";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "./src/provider/favoritesprovider";
import { UserProvider } from "./src/provider/userprovider";
import { TableProvider } from "./src/provider/tableprovider";
import Welcome from "./src/screen/Welcome";
import Login from "./src/screen/Login";
import Signup from "./src/screen/Signup";
import Forgot from "./src/screen/Forgot";
import Table from "./src/waiter/Table";
import Home from "./src/waiter/Home";
import Details from "./src/waiter/Details";
import TabBar from "./src/waiter/TabBar";
import Profile from "./src/waiter/Profile";
import DetailsFavorites from "./src/waiter/DetailsFavorites";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <GestureHandlerRootView>
      <CartProvider>
        <FavoritesProvider>
          <UserProvider>
            <TableProvider>
              <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <Stack.Screen name="Welcome" component={Welcome} />
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Signup" component={Signup} />
                  <Stack.Screen name="Forgot" component={Forgot} />
                  <Stack.Screen name="Table" component={Table} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Details" component={Details} />
                  <Stack.Screen name="TabBar" component={TabBar} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen
                    name="DetailsFavorites"
                    component={DetailsFavorites}
                  />
                </Stack.Navigator>
              </NavigationContainer>
              <Toast ref={(ref) => Toast.setRef(ref)} />
            </TableProvider>
          </UserProvider>
        </FavoritesProvider>
      </CartProvider>
    </GestureHandlerRootView>
  );
};

export default App;

const styles = StyleSheet.create({});
