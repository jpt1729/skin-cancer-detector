import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import CloseIcon from "../icons/CloseIcon";

type CloseButtonType = {
    onPress: Function
}

export default function CloseButton({ onPress }: CloseButtonType) {
  return (
    <TouchableHighlight onPress={() => {
        onPress()
    }} style={styles.closeButton}>
      <CloseIcon/>
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