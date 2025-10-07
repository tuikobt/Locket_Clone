import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

// Lấy kích thước màn hình để tính linh hoạt
const { height } = Dimensions.get("window");

const images = [
  require("../../assets/image/Image_StartScreen_1-Photoroom.png"),
  require("../../assets/image/Image_StartScreen_2-Photoroom.png"),
];

export default function StartScreen() {
  const [index, setIndex] = useState(0);

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCreateAccount = () => {
    navigation.navigate("SignUp");
  };

  const handleSignIn = () => {
    navigation.navigate("SignIn");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <View style={styles.container}>
        {/* Ảnh minh họa */}
        <Image
          source={images[index]}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Logo + tên app */}
        <View style={styles.logoContainer}>
          <View style={styles.iconWrapper}>
            <Image
              source={require("../../assets/image/Logo.jpg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.appName}>Locket</Text>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Live pics from your friends,{"\n"}on your home screen
        </Text>

        {/* Nút “Create an account” */}
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText} onPress={handleCreateAccount}>
            Create an account
          </Text>
        </TouchableOpacity>

        {/* Nút “Sign in” */}
        <TouchableOpacity>
          <Text style={styles.signInText} onPress={handleSignIn}>
            Sign in
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    paddingHorizontal: 25,
  },

  /** 📸 Ảnh lớn hơn **/
  image: {
    width: "100%",
    height: height * 0.4, // chiếm khoảng 40% chiều cao màn hình
    marginBottom: 45,
  },

  /** 🟡 Logo và chữ lớn hơn **/
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },
  iconWrapper: {
    borderRadius: 10,
    padding: 6,
    marginRight: 7,
  },
  logo: {
    width: 35,
    height: 35,
    borderRadius: 10,
  },
  appName: {
    color: "#fff",
    fontSize: 40, // to hơn rõ rệt
    fontWeight: "bold",
  },

  /** 📝 Dòng mô tả lớn và cân đối **/
  tagline: {
    color: "#ccc",
    fontSize: 25,
    textAlign: "center",
    marginBottom: 50,
    lineHeight: 26,
    fontWeight: "bold",
  },

  /** 🟨 Nút lớn hơn **/
  createButton: {
    backgroundColor: "#fdba00ff",
    borderRadius: 35,
    paddingVertical: 18,
    paddingHorizontal: 50,
  },
  createButtonText: {
    fontSize: 23,
    fontWeight: "bold",
  },

  /** ⚫ Nút đăng nhập **/
  signInText: {
    color: "#fff",
    fontSize: 23,
    marginTop: 18,
    fontWeight: "500",
  },
});
