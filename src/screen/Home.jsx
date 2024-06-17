import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Home = ({ route }) => {
  const { item } = route.params;
  console.log(item);
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
