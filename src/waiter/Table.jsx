import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { UserContext } from "../provider/userprovider";
import { useTableContext } from "../provider/tableprovider";

const { width, height } = Dimensions.get("window");

const Table = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [tables, setTables] = useState([]);
  const [unavailableTables, setUnavailableTables] = useState([]);
  const { setSelectedTableData } = useTableContext();

  const fetchTablesAndOrders = async () => {
    try {
      const tableResponse = await axios.get(
        "http://192.168.100.117/mardobs/table_fetch.php"
      );
      setTables(tableResponse.data);

      const orderResponse = await axios.get(
        "http://192.168.100.117/mardobs/order_status_fetch.php"
      );
      const activeOrders = orderResponse.data.filter(
        (orders) => orders.orders_status !== "Completed"
      );
      const unavailableTables = activeOrders.map(
        (orders) => orders.orders_table
      );
      setUnavailableTables(unavailableTables);
    } catch (error) {
      console.error("Error fetching tables or orders:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTablesAndOrders();
    }, [])
  );

  const handleTablePress = (tableData) => {
    setSelectedTableData(tableData);
    navigation.navigate("TabBar");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, {user.account_name}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name={"person-circle-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.subText}>Tables</Text>
      </View>
      <View style={styles.tableContainer}>
        <FlatList
          data={tables}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.tableCard,
                unavailableTables.includes(item.tables_name) &&
                  styles.tableCardUnavailable,
              ]}
              onPress={() => handleTablePress(item)}
              disabled={unavailableTables.includes(item.tables_name)}
            >
              <Image
                source={{ uri: item.tables_image }}
                style={styles.tableImage}
              />
              <Text style={styles.tableText}>{item.tables_name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default Table;

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
  subContainer: {
    marginTop: height * 0.008,
  },
  subText: {
    marginHorizontal: width * 0.03,
    fontSize: width * 0.05,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  tableContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: height * 0.01,
    paddingHorizontal: width * 0.03,
  },
  tableCard: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 20,
    marginVertical: height * 0.01,
    alignItems: "center",
    paddingHorizontal: width * 0.008,
    paddingVertical: height * 0.02,
    width: width * 0.45,
  },
  tableCardUnavailable: {
    backgroundColor: colors.gray,
    opacity: 0.5,
  },
  tableImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "center",
    borderRadius: 20,
  },
  tableText: {
    marginTop: height * 0.01,
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
});
