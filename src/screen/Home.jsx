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
  RefreshControl,
} from "react-native";
import {
  getFirestore,
  collection,
  getDocs,
} from "@react-native-firebase/firestore";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../provider/cartprovider";
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
  const [isRefreshing, setIsRefreshing] = useState(false);
  useEffect(() => {
    const fetchCategories = async () => {
      const db = getFirestore();
      const categoriesRef = collection(db, "categoryList");

      try {
        const querySnapshot = await getDocs(categoriesRef);
        const fetchedCategories = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoryList([{ category: "All" }, ...fetchedCategories]);
      } catch (error) {
        console.error("Error fetching categories: ", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFoodItems = async () => {
      const db = getFirestore();
      const foodItemsRef = collection(db, "foodList");

      try {
        const querySnapshot = await getDocs(foodItemsRef);
        const fetchedFoodItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAllFoodItems(fetchedFoodItems);
        setFilteredFoodList(fetchedFoodItems);
      } catch (error) {
        console.error("Error fetching food items: ", error);
      }
    };

    fetchFoodItems();
  }, []);

  useEffect(() => {
    filterFoodList();
  }, [searchQuery, selectedCategory]);

  const filterFoodList = () => {
    let filteredList = [...allFoodItems];

    if (searchQuery !== "") {
      filteredList = filteredList.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "All") {
      filteredList = filteredList.filter(
        (food) => food.category === selectedCategory
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
      text1: `${item.name} added to cart!`,
      position: "bottom",
      text1Style: {
        fontSize: width * 0.025,
        fontFamily: fonts.SemiBold,
      },
    });
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      const db = getFirestore();
      const foodItemsRef = collection(db, "foodList");
      const querySnapshot = await getDocs(foodItemsRef);
      const fetchedFoodItems = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAllFoodItems(fetchedFoodItems);
      setFilteredFoodList(fetchedFoodItems);
    } catch (error) {
      console.error("Error refreshing food items: ", error);
    } finally {
      setIsRefreshing(false);
    }
  };

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
        <TouchableOpacity>
          <Octicons name={"person"} size={width * 0.07} color={colors.orange} />
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
              const isSelected = selectedCategory === category.category;
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
                  onPress={() => handleCategoryPress(category.category)}
                >
                  <Text
                    style={[
                      styles.categoryCardText,
                      { color: isSelected ? colors.white : colors.black },
                    ]}
                  >
                    {category.category}
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
              <Image source={{ uri: item.image }} style={styles.foodImage} />
              <Text style={styles.foodText}>{item.name}</Text>
              <View style={styles.foodCardFooter}>
                <Text style={styles.foodCardFooterSign}>
                  ₱<Text style={styles.foodCardFooterText}>{item.price}</Text>
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
          columnWrapperStyle={{ justifyContent: "space-between" }}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={[colors.orange]}
              progressBackgroundColor={colors.white}
            />
          }
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
    marginHorizontal: width * 0.03,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: height * 0.016,
    borderRadius: 20,
    paddingHorizontal: width * 0.03,
    marginVertical: height * 0.016,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
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
  foodCard: {
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
  foodImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "cover",
    borderRadius: 20,
  },
  foodText: {
    marginTop: height * 0.01,
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
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    width: width * 0.4,
  },
});
