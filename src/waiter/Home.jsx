import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Image,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../provider/cartprovider";
import axios from "axios";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredFoodList, setFilteredFoodList] = useState([]);
  const [allFoodItems, setAllFoodItems] = useState([]);
  const { addToCart } = useCart();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.117/mardobs/category_fetch.php"
        );
        setCategoryList([{ category_name: "All" }, ...response.data]);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoodList = async () => {
      try {
        const response = await axios.get(
          "http://192.168.100.117/mardobs/food_fetch.php"
        );
        setAllFoodItems(response.data);
        setFilteredFoodList(response.data);
      } catch (error) {
        console.error("Error fetching food list:", error);
      }
    };
    fetchFoodList();
  }, []);

  useEffect(() => {
    filterFoodList();
  }, [searchQuery, selectedCategory]);

  const filterFoodList = () => {
    let filteredList = [...allFoodItems];

    if (searchQuery !== "") {
      filteredList = filteredList.filter((food) =>
        food.prod_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filteredList = filteredList.filter(
        (food) => food.prod_category === selectedCategory
      );
    }

    setFilteredFoodList(filteredList);
  };

  const handleCategoryPress = (category) => {
    setSelectedCategory(category === selectedCategory ? "All" : category);
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    Toast.show({
      type: "success",
      text1: `${item.prod_name} added to cart!`,
      position: "bottom",
      text1Style: {
        fontSize: width * 0.025,
        fontFamily: fonts.SemiBold,
      },
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerText} onPress={handleGoBack}>
          <Ionicons
            name={"arrow-back-outline"}
            size={width * 0.07}
            color={colors.gray}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name={"person-circle-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.searchBox}>
        <Ionicons name={"search"} size={width * 0.07} color={colors.orange} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={colors.primary}
          style={styles.searchText}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {categoryList.map((category, index) => {
              const isSelected = selectedCategory === category.category_name;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryCard,
                    {
                      backgroundColor: isSelected
                        ? colors.orange
                        : colors.white,
                    },
                  ]}
                  onPress={() => handleCategoryPress(category.category_name)}
                >
                  <Text
                    style={[
                      styles.categoryCardText,
                      { color: isSelected ? colors.white : colors.black },
                    ]}
                  >
                    {category.category_name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <View style={styles.foodContainer}>
        <Text style={styles.categoryText}>Food's</Text>
        <FlatList
          data={filteredFoodList}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.foodCard}
              onPress={() => navigation.navigate("Details", { item: item })}
            >
              <Image
                source={{ uri: item.prod_image }}
                style={styles.foodImage}
              />
              <Text style={styles.foodText}>{item.prod_name}</Text>
              <View style={styles.foodCardFooter}>
                <Text style={styles.foodCardFooterSign}>
                  ₱
                  <Text style={styles.foodCardFooterText}>
                    {parseFloat(item.prod_price).toFixed(2)}
                  </Text>
                </Text>
                <TouchableOpacity onPress={() => handleAddToCart(item)}>
                  <Ionicons
                    name={"add"}
                    size={width * 0.06}
                    color={colors.white}
                    backgroundColor={colors.orange}
                    style={styles.foodCardFooterIcon}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapperStyle}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      </View>
    </View>
  );
};

export default Home;

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
  searchBox: {
    height: height * 0.07,
    marginHorizontal: width * 0.03,
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.016,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    alignItems: "center",
  },
  searchText: {
    paddingLeft: width * 0.008,
    fontSize: width * 0.026,
    fontFamily: fonts.Regular,
    flex: 1,
  },
  categoryContainer: {
    marginTop: height * 0.008,
  },
  categoryText: {
    marginHorizontal: width * 0.03,
    fontSize: width * 0.05,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    marginHorizontal: width * 0.025,
    marginRight: width * 0.08,
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    paddingVertical: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: height * 0.016,
  },
  categoryCardText: {
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
  },
  foodContainer: {
    flex: 1,
  },
  flatListContent: {
    paddingBottom: height * 0.075,
    paddingHorizontal: width * 0.03,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
  foodCard: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 20,
    marginVertical: height * 0.01,
    alignItems: "center",
    paddingVertical: height * 0.02,
    width: (width - 0.09 * width) / 2,
  },
  foodImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "cover",
    borderRadius: 20,
  },
  foodText: {
    marginTop: height * 0.01,
    marginBottom: height * 0.01,
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
    color: colors.primary,
  },
  foodCardFooterIcon: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  foodCardFooterText: {
    fontSize: width * 0.035,
    fontFamily: fonts.SemiBold,
    color: colors.primary,
  },
  foodCardFooterSign: {
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
    color: colors.orange,
  },
  foodCardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.4,
    height: height * 0.035,
  },
});
