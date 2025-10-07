import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { validateEmail, validatePassword } from "../../utils/Validation";
import useAuth from "../../hook/useAuth";

export default function SignInScreen() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signin } = useAuth();

  const navigation = useNavigation();

  // ✅ Kiểm tra hợp lệ
  const isEmailValid = useMemo(() => validateEmail(email.trim()), [email]);
  const isPasswordValid = useMemo(
    () => validatePassword(password.trim()),
    [password]
  );

  const handleSignIn = async () => {
    setLoading(true);
    const result = await signin(email, password);
    setLoading(false);

    if (result.success) console.log("Sign in successfully");
    else {
      let errorMessage;

      if (result.error.includes("user-not-found"))
        errorMessage = "User not found";
      else if (result.error.includes("wrong-password"))
        errorMessage = "Wrong password";
      else errorMessage = "Sign in failed";

      Alert.alert("Error", errorMessage);
    }
  };

  // ✅ Chuyển bước
  const handleContinue = () => {
    if (step === 1) {
      if (!isEmailValid) return;
      setStep(2);
    } else if (step === 2) {
      if (!isPasswordValid) return;
      console.log("Email:", email, "Password:", password);
      handleSignIn();
    }
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: "#000" }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Nút quay lại */}
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.innerContainer}>
            <View style={styles.content}>
              <Text style={styles.title}>
                {step === 1 ? "What's your email?" : "What's your password?"}
              </Text>

              {/* Bước 1: Nhập email */}
              {step === 1 ? (
                <TextInput
                  style={styles.input}
                  placeholder="Email address"
                  placeholderTextColor="#999"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              ) : (
                // Bước 2: Nhập password
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                  />
                </View>
              )}

              {step === 1 ? (
                <Text style={styles.terms}>
                  By tapping Continue, you are agreeing to{" "}
                  <Text style={styles.link}>our Terms of Service</Text> and{" "}
                  <Text style={styles.link}>Privacy Policy</Text>
                </Text>
              ) : (
                <TouchableOpacity
                  style={styles.forgotPassword}
                  onPress={() => navigation.navigate("ForgotPassword")}
                >
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password?
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>

        {/* Nút Continue */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.button,
              (step === 1 && isEmailValid) || (step === 2 && isPasswordValid)
                ? styles.buttonActive
                : styles.buttonInactive,
            ]}
            onPress={handleContinue}
            disabled={
              (step === 1 && !isEmailValid) || (step === 2 && !isPasswordValid)
            }
          >
            <Text
              style={[
                styles.buttonText,
                (step === 1 && isEmailValid) || (step === 2 && isPasswordValid)
                  ? styles.textActive
                  : styles.textInactive,
              ]}
            >
              Continue →
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 25,
  },
  backButton: {
    backgroundColor: "#1E1E1E",
    borderRadius: 100,
    padding: 10,
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 20,
    zIndex: 10,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#1E1E1E",
    color: "#fff",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 20,
  },
  terms: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
  },
  link: {
    color: "#fff",
  },
  passwordContainer: {
    marginBottom: 20,
  },
  forgotPassword: {
    alignSelf: "center",
    marginBottom: 30,
    backgroundColor: "#1E1E1E",
    borderRadius: 35,
  },
  forgotPasswordText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 40,
    marginVertical: 10,
    textAlign: "center",
  },
  passwordHint: {
    color: "#999",
    fontSize: 13,
    marginBottom: 30,
    textAlign: "center",
  },
  highlight: {
    color: "#fdba00ff",
  },
  footer: {
    paddingHorizontal: 25,
    paddingBottom: Platform.OS === "ios" ? 25 : 15,
  },
  button: {
    borderRadius: 35,
    paddingVertical: 16,
    alignItems: "center",
  },
  buttonInactive: {
    backgroundColor: "#1E1E1E",
  },
  buttonActive: {
    backgroundColor: "#fdba00ff",
  },
  buttonText: {
    fontSize: 23,
    fontWeight: "600",
  },
  textInactive: {
    color: "#555",
  },
  textActive: {
    color: "#000",
  },
});
