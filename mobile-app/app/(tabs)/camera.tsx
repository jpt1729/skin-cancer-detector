import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Button,
} from "react-native";
import { useState } from "react";
import { CameraView, FlashMode, useCameraPermissions } from "expo-camera";

import { router } from "expo-router";

import CloseButton from "@/components/buttons/CloseButton";
import FlashlightButton from "@/components/buttons/FlashlightButton";
import CameraButton from "@/components/buttons/CameraButton";
import { ThemedText } from "@/components/ThemedText";

export default function CameraScreen() {
  const { height } = Dimensions.get("window");
  const dynamicHeight = height - 120;
  const [permission, requestPermission] = useCameraPermissions();
  const [flash, setFlash] = useState<FlashMode>('off')
  const [cameraReady, setCameraReady] =useState<boolean>(false)
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
  
  return (
    <CameraView facing={"back"} flash={flash} onCameraReady={() => {
        setCameraReady(true)
    }}>
      <View style={[styles.viewContainer, { height: dynamicHeight }]}>
        <View style={styles.topMenu}>
          <CloseButton onPress={() => {
            router.push('/')
          }} />
          <FlashlightButton onPress={() => {
            setFlash('on')
          }} flash={flash}/>
        </View>
        <View style={styles.middle}>
          <View style={styles.cameraBox}>

          </View>
          <View style={styles.cameraStatus}>
            <ThemedText style={{color:'white'}}>Focus camera on skin</ThemedText>
          </View>
        </View>
        <View style={styles.bottom}>
            <CameraButton onPress={() => {

            }}
            disabled={!cameraReady}/>
        </View>
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
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  middle: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bottom: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 28 // Extra padding so button stays in the same location on page switches
  },
  cameraBox: {
    height: 300,
    width: 300,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF'
  },
  cameraStatus: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  }
});
