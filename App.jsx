import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./src/provider/cartprovider";
import Toast from "react-native-toast-message";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavoritesProvider } from "./src/provider/favoritesprovider";
import { UserProvider } from "./src/provider/userprovider";
import { TableProvider } from "./src/provider/tableprovider";
import Login from "./src/screen/Login";
import Table from "./src/waiter/Table";
import Home from "./src/waiter/Home";
import Details from "./src/waiter/Details";
import TabBar from "./src/waiter/TabBar";
import DetailsFavorites from "./src/waiter/DetailsFavorites";
import OrderDetails from "./src/waiter/OrderDetails";
import Kitchen from "./src/cook/Kitchen";
import Profile from "./src/screen/Profile";
import Preparing from "./src/cook/Preparing";

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
                  <Stack.Screen name="Login" component={Login} />
                  <Stack.Screen name="Table" component={Table} />
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Details" component={Details} />
                  <Stack.Screen name="TabBar" component={TabBar} />
                  <Stack.Screen name="Profile" component={Profile} />
                  <Stack.Screen
                    name="DetailsFavorites"
                    component={DetailsFavorites}
                  />
                  <Stack.Screen name="OrderDetails" component={OrderDetails} />
                  <Stack.Screen name="Kitchen" component={Kitchen} />
                  <Stack.Screen name="Preparing" component={Preparing} />
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
