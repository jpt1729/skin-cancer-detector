import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import NextIcon from "../icons/NextIcon";

type NextButtonType = {
    onPress: Function
}

export default function NextButton({ onPress }: NextButtonType) {
  return (
    <TouchableHighlight onPress={() => {
        onPress()
    }} style={styles.nextButton}>
      <NextIcon/>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    nextButton: {
      width: 48,
      height: 48,
      borderRadius: 999,
      backgroundColor: '#084887',
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });