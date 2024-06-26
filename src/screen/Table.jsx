import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
} from "@react-native-firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Table = () => {
  const navigation = useNavigation();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTables = async () => {
      const db = getFirestore();
      const tableRef = collection(db, "tableList");

      try {
        const querySnapshot = await getDocs(tableRef);
        const tableData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTables(tableData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tables: ", error);
        setLoading(false);
      }
    };

    fetchTables();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.orange} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Hi, User#5473</Text>
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
              style={styles.tableCard}
              onPress={() => navigation.navigate("TabBar", { table: item })}
            >
              <Image source={{ uri: item.image }} style={styles.tableImage} />
              <Text style={styles.tableText}>{item.name}</Text>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
          showsVerticalScrollIndicator={false}
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
  },
  headerText: {
    flex: 1,
    fontSize: width * 0.045,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  subContainer: {
    marginTop: height * 0.01,
  },
  subText: {
    marginHorizontal: width * 0.03,
    fontSize: width * 0.045,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  tableContainer: {
    flex: 1,
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
  tableImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "center",
  },
  tableText: {
    marginTop: height * 0.01,
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
  },
});
