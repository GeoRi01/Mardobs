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
import { useCart } from "../provider/cartprovider";
import Toast from "react-native-toast-message";
import { useFavorites } from "../provider/favoritesprovider";

const { width, height } = Dimensions.get("window");

const Details = ({ route }) => {
  const navigation = useNavigation();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { item } = route.params;
  const [isFav, setIsFav] = React.useState(isFavorite(item));

  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleAddToCart = (item) => {
    addToCart(item);
    const toastConfig = {
      type: "success",
      text1: `${item.products_name} added to cart!`,
      position: "bottom",
      text1Style: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
      },
    };
    Toast.show(toastConfig);
  };
  const handleToggleFavorite = () => {
    if (isFav) {
      removeFromFavorites(item);
      const toastConfig = {
        type: "error",
        text1: `${item.products_name} removed to favorites!`,
        position: "bottom",
        text1Style: {
          fontSize: width * 0.025,
          fontFamily: fonts.SemiBold,
        },
      };
      Toast.show(toastConfig);
    } else {
      addToFavorites(item);
      const toastConfig = {
        type: "success",
        text1: `${item.products_name} added to favorites!`,
        position: "bottom",
        text1Style: {
          fontSize: width * 0.025,
          fontFamily: fonts.SemiBold,
        },
      };
      Toast.show(toastConfig);
    }
    setIsFav(!isFav);
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
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Ionicons
            name={isFav ? "heart" : "heart-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bgContainer}>
        <View style={styles.bgImageContainer}>
          <Image source={{ uri: item.products_image }} style={styles.image} />
        </View>
        <Text style={styles.imageText}>{item.products_name}</Text>
        <Text style={styles.imageDescription}>{item.products_description}</Text>
      </View>
      <View style={styles.priceFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.priceText}>
            ₱<Text style={styles.price}>{item.products_price}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.payButton}
          onPress={() => handleAddToCart(item)}
        >
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
    marginTop: height * 0.2,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    alignItems: "center",
    paddingHorizontal: width * 0.045,
  },
  bgImageContainer: {
    height: height * 0.3,
    width: width * 0.55,
    position: "absolute",
    top: height * -0.15,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 20,
  },
  imageText: {
    marginTop: height * 0.16,
    fontSize: width * 0.045,
    fontFamily: fonts.SemiBold,
  },
  imageDescription: {
    fontSize: width * 0.035,
    fontFamily: fonts.Medium,
    marginVertical: height * 0.016,
    textAlign: "justify",
  },
  priceFooter: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.05,
    padding: width * 0.05,
  },
  priceContainer: {
    alignItems: "center",
    width: width * 0.18,
  },
  priceTitle: {
    fontFamily: fonts.Medium,
    fontSize: width * 0.03,
    color: colors.dark1,
  },
  priceText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.04,
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
    height: height * 0.08,
    borderRadius: 20,
  },
  buttonText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.035,
    color: colors.white,
  },
});
