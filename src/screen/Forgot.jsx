import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const Forgot = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const handleGoBack = () => {
    navigation.goBack();
  };
  const handleLogin = () => {
    navigation.navigate("Login");
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
        <Ionicons
          name={"arrow-back-outline"}
          color={colors.primary}
          size={width * 0.05}
        />
      </TouchableOpacity>
      {/* Text */}
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Forgot your</Text>
        <Text style={styles.headingText}>Password?</Text>
      </View>
      {/* Input Box */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name={"mail-outline"}
            color={colors.gray}
            size={width * 0.05}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.gray}
            keyboardType="email-address"
          />
        </View>
        {/* Button */}
        <TouchableOpacity
          style={styles.resetButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.resetText}>Reset</Text>
        </TouchableOpacity>
        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Already have an account?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Forgot;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: width * 0.05,
  },
  backButtonWrapper: {
    height: height * 0.04,
    width: width * 0.07,
    backgroundColor: colors.gray,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginVertical: height * 0.02,
  },
  headingText: {
    fontSize: width * 0.08,
    color: colors.white,
    fontFamily: fonts.SemiBold,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 100,
    paddingHorizontal: width * 0.05,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: height * 0.02,
    height: height * 0.07,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: width * 0.015,
    fontFamily: fonts.Light,
    fontSize: width * 0.025,
    color: colors.gray,
  },
  resetButtonWrapper: {
    backgroundColor: colors.white,
    borderRadius: 100,
    marginTop: height * 0.47,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.07,
  },
  resetText: {
    color: colors.primary,
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: height * 0.02,
    gap: width * 0.01,
    marginTop: height * 0.02,
  },
  accountText: {
    color: colors.white,
    fontSize: width * 0.025,
    fontFamily: fonts.Regular,
  },
  loginText: {
    color: colors.white,
    fontSize: width * 0.025,
    fontFamily: fonts.Bold,
  },
});
