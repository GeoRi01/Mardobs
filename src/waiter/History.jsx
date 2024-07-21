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
  StatusBar,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const History = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

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

  useFocusEffect(
    React.useCallback(() => {
      fetchOrders();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchOrders();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
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
            <View key={order.orders_code} style={styles.orderContainer}>
              <View style={styles.orderRowView}>
                <Text style={styles.orderId}>ID: #{order.orders_code}</Text>
                <Text style={styles.orderDate}>{order.orders_date}</Text>
              </View>
              <Text style={styles.orderTableName}>{order.orders_table}</Text>
              <Text style={styles.orderQuantity}>
                Items: ({order.item_quantity})
              </Text>
              <View style={styles.orderRowView}>
                <Text style={styles.orderTotalText}>
                  Total: <Text style={styles.orderTotal}>₱</Text>
                  <Text style={styles.orderTotalText}>
                    {parseFloat(order.orders_total).toFixed(2)}
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
    paddingBottom: height * 0.07,
  },
  orderContainer: {
    backgroundColor: colors.white,
    padding: width * 0.025,
    borderRadius: 25,
    marginBottom: height * 0.025,
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
    marginBottom: height * 0.01,
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
