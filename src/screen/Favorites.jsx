import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  Image,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../utils/font";
import { useFavorites } from "../provider/favoritesprovider";
import Toast from "react-native-toast-message";

const { width, height } = Dimensions.get("window");

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemoveFromFavorites = (item) => {
    removeFromFavorites(item);
    Toast.show({
      type: "error",
      text1: `${item.name} removed from favorites!`,
      position: "bottom",
      text1Style: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
        <TouchableOpacity>
          <Octicons name={"person"} size={width * 0.07} color={colors.orange} />
        </TouchableOpacity>
      </View>
      {favorites.length === 0 ? (
        <View style={styles.emptyFavoritesContainer}>
          <Image
            source={require("../assets/emptyf.png")}
            style={styles.emptyFavoritesImage}
          />
          <Text style={styles.emptyFavoritesText}>No favorites yet!</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}
        >
          <View style={[styles.scrollViewInnerView, { marginBottom: 80 }]}>
            {favorites.map((item) => (
              <View style={styles.itemContainer} key={item.id}>
                <View style={styles.listItemContainer}>
                  <View style={styles.cardContainer}>
                    <View>
                      <ImageBackground
                        source={item.image}
                        style={styles.itemBackgroundImage}
                      >
                        <View style={styles.imageHeaderBarContainer}>
                          <TouchableOpacity
                            onPress={() => handleRemoveFromFavorites(item)}
                          >
                            <Ionicons
                              name={"heart"}
                              size={width * 0.07}
                              color={colors.orange}
                              backgroundColor={colors.blackrgba}
                              style={styles.favoriteIcon}
                            />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.imageInfoOuterContainer}>
                          <View style={styles.imageInfoInnerContainer}>
                            <View style={styles.infoContainerRow}>
                              <View>
                                <Text style={styles.itemName}>{item.name}</Text>
                                <Text style={styles.itemCategory}>
                                  {item.category}
                                </Text>
                                <Text style={styles.priceText}>
                                  ₱
                                  <Text style={styles.price}>{item.price}</Text>
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      </ImageBackground>
                    </View>
                    <View style={styles.descriptionContainer}>
                      <Text style={styles.descriptionTitle}>Description:</Text>
                      <Text style={styles.descriptionText}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Favorites;

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
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    flex: 1,
    justifyContent: "space-between",
  },
  itemContainer: {
    flex: 1,
  },
  listItemContainer: {
    padding: 20,
    gap: 20,
  },
  cardContainer: {
    borderRadius: 25,
    overflow: "hidden",
  },
  itemBackgroundImage: {
    width: "100%",
    aspectRatio: 20 / 25,
    justifyContent: "space-between",
  },
  imageHeaderBarContainer: {
    padding: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  favoriteIcon: {
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  imageInfoOuterContainer: {
    paddingVertical: 24,
    paddingHorizontal: 30,
    backgroundColor: colors.blackrgba,
    borderTopLeftRadius: 20 * 2,
    borderTopRightRadius: 20 * 2,
  },
  imageInfoInnerContainer: {
    justifyContent: "space-between",
    gap: 15,
  },
  infoContainerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.045,
    color: colors.white,
  },
  itemCategory: {
    fontFamily: fonts.Medium,
    fontSize: width * 0.03,
    color: colors.white,
  },
  priceText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.035,
    color: colors.orange,
    marginTop: 15,
  },
  price: {
    color: colors.white,
  },
  descriptionContainer: {
    gap: 10,
    padding: 20,
    backgroundColor: colors.dark,
  },
  descriptionTitle: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.04,
    color: colors.white,
  },
  descriptionText: {
    fontFamily: fonts.Regular,
    fontSize: width * 0.03,
    color: colors.white,
    textAlign: "justify",
  },
  emptyFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyFavoritesImage: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: "cover",
  },
  emptyFavoritesText: {
    fontSize: width * 0.04,
    fontFamily: fonts.Medium,
    color: colors.white,
    marginTop: height * 0.02,
  },
});
