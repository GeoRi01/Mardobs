import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
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

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: "center",
  },
  logoName: {
    height: 120,
    width: 250,
    marginVertical: 30,
  },
  logoBlack: {
    height: 330,
    width: 400,
  },
  title: {
    fontSize: 40,
    color: colors.white,
    fontFamily: fonts.SemiBold,
    paddingHorizontal: 20,
    textAlign: "center",
    marginVertical: 20,
    marginTop: 40,
  },
  subTitle: {
    fontSize: 18,
    paddingHorizontal: 20,
    textAlign: "center",
    color: colors.gray,
    fontFamily: fonts.Medium,
  },
  buttonContainer: {
    marginTop: "40%",
    flexDirection: "row",
    borderWidth: 2,
    borderColor: colors.white,
    width: "80%",
    height: 65,
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
    fontSize: 20,
    fontfamily: fonts.SemiBold,
  },
  signupButtonText: {
    fontSize: 20,
    fontfamily: fonts.SemiBold,
    color: colors.white,
  },
});
