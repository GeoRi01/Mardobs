import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const History = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        "http://192.168.100.117/mardobs/order_fetch.php"
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {orders.length === 0 ? (
          <View style={styles.emptyHistoryContainer}>
            <Image
              source={require("../assets/emptyh.png")}
              style={styles.emptyHistoryImage}
            />
            <Text style={styles.emptyHistoryText}>
              Your order history is empty
            </Text>
          </View>
        ) : (
          orders.map((order) => (
            <View key={order.order_id} style={styles.orderContainer}>
              <View style={styles.orderRowView}>
                <Text style={styles.orderId}>ID: #{order.order_id}</Text>
                <Text style={styles.orderDate}>{order.order_date}</Text>
              </View>
              <Text style={styles.orderTableName}>{order.table_name}</Text>
              <Text style={styles.orderQuantity}>
                Items: ({order.quantity})
              </Text>
              <View style={styles.orderRowView}>
                <Text style={styles.orderTotalText}>
                  Total: <Text style={styles.orderTotal}>₱</Text>
                  <Text style={styles.orderTotalText}>
                    {order.total_amount}
                  </Text>
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("OrderDetails", { order })}
                >
                  <Text style={styles.orderStatus}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>
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
  scrollView: {
    flexGrow: 1,
    marginHorizontal: width * 0.03,
  },
  orderContainer: {
    backgroundColor: colors.white,
    padding: width * 0.025,
    borderRadius: 25,
    marginBottom: 25,
  },
  orderRowView: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderId: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  orderDate: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.dark,
  },
  orderTableName: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.dark,
  },
  orderTotalText: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  orderTotal: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.orange,
  },
  orderQuantity: {
    fontSize: width * 0.035,
    fontFamily: fonts.Regular,
    color: colors.gray2,
    fontStyle: "italic",
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.orange,
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
