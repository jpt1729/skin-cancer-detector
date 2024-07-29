import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import CameraIcon from "../icons/CameraIcon";
import { MotiView } from "moti";
type CameraButtonType = {
    onPress: Function,
    disabled?: boolean
}

export default function CameraButton({ onPress, disabled }: CameraButtonType) {
  return (
    
    <TouchableHighlight onPress={() => {
        onPress()
    }} style={styles.touchableHighlight}
    >
      <MotiView style={styles.cameraButton} animate={{ backgroundColor: disabled ? '#a6a4a8' : '#084887' }}>
      <CameraIcon/>
      </MotiView>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    cameraButton: {
      width: 64,
      height: 64,
      borderRadius: 999,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    touchableHighlight: {
      width: 64,
      height: 64,
      borderRadius: 999,
    }
  });