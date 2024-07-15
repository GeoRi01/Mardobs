import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import axios from "axios";

const { width, height } = Dimensions.get("window");

const Kitchen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [actionMenuVisible, setActionMenuVisible] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setRefreshing(true);
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

  const handleDotsPress = (order) => {
    setActionMenuVisible((prev) => ({
      ...prev,
      [order.orders_id]: !prev[order.orders_id],
    }));
  };

  const handleOutsidePress = () => {
    setActionMenuVisible({});
  };

  const updateOrderStatus = async (order) => {
    try {
      const response = await axios.post(
        "http://192.168.100.117/mardobs/order_update.php",
        {
          order_id: order.orders_id,
          status: "Preparing",
        }
      );

      if (response.data.success) {
        fetchOrders();
        navigation.navigate("Preparing", {
          order,
          onOrderUpdated: fetchOrders, // Pass the fetch function
        });
      } else {
        console.error("Failed to update order status: ", response.data.message);
      }
    } catch (error) {
      console.error("Error updating order status: ", error);
    }
  };

  const handleAction = (action, order) => {
    // Close action menu first
    setActionMenuVisible((prev) => ({
      ...prev,
      [order.orders_id]: false,
    }));

    if (action === "viewOrder") {
      navigation.navigate("OrderDetails", { order });
    } else if (action === "preparing") {
      updateOrderStatus(order);
    }
  };

  const renderItem = ({ item }) => {
    const fullDate = item.orders_date;
    const shortTime = fullDate.split(" ")[1].slice(0, 5);

    return (
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.tableTime}>{shortTime}</Text>
          <Text style={styles.tableTitle}>{item.orders_table}</Text>
          <TouchableOpacity
            style={styles.headerText}
            onPress={() => handleDotsPress(item)}
          >
            <Entypo
              name={"dots-three-horizontal"}
              size={width * 0.055}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.itemsContainer}>
          {item.orders_items.slice(0, 3).map((dish, index) => (
            <Text key={index} style={styles.item}>
              {dish.item_name} x{dish.item_quantity}
            </Text>
          ))}
        </View>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{item.orders_status}</Text>
        </View>

        {actionMenuVisible[item.orders_id] && (
          <View style={styles.actionMenu}>
            <TouchableOpacity
              style={styles.actionItem}
              onPress={() => handleAction("viewOrder", item)}
            >
              <Text style={styles.actionText}>View Order</Text>
            </TouchableOpacity>
            {/* Check if order status is not 'Served' before showing Prepare option */}
            {item.orders_status !== "Served" && (
              <TouchableOpacity
                style={styles.actionItem}
                onPress={() => handleAction("preparing", item)}
              >
                <Text style={styles.actionText}>Prepare</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Kitchen</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons
              name={"person-circle-outline"}
              size={width * 0.07}
              color={colors.orange}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item) => item.orders_id.toString()}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={styles.columnWrapperStyle}
          numColumns={2}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchOrders} />
          }
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Kitchen;

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
    alignItems: "center",
  },
  headerText: {
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  content: {
    paddingBottom: height * 0.075,
    paddingHorizontal: width * 0.03,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  table: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 20,
    marginVertical: height * 0.01,
    paddingVertical: height * 0.02,
    width: (width - 0.09 * width) / 2,
    padding: 10,
    height: height * 0.23,
    justifyContent: "space-between",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tableTime: {
    fontSize: width * 0.025,
    fontFamily: fonts.Regular,
    marginBottom: height * 0.005,
  },
  tableTitle: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    marginBottom: height * 0.001,
  },
  item: {
    fontSize: width * 0.03,
    fontFamily: fonts.Medium,
    marginBottom: height * 0.005,
  },
  itemsContainer: {
    flex: 1,
    justifyContent: "flex-start",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: "auto",
  },
  status: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: height * 0.005,
    textAlign: "center",
    color: "white",
    marginTop: height * 0.005,
    fontSize: width * 0.03,
    fontFamily: fonts.Medium,
  },
  actionMenu: {
    position: "absolute",
    right: width * 0.01,
    top: height * 0.045,
    backgroundColor: colors.gray,
    borderRadius: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  actionItem: {
    padding: width * 0.01,
    borderBottomWidth: width * 0.001,
    borderBottomColor: colors.primary,
  },
  actionText: {
    fontSize: width * 0.03,
    fontFamily: fonts.Medium,
  },
});
