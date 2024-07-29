import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import BackIcon from "../icons/BackIcon";

type BackButtonType = {
    onPress: Function
}

export default function BackButton({ onPress }: BackButtonType) {
  return (
    <TouchableHighlight onPress={() => {
        onPress()
    }} style={styles.backButton}>
      <BackIcon/>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    backButton: {
      width: 48,
      height: 48,
      borderRadius: 999,
      backgroundColor: '#084887',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });