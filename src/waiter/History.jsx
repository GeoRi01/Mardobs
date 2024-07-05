import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const History = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order History</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name={"person-circle-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.emptyHistoryContainer}>
        <Image
          source={require("../assets/emptyh.png")}
          style={styles.emptyHistoryImage}
        />
        <Text style={styles.emptyHistoryText}>Your order history is empty</Text>
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  header: {
    flexDirection: "row",
    marginHorizontal: width * 0.03,
    marginTop: height * 0.005,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: width * 0.05,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  emptyHistoryContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyHistoryImage: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: "contain",
  },
  emptyHistoryText: {
    fontSize: width * 0.04,
    fontFamily: fonts.Medium,
    color: colors.white,
    marginTop: height * 0.02,
  },
});
