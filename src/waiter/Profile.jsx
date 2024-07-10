import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Modal,
  Button,
  StatusBar,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { fonts } from "../utils/font";
import { colors } from "../utils/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../provider/userprovider";

const { width, height } = Dimensions.get("window");

const Profile = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    StatusBar.setHidden(true);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    StatusBar.setHidden(false);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogout = () => {
    openModal();
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
      </View>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topSection}>
          <View style={styles.propicArea}>
            <Image
              source={require("../assets/waiter.png")}
              style={styles.propic}
            />
          </View>
          <Text style={styles.name}>{user.accounts_name}</Text>
          <Text style={styles.membership}>{user.accounts_type}</Text>
        </View>

        <View style={styles.buttonList}>
          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Image
                  source={require("../assets/account.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonName}>Account</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Image
                  source={require("../assets/contactus.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonName}>Contact Us</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonSection} activeOpacity={0.9}>
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Image
                  source={require("../assets/aboutus.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonName}>About Us</Text>
            </View>
            <View style={styles.sp}></View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.buttonSection}
            activeOpacity={0.9}
            onPress={handleLogout}
          >
            <View style={styles.buttonArea}>
              <View style={styles.iconArea}>
                <Image
                  source={require("../assets/logout.png")}
                  style={styles.iconStyle}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.buttonName}>Logout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Are you sure you want to logout?
            </Text>
            <View style={styles.modalButtons}>
              <Button
                title="Confirm"
                color={colors.primary}
                onPress={() => {
                  clearUser();
                  navigation.navigate("Login");
                }}
              />
              <Button title="Cancel" onPress={closeModal} color={colors.gray} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Profile;

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
  safeArea: {
    flex: 1,
  },
  topSection: {
    height: height * 0.3,
    justifyContent: "center",
    alignItems: "center",
  },
  propicArea: {
    width: width * 0.3,
    height: height * 0.17,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  propic: {
    width: width * 0.2,
    height: height * 0.15,
    resizeMode: "center",
    tintColor: colors.white,
  },
  name: {
    marginTop: height * 0.02,
    color: colors.white,
    fontSize: width * 0.05,
    fontFamily: fonts.SemiBold,
  },
  membership: {
    color: colors.orange,
    fontSize: width * 0.03,
    fontFamily: fonts.Medium,
  },
  buttonList: {
    marginTop: height * 0.06,
  },
  buttonSection: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconArea: {
    width: width * 0.04,
    height: height * 0.04,
    justifyContent: "center",
    alignItems: "center",
  },
  iconStyle: {
    width: width * 0.08,
    height: height * 0.1,
    tintColor: colors.orange,
  },
  buttonName: {
    width: width * 0.3,
    fontSize: width * 0.045,
    color: colors.white,
    marginLeft: width * 0.05,
    fontFamily: fonts.SemiBold,
  },
  sp: {
    width: width * 0.7,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    height: 2,
    backgroundColor: colors.white,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    width: width * 0.9,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    elevation: 5,
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
});
