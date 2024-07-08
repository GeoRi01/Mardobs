import { Dimensions, StyleSheet, Text, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

const OrderDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order } = route.params;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const orderItems = Array.isArray(order.order_items)
    ? order.order_items
    : JSON.parse(order.order_items);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerText} onPress={handleGoBack}>
          <Ionicons
            name={"arrow-back-outline"}
            size={width * 0.07}
            color={colors.gray}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.headerText}>Order ID: {order.order_id}</Text>
      <Text style={styles.text}>Date: {order.order_date}</Text>
      <Text style={styles.text}>Table: {order.table_name}</Text>
      <Text style={styles.text}>Total: ₱{order.total_amount}</Text>
      <Text style={styles.text}>Items:</Text>
      {orderItems.map((item, index) => (
        <Text key={index} style={styles.itemText}>
          {item.name} - {item.quantity} - {item.price}
        </Text>
      ))}
    </View>
  );
};

export default OrderDetails;

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
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  text: {
    fontSize: width * 0.04,
    fontFamily: fonts.Regular,
    color: colors.white,
    marginBottom: 10,
  },
  itemText: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.white,
    marginBottom: 5,
  },
});
