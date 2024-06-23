import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { fonts } from "../utils/font";

const { width, height } = Dimensions.get("window");

const Favorites = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Favorites</Text>
        <TouchableOpacity>
          <Octicons name={"person"} size={width * 0.07} color={colors.orange} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={[styles.scrollViewInnerView, { marginBottom: 80 }]}>
          <View style={styles.itemContainer}>
            <View style={styles.listItemContainer}>
              <View style={styles.cardContainer}>
                <View>
                  <ImageBackground
                    source={require("../assets/banofee.jpg")}
                    style={styles.itemBackgroundImage}
                  >
                    <View style={styles.imageHeaderBarContainer}>
                      <TouchableOpacity>
                        <Ionicons
                          name={"heart-outline"}
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
                            <Text style={styles.itemName}>Banoffee</Text>
                            <Text style={styles.itemCategory}>Snacks</Text>
                            <Text style={styles.priceText}>
                              ₱<Text style={styles.price}>50.00</Text>
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
                    A Banoffee pie is a British dessert pie made from bananas,
                    whipped cream, and a thick caramel sauce, combined either on
                    a buttery biscuit base or one made from crumbled biscuits
                    and butter.
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
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
    paddingHorizontal: 20,
    gap: 20,
  },
  cardContainer: {
    borderRadius: 25,
    overflow: "hidden",
    marginTop: 10,
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
});
