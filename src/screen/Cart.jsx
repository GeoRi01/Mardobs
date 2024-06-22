import {
  View,
  Text,
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React from "react";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useCart } from "../provider/cartprovider";

const { width, height } = Dimensions.get("window");

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, getTotalPrice } = useCart();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity>
          <Octicons name={"person"} size={width * 0.07} color={colors.orange} />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewFlex}
      >
        <View style={styles.scrollViewInnerView}>
          {cart.map((item) => (
            <View key={item.id} style={styles.itemContainer}>
              <View style={styles.itemContainerColor}>
                <View style={styles.cartItemRow}>
                  <Image source={item.image} style={styles.cartItemImage} />
                  <View style={styles.cartItemInfo}>
                    <View>
                      <Text style={styles.cartItemTitle}>{item.name}</Text>
                      <Text style={styles.cartItemSubtitle}>
                        {item.category}
                      </Text>
                      <View style={styles.cartItemSingleQuantityContainer}>
                        <Text style={styles.cartPriceText}>
                          ₱<Text style={styles.cartPrice}>{item.price}</Text>
                        </Text>
                        <TouchableOpacity
                          style={styles.cartItemIcon}
                          onPress={() => decreaseQuantity(item.id)}
                        >
                          <AntDesign
                            name="minus"
                            color={colors.white}
                            size={25}
                          />
                        </TouchableOpacity>
                        <View style={styles.cartItemQuantityContainer}>
                          <Text style={styles.cartItemQuantityText}>
                            {item.quantity}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.cartItemIcon}
                          onPress={() => increaseQuantity(item.id)}
                        >
                          <Ionicons name="add" color={colors.white} size={25} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={styles.priceFooter}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Total</Text>
          <Text style={styles.priceText}>
            ₱<Text style={styles.price}>{getTotalPrice().toFixed(2)}</Text>
          </Text>
        </View>
        <TouchableOpacity style={styles.payButton}>
          <Text style={styles.buttonText}>Pay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Cart;

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
    fontSize: width * 0.045,
    fontFamily: fonts.SemiBold,
    color: colors.white,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  scrollViewInnerView: {
    justifyContent: "space-between",
  },
  itemContainer: {
    padding: 20,
  },
  itemContainerColor: {
    backgroundColor: colors.white,
    flex: 1,
    gap: 12,
    padding: 12,
    borderRadius: 20,
  },
  cartItemRow: {
    flexDirection: "row",
    gap: 12,
    flex: 1,
  },
  cartItemImage: {
    height: 130,
    width: 130,
    borderRadius: 20,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: 4,
    justifyContent: "space-between",
  },
  cartItemTitle: {
    fontFamily: fonts.Medium,
    fontSize: 25,
    color: colors.primary,
  },
  cartItemSubtitle: {
    fontFamily: fonts.Regular,
    fontSize: 18,
    color: colors.dark1,
  },
  cartItemSingleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cartPriceText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.04,
    color: colors.orange,
  },
  cartPrice: {
    color: colors.primary,
  },
  cartItemIcon: {
    backgroundColor: colors.orange,
    padding: 7,
    borderRadius: 20,
  },
  cartItemQuantityContainer: {
    backgroundColor: colors.white,
    width: 100,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.orange,
    alignItems: "center",
    paddingVertical: 4,
  },
  cartItemQuantityText: {
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    color: colors.primary,
  },
  priceFooter: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: width * 0.05,
    padding: width * 0.05,
    marginBottom: height * 0.075,
  },
  priceContainer: {
    alignItems: "center",
    width: width * 0.18,
  },
  priceTitle: {
    fontFamily: fonts.Medium,
    fontSize: width * 0.03,
    color: colors.gray,
  },
  priceText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.04,
    color: colors.orange,
  },
  price: {
    color: colors.white,
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
