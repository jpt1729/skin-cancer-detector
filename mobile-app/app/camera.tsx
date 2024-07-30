import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Button,
} from "react-native";
import { useState, useRef } from "react";
import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";

import { router } from "expo-router";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

import CloseButton from "@/components/buttons/CloseButton";
import FlashlightButton from "@/components/buttons/FlashlightButton";
import CameraButton from "@/components/buttons/CameraButton";
import { ThemedText } from "@/components/ThemedText";

import { useImage } from "@/hooks/usePhotoContext";

import { MotiView } from "moti";


let camera: any;
export default function CameraScreen() {

  const { width, height } = Dimensions.get("window");
  const dynamicHeight = height - 120;
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>("off");
  const [cameraReady, setCameraReady] = useState<boolean>(false);

  const { updateImage } = useImage();
  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }
  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.grantPermission}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  const takePhoto = async () => {
    const photo = await camera.takePictureAsync({
      skipProcessing: true,
    });
    const imageProcessed = await manipulateAsync(
      photo.uri,
      [
        {
          resize: {
            // Turns the image back into the same size as the screen
            width: width,
            height: height,
          },
        },
        {
          crop: {
            originX: width / 2 - 150,
            originY: height / 2 - 150 - 8 - 15 - 12, // This accounts for the camera status which moves the box up by a bit
            width: 300,
            height: 300,
          },
        },
      ],
      { compress: 1, format: SaveFormat.JPEG }
    );
    updateImage(imageProcessed);
    router.replace("/questions");
  };
  return (
    <CameraView
      facing={"back"}
      flash={flash}
      onCameraReady={() => {
        setCameraReady(true);
      }}
      ref={(r) => {
        camera = r;
      }}
    >
      <View style={[styles.viewContainer, { height: dynamicHeight }]}>
        <MotiView
          from={{
            opacity: 0,
            translateY: -15,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: "timing",
          }}
          style={styles.topMenu}
        >
          <CloseButton
            onPress={() => {
              router.replace("/");
            }}
          />

          <FlashlightButton
            onPress={() => {
              setFlash(flash === 'on' ? 'off' : 'on');
            }}
            flash={flash}
          />
        </MotiView>
        <View style={styles.middle}>
          <View style={styles.cameraBox}></View>
          <View style={styles.cameraStatus}>
            <ThemedText style={{ color: "white" }}>
              Focus camera on skin
            </ThemedText>
          </View>
        </View>
        <MotiView from={{
            opacity: 0,
            translateY: 15,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
          transition={{
            type: "timing",
          }}
          style={styles.bottom}>
          <CameraButton
            onPress={async () => {
              if (cameraReady) {
                if (camera) {
                  await takePhoto();
                }
              }
            }}
            disabled={!cameraReady}
          />
        </MotiView>
      </View>
    </CameraView>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    marginTop: 80,
    margin: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  grantPermission: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  topMenu: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  bottom: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 28, // Extra padding so button stays in the same location on page switches
  },
  middle: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBox: {
    height: 300,
    width: 300,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  cameraStatus: {
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
