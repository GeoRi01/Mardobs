import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation, useRoute } from "@react-navigation/native";

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={styles.detailsContainer}>
          <View style={styles.orderRowView}>
            <Text style={styles.textBold}>ID: {order.order_id}</Text>
            <Text style={styles.text}>{order.order_date}</Text>
          </View>
          <Text style={styles.text}>{order.table_name}</Text>
          <View style={styles.sp}></View>
          <Text style={styles.textBold}>Items:</Text>
          {orderItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <Text style={styles.leftText}>{item.name}</Text>
              <View style={styles.rightContainer}>
                <Text style={styles.text}>{item.quantity}</Text>
                <Text style={styles.text}> x </Text>
                <Text style={styles.text}>{item.price}</Text>
                <Text style={styles.text}> = </Text>
                <Text style={styles.text}>
                  ₱{parseFloat(item.quantity * item.price).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ₱{order.total_amount}</Text>
          </View>
        </View>
      </ScrollView>
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
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: height * 0.01,
  },
  scrollViewFlex: {
    flexGrow: 1,
    marginHorizontal: width * 0.03,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: width * 0.025,
    borderRadius: 25,
    marginBottom: height * 0.025,
  },
  textBold: {
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
    marginBottom: height * 0.005,
  },
  text: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.primary,
    marginBottom: height * 0.005,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.005,
  },
  leftText: {
    flex: 1,
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  rightContainer: {
    flexDirection: "row",
  },
  totalContainer: {
    position: "absolute",
    bottom: height * 0.02,
    left: width * 0.03,
  },
  totalText: {
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  sp: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    height: 3,
    backgroundColor: colors.primary,
  },
});
