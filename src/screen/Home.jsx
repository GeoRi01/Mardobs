import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  Image,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";
import { categoryList } from "../utils/categoryList";
import { foodList } from "../utils/foodList";

const { width, height } = Dimensions.get("window");

/* Navigation */
const Home = ({ route }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  /* Value Receiver */
  const { table } = route.params;
  console.log(table);
  return (
    <View style={styles.container}>
      {/* Header */}
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
      {/* Search Box */}
      <View style={styles.searchBox}>
        <Ionicons name={"search"} size={width * 0.07} color={colors.orange} />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={colors.primary}
          style={styles.searchText}
        />
      </View>
      {/* Categories */}
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoryRow}>
            {categoryList.map((category, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.categoryCard,
                    {
                      backgroundColor:
                        index === 0 ? colors.orange : colors.white,
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryCardText,
                      { color: index === 0 ? colors.white : colors.black },
                    ]}
                  >
                    {category.category}
                  </Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      {/* Foods */}
      <View style={styles.foodContainer}>
        <Text style={styles.categoryText}>Food's</Text>
        <FlatList
          data={foodList}
          renderItem={({ item }) => (
            <Pressable
              style={styles.foodCard}
              onPress={() => navigation.navigate("Details", { item: item })}
            >
              <Image source={item.image} style={styles.foodImage} />
              <Text style={styles.foodText}>{item.name}</Text>
            </Pressable>
          )}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-evenly" }}
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
    marginHorizontal: width * 0.03,
    backgroundColor: "#fff",
    flexDirection: "row",
    paddingVertical: 16,
    borderRadius: 50,
    paddingHorizontal: 16,
    marginVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
  },
  searchText: {
    paddingLeft: 8,
    fontSize: 16,
    flex: 1,
  },
  categoryContainer: {
    marginTop: 22,
  },
  categoryText: {
    marginHorizontal: width * 0.03,
    fontSize: 25,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  categoryRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  categoryCard: {
    marginHorizontal: width * 0.03,
    marginRight: 36,
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    marginVertical: 16,
  },
  categoryCardText: {
    fontSize: 20,
    fontFamily: fonts.Medium,
  },
  foodContainer: {
    flex: 1,
    marginTop: 16,
  },
  flatListContent: {
    paddingBottom: height * 0.02,
  },
  foodCard: {
    backgroundColor: colors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 7,
    borderRadius: 15,
    marginVertical: height * 0.01,
    alignItems: "center",
    paddingHorizontal: width * 0.008,
    paddingVertical: height * 0.02,
  },
  foodImage: {
    width: width * 0.4,
    height: height * 0.25,
    resizeMode: "cover",
  },
  foodText: {
    marginTop: 10,
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
  },
});
