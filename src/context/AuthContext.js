// context/AuthContext.js

import React, { createContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../api/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User đã đăng nhập
        setUser(firebaseUser);
        await AsyncStorage.setItem("userId", firebaseUser.uid);
        await AsyncStorage.setItem("userEmail", firebaseUser.email);
      } else {
        // User chưa đăng nhập
        setUser(null);
        await AsyncStorage.removeItem("userId");
        await AsyncStorage.removeItem("userEmail");
      }

      // ✅ FIX: Set loading = false sau khi check xong
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const forgotPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const value = {
    user,
    loading,
    signup,
    signin,
    signout,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
