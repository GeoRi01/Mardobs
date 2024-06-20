import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Details = ({ route }) => {
  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };
  const { item } = route.params;
  console.log(item);
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
          <Ionicons
            name={"heart-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bgContainer}>
        <View style={styles.bgImageContainer}>
          <Image source={item.image} style={styles.image} />
        </View>
        <Text style={styles.imageText}>{item.name}</Text>
        <Text style={styles.imageDescription}>{item.description}</Text>
      </View>
      <View style={styles.priceFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.priceText}>
            {" "}
            ₱<Text style={styles.price}>{item.price}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.buttonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Details;

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
  bgContainer: {
    backgroundColor: colors.white,
    flex: 1,
    marginTop: 240,
    borderTopLeftRadius: 56,
    borderTopRightRadius: 56,
    alignItems: "center",
    paddingHorizontal: 16,
  },
  bgImageContainer: {
    height: 300,
    width: 300,
    position: "absolute",
    top: -150,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  imageText: {
    marginTop: 160,
    fontSize: 28,
    fontFamily: fonts.SemiBold,
  },
  imageDescription: {
    fontSize: 20,
    fontFamily: fonts.Medium,
    marginVertical: 16,
    textAlign: "justify",
  },
  priceFooter: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    padding: 20,
  },
  priceContainer: {
    alignItems: "center",
    width: 100,
  },
  priceTitle: {
    fontFamily: fonts.Medium,
    fontSize: 16,
    color: colors.dark1,
  },
  priceText: {
    fontFamily: fonts.SemiBold,
    fontSize: 24,
    color: colors.orange,
  },
  price: {
    color: colors.primary,
  },
  payButton: {
    backgroundColor: colors.orange,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 80,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: fonts.SemiBold,
    fontSize: 18,
    color: colors.white,
  },
});
