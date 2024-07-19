import React, { useState, useContext } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CheckBox from "react-native-check-box";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import axios from "axios";
import { UserContext } from "../provider/userprovider";

const { width, height } = Dimensions.get("window");

const Preparing = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { order, onOrderUpdated } = route.params;
  const { user } = useContext(UserContext);
  const [checkedItems, setCheckedItems] = useState({});

  const handleGoBack = () => {
    navigation.goBack();
  };

  const orderItems = Array.isArray(order.orders_items)
    ? order.orders_items
    : JSON.parse(order.orders_items);

  const toggleCheckbox = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleServe = async () => {
    try {
      const response = await axios.post(
        "http://192.168.100.117/mardobs/order_update.php",
        {
          order_id: order.orders_id,
          status: "Served",
        }
      );

      if (response.data.success) {
        if (onOrderUpdated) {
          onOrderUpdated(); // Refresh orders in Kitchen
        }
        navigation.goBack();
      } else {
        console.error("Failed to update order status: ", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const allChecked =
    orderItems.length > 0 &&
    orderItems.every((_, index) => checkedItems[index]);

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
            <Text style={styles.textBold}>ID: {order.orders_code}</Text>
            <Text style={styles.text}>{order.orders_date}</Text>
          </View>
          <Text style={styles.text}>{order.orders_table}</Text>
          <View style={styles.sp}></View>
          <Text style={styles.textBold}>Items:</Text>
          {orderItems.map((item, index) => (
            <View key={index} style={styles.itemContainer}>
              <CheckBox
                style={styles.checkbox}
                onClick={() => toggleCheckbox(index)}
                isChecked={checkedItems[index] || false}
                leftText={`${item.item_name} (x${item.item_quantity})`}
                leftTextStyle={styles.leftText}
                disabled={
                  (user.account_type === "Chef" &&
                    item.item_category !== "Foods" &&
                    item.item_category !== "Snacks") ||
                  (user.account_type === "Bartender" &&
                    item.item_category !== "Drinks")
                }
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.serveButton, !allChecked && styles.disabledButton]}
          onPress={allChecked ? handleServe : null}
          disabled={!allChecked}
        >
          <Text style={styles.serveButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Preparing;

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
  checkbox: {
    flex: 1,
  },
  leftText: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  sp: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    height: 3,
    backgroundColor: colors.primary,
  },
  footer: {
    padding: width * 0.03,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  serveButton: {
    backgroundColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.3,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: colors.gray,
  },
  serveButtonText: {
    color: colors.white,
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
  },
});
