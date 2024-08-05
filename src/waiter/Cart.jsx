import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Modal,
  StatusBar,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import Octicons from "react-native-vector-icons/Octicons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useCart } from "../provider/cartprovider";
import { useNavigation } from "@react-navigation/native";
import { useTableContext } from "../provider/tableprovider";

const { width, height } = Dimensions.get("window");

const Cart = () => {
  const navigation = useNavigation();
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    getTotalPrice,
    removeItem,
    clearCart,
  } = useCart();
  const { selectedTable } = useTableContext();
  const [showModal, setShowModal] = useState(false);

  const renderRightActions = (itemId) => (
    <TouchableOpacity
      style={styles.deleteButton}
      onPress={() => removeItem(itemId)}
    >
      <Octicons name="trash" size={width * 0.05} color={colors.white} />
    </TouchableOpacity>
  );

  const handleOrder = () => {
    setShowModal(true);
  };

  const generateUniqueId = (length = 16) => {
    return Array.from({ length }, () =>
      Math.floor(Math.random() * 16).toString(16)
    ).join("");
  };

  const confirmOrder = async () => {
    const orderData = {
      tables_name: selectedTable.tables_name,
      items: cart.map((item) => ({
        item_id: generateUniqueId(),
        item_name: item.prod_name,
        item_category: item.prod_category,
        item_code: item.prod_code,
        item_price: item.prod_price,
        item_quantity: item.quantity,
        item_status: "Pending",
      })),
      items_total: getTotalPrice(),
    };

    try {
      const orderResponse = await fetch(
        "http://10.0.2.2/mardobs/order_check.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        }
      );

      const orderResult = await orderResponse.json();

      if (orderResult.status === "success") {
        const stockUpdateData = cart.map((item) => ({
          prod_id: item.prod_id,
          quantity: item.quantity,
        }));

        const stockResponse = await fetch(
          "http://10.0.2.2/mardobs/stock_update.php",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(stockUpdateData),
          }
        );

        const stockResult = await stockResponse.json();

        if (stockResult.status === "success") {
          Alert.alert("Success", "Order placed and stock updated!");
          setShowModal(false);
          clearCart();
        } else {
          Alert.alert("Stock Update Failed", stockResult.message);
        }
      } else {
        Alert.alert("Order Failed", orderResult.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while placing the order");
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.header}>
        <Text style={styles.headerText}>Cart</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Ionicons
            name={"person-circle-outline"}
            size={width * 0.07}
            color={colors.orange}
          />
        </TouchableOpacity>
      </View>
      {cart.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Image
            source={require("../assets/empty.png")}
            style={styles.emptyCartImage}
          />
          <Text style={styles.emptyCartText}>Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewFlex}
        >
          <View style={styles.scrollViewInnerView}>
            {cart.map((item) => (
              <Swipeable
                key={item.prod_id}
                renderRightActions={() => renderRightActions(item.prod_id)}
              >
                <View key={item.prod_id} style={styles.itemContainer}>
                  <View style={styles.itemContainerColor}>
                    <View style={styles.cartItemRow}>
                      <Image
                        source={{ uri: item.prod_image }}
                        style={styles.cartItemImage}
                      />
                      <View style={styles.cartItemInfo}>
                        <View>
                          <Text style={styles.cartItemTitle}>
                            {item.prod_name}
                          </Text>
                          <Text style={styles.cartItemSubtitle}>
                            {item.prod_category}
                          </Text>
                          <View style={styles.cartItemSingleQuantityContainer}>
                            <Text style={styles.cartPriceText}>
                              ₱
                              <Text style={styles.cartPrice}>
                                {parseFloat(item.prod_price).toFixed(2)}
                              </Text>
                            </Text>
                            <TouchableOpacity
                              style={styles.cartItemIcon}
                              onPress={() => decreaseQuantity(item.prod_id)}
                            >
                              <AntDesign
                                name="minus"
                                color={colors.white}
                                size={width * 0.04}
                              />
                            </TouchableOpacity>
                            <View style={styles.cartItemQuantityContainer}>
                              <Text style={styles.cartItemQuantityText}>
                                {item.quantity}
                              </Text>
                            </View>
                            <TouchableOpacity
                              style={styles.cartItemIcon}
                              onPress={() => increaseQuantity(item.prod_id)}
                            >
                              <Ionicons
                                name="add"
                                color={colors.white}
                                size={width * 0.04}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </Swipeable>
            ))}
          </View>
        </ScrollView>
      )}
      {cart.length > 0 && (
        <View style={styles.priceFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceTitle}>Total</Text>
            <Text style={styles.priceText}>
              ₱<Text style={styles.price}>{getTotalPrice().toFixed(2)}</Text>
            </Text>
          </View>
          <TouchableOpacity style={styles.orderButton} onPress={handleOrder}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirm Order</Text>
            <Text style={styles.modalText}>
              Are you sure you want to place this order?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[
                  styles.modalButton,
                  { backgroundColor: colors.primary },
                ]}
                onPress={confirmOrder}
              >
                <Text style={styles.modalButtonText}>Confirm</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: colors.red }]}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: width * 0.05,
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
    padding: width * 0.03,
  },
  itemContainerColor: {
    backgroundColor: colors.white,
    flex: 1,
    padding: width * 0.025,
    borderRadius: 25,
  },
  cartItemRow: {
    flexDirection: "row",
    gap: width * 0.02,
    flex: 1,
  },
  cartItemImage: {
    height: height * 0.13,
    width: width * 0.23,
    borderRadius: 25,
  },
  cartItemInfo: {
    flex: 1,
    paddingVertical: height * 0.005,
    justifyContent: "space-between",
  },
  cartItemTitle: {
    fontFamily: fonts.Medium,
    fontSize: width * 0.043,
    color: colors.primary,
  },
  cartItemSubtitle: {
    fontFamily: fonts.Regular,
    fontSize: width * 0.03,
    color: colors.dark1,
  },
  cartItemSingleQuantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: height * 0.01,
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
    padding: width * 0.015,
    borderRadius: 100,
  },
  cartItemQuantityContainer: {
    backgroundColor: colors.white,
    width: width * 0.2,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.orange,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: height * 0.004,
  },
  cartItemQuantityText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.025,
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
  orderButton: {
    backgroundColor: colors.orange,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: height * 0.08,
    borderRadius: 25,
  },
  buttonText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.035,
    color: colors.white,
  },
  deleteButton: {
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.12,
    height: height * 0.15,
    borderRadius: 25,
    marginRight: width * 0.02,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartImage: {
    width: width * 0.4,
    height: height * 0.3,
    resizeMode: "cover",
  },
  emptyCartText: {
    fontSize: width * 0.04,
    fontFamily: fonts.Medium,
    color: colors.white,
    marginTop: height * 0.02,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: width * 0.06,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
  },
  modalTitle: {
    fontFamily: fonts.Bold,
    fontSize: width * 0.05,
    color: colors.primary,
    marginBottom: height * 0.02,
  },
  modalText: {
    fontFamily: fonts.Regular,
    fontSize: width * 0.04,
    color: colors.dark1,
    textAlign: "center",
    marginBottom: height * 0.03,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  modalButton: {
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.1,
    borderRadius: 10,
  },
  modalButtonText: {
    fontFamily: fonts.SemiBold,
    fontSize: width * 0.035,
    color: colors.white,
    textAlign: "center",
  },
});
