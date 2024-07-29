import { StyleSheet, TouchableHighlight } from "react-native";
import FinishIcon from "../icons/FinishIcon";

type FinishButtonType = {
    onPress: Function,
    disabled: boolean
}

export default function FinishButton({ onPress, disabled }: FinishButtonType) {
  return (
    <TouchableHighlight onPress={() => {
      if (!disabled) {
        onPress()
      }
    }} style={[styles.finishButton, disabled ? {backgroundColor: "#a6a4a8"} : {backgroundColor:"#084887"}]}>
      <FinishIcon/>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
    finishButton: {
      width: 48,
      height: 48,
      borderRadius: 999,
      display:'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
  });