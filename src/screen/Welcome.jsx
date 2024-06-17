import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Welcome = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleSignup = () => {
    navigation.navigate("Signup");
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image
        source={require("../assets/logoName.png")}
        style={styles.logoName}
      />
      <Image
        source={require("../assets/logoBlack.png")}
        style={styles.logoBlack}
      />
      <Text style={styles.title}>Welcome to MARDOBS</Text>
      <Text style={styles.subTitle}>
        Ready to serve the best menu everyday.
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginButtonWrapper, { backgroundColor: colors.white }]}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginButtonWrapper]}
          onPress={handleSignup}
        >
          <Text style={styles.signupButtonText}>Sign-up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  logoName: {
    height: height * 0.1,
    width: width * 0.5,
    marginVertical: height * 0.03,
  },
  logoBlack: {
    height: height * 0.4,
    width: width * 0.6,
  },
  title: {
    fontSize: width * 0.07,
    color: colors.white,
    fontFamily: fonts.SemiBold,
    textAlign: "center",
    marginVertical: height * 0.03,
  },
  subTitle: {
    fontSize: width * 0.035,
    textAlign: "center",
    color: colors.gray,
    fontFamily: fonts.Medium,
  },
  buttonContainer: {
    marginTop: height * 0.1,
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.white,
    width: "80%",
    height: height * 0.07,
    borderRadius: 100,
  },
  loginButtonWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "50%",

    borderRadius: 98,
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: width * 0.04,
    fontfamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: width * 0.04,
    fontfamily: fonts.SemiBold,
    color: colors.white,
  },
});
