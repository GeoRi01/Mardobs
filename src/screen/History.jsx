import { StyleSheet, Text, View, Dimensions } from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import { colors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../utils/font";

const { width, height } = Dimensions.get("window");

const History = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Order History</Text>
        <TouchableOpacity>
          <Octicons name={"person"} size={width * 0.07} color={colors.orange} />
        </TouchableOpacity>
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
});
