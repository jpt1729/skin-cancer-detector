import { useState } from "react";

import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import SendIcon from "./icons/SendIcon";

export default function SendMessage({}) {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder="Ask a question..."
      />
      <SendIcon />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    height: 48,
    borderWidth: 3,
    padding: 10,
    borderRadius: 24,
    paddingHorizontal: 12,
    borderColor: "#084887",
    display: "flex",
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  input: {
    flexGrow:1,
  },
});
