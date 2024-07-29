import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import FlashlightIcon from "../icons/FlashlightIcon";
import { MotiView } from "moti";

type FlashlightButtonType = {
    onPress: Function,
    flash: 'on' | 'off' | 'auto'
}

export default function FlashlightButton({ onPress, flash }: FlashlightButtonType) {
  return (
    <TouchableHighlight onPress={() => {
        onPress()
    }} style={styles.closeButton}>
      <FlashlightIcon flash={flash}/>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    closeButton: {
      width: 48,
      height: 48,
      borderRadius: 999,
      backgroundColor: '#084887',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });