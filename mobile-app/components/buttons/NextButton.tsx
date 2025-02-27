import { View, Button, StyleSheet, TouchableHighlight, Text } from "react-native";
import NextIcon from "../icons/NextIcon";

type NextButtonType = {
    onPress: Function,
    disabled: boolean
}

export default function NextButton({ onPress, disabled }: NextButtonType) {
  return (
    <TouchableHighlight onPress={() => {
      if (!disabled) {
        onPress()
      }
    }} style={[styles.nextButton, disabled ? {backgroundColor: "#a6a4a8"} : {backgroundColor:"#084887"}]}>
      <NextIcon/>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    nextButton: {
      width: 48,
      height: 48,
      borderRadius: 999,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });