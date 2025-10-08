import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
} from "react-native-gesture-handler";

export default function LocketCamera() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState("back");
  const [capturedImage, setCapturedImage] = useState(null);
  const [flash, setFlash] = useState("off");
  const [zoom, setZoom] = useState(0);
  const cameraRef = useRef(null);

  // 📸 Hàm chụp ảnh
  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        setCapturedImage(photo.uri);
      } catch (error) {
        Alert.alert("Lỗi", "Không thể chụp ảnh");
      }
    }
  };

  // 🔄 Đảo camera
  const toggleCameraType = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  // ⚡ Bật / tắt flash
  const toggleFlash = () => {
    setFlash((prev) => (prev === "off" ? "on" : "off"));
  };

  // 🔁 Chụp lại ảnh
  const retakePicture = () => {
    setCapturedImage(null);
  };

  // ⚙️ Xử lý zoom pinch
  const handlePinch = (event) => {
    if (event.nativeEvent.scale) {
      let newZoom = Math.min(
        Math.max(zoom + (event.nativeEvent.scale - 1) * 0.02, 0),
        1
      );
      setZoom(newZoom);
    }
  };

  const getFlashIcon = () => {
    if (flash === "on") return "flash";
    return "flash-off";
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text style={styles.permissionText}>Đang tải...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-outline" size={64} color="#fff" />
          <Text style={styles.permissionText}>
            Cần quyền truy cập camera để sử dụng Locket
          </Text>
          <TouchableOpacity
            onPress={requestPermission}
            style={styles.permissionButton}
          >
            <Text style={styles.permissionButtonText}>Cấp quyền Camera</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />

        {/* 🔝 Thanh top */}
        <View style={styles.topBar}>
          <View style={styles.topRightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="person-circle-outline" size={30} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.friendsButton}>
            <Ionicons name="people" size={24} color="#fff" />
            <Text style={styles.friendsText}>4 Friends</Text>
          </View>

          <View style={styles.topRightButtons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="message-circle" size={30} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* 📷 Camera hoặc Preview */}
        <View style={styles.cameraContainer}>
          <View style={styles.cameraWrapper}>
            {capturedImage ? (
              <Image source={{ uri: capturedImage }} style={styles.preview} />
            ) : (
              <PinchGestureHandler onGestureEvent={handlePinch}>
                <View style={{ flex: 1 }}>
                  <CameraView
                    ref={cameraRef}
                    style={styles.camera}
                    facing={facing}
                    flash={flash}
                    zoom={zoom}
                  />

                  {/* ⚡ Flash Toggle (trên trái) */}
                  <View style={styles.cameraOverlayTopLeft}>
                    <TouchableOpacity
                      style={styles.overlayButton}
                      onPress={toggleFlash}
                    >
                      <Ionicons name={getFlashIcon()} size={20} color="#fff" />
                    </TouchableOpacity>
                  </View>

                  {/* 🔍 Zoom Indicator (phải màn hình) */}
                  <View style={styles.zoomIndicatorContainer}>
                    <Text style={styles.zoomIndicatorText}>
                      {`${(zoom * 10 + 1).toFixed(1)}x`}
                    </Text>
                  </View>
                </View>
              </PinchGestureHandler>
            )}
          </View>
        </View>

        {/* 🎯 Nút chụp & hành động */}
        <View style={styles.controlsContainer}>
          <View style={styles.bottomActions}>
            <TouchableOpacity style={styles.actionButton}>
              <View style={styles.actionButtonBg}>
                <Ionicons name="images-sharp" size={30} color="#fff" />
              </View>
            </TouchableOpacity>

            <View style={styles.captureButtonContainer}>
              <TouchableOpacity
                style={styles.captureButton}
                onPress={capturedImage ? retakePicture : takePicture}
                activeOpacity={0.7}
              >
                <View style={styles.captureButtonInner} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraType}
              activeOpacity={0.7}
            >
              <View style={styles.flipButtonBg}>
                <Ionicons name="reload" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    gap: 20,
  },
  permissionText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  friendsButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingHorizontal: 20,
    paddingVertical: 7,
    borderRadius: 35,
    gap: 6,
  },
  friendsText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
  topRightButtons: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    backgroundColor: "#1E1E1E",
    padding: 6,
    borderRadius: 50,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraWrapper: {
    width: "100%",
    aspectRatio: 4 / 4,
    maxHeight: "80%",
    borderRadius: 35,
    overflow: "hidden",
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  cameraOverlayTopLeft: {
    position: "absolute",
    top: 15,
    left: 15,
  },
  overlayButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 5,
    paddingVertical: 5,
    borderRadius: 20,
    alignItems: "center",
    gap: 4,
  },
  zoomIndicatorContainer: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 10,
    borderRadius: 20,
  },
  zoomIndicatorText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  controlsContainer: {
    marginBottom: 100,
  },
  captureButtonContainer: {
    alignItems: "center",
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "#fdba00ff",
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#fff",
  },
  bottomActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  actionButton: {
    alignItems: "center",
    gap: 6,
  },
  actionButtonBg: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButton: {
    width: 48,
    height: 48,
  },
  flipButtonBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});
