import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
  Alert,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../utils/colors";
import { fonts } from "../utils/font";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext } from "../provider/userprovider";

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const [secureEntry, setSecureEntry] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { storeUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (username === "" || password === "") {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        "http://10.0.2.2/mardobs/user_fetch.php",
        {
          username,
          password,
        }
      );

      if (response.data.status === "success") {
        const { user } = response.data;
        storeUser(user);
        setUsername("");
        setPassword("");

        if (user.account_type === "Waiter") {
          navigation.navigate("Table");
        } else if (
          user.account_type === "Chef" ||
          user.account_type === "Bartender"
        ) {
          navigation.navigate("Kitchen");
        } else {
          Alert.alert("Error", "Unknown account type");
        }
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hello,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons
            name={"person-outline"}
            color={colors.gray}
            size={width * 0.05}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your username"
            placeholderTextColor={colors.gray}
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons
            name={"lock"}
            color={colors.gray}
            size={width * 0.05}
          />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.gray}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <SimpleLineIcons
              name={"eye"}
              color={colors.gray}
              size={width * 0.04}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
        >
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

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
  loginButtonWrapper: {
    backgroundColor: colors.white,
    borderRadius: 100,
    marginTop: height * 0.35,
    justifyContent: "center",
    alignItems: "center",
    height: height * 0.07,
  },
  loginText: {
    color: colors.primary,
    fontSize: width * 0.04,
    fontFamily: fonts.SemiBold,
  },
});
