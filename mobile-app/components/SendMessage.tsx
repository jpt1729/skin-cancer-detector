import { useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SendIcon from "./icons/SendIcon";
import { useRag } from "@/hooks/useRagContext";


export default function SendMessage({ location }: { location: string }) {
  const [text, setText] = useState("");
  const { sendMessage, ragLoading, setRagLoading, conversationHistory } = useRag();

  return (
    <SafeAreaView style={styles.inputBox}>
      <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
        placeholder={ragLoading ? "Loading..." : "Ask a question..."}
        editable={!(ragLoading || conversationHistory.length > 6)}
      />
      <TouchableOpacity
        onPress={() => {
            if (text === ''){
                return;
            }
            if (ragLoading){
                return;
            }
          sendMessage(text, location);
          setText('')
        }}
      >
        <SendIcon fill = {ragLoading ? '#a6a4a8' : '#084887'}/>
      </TouchableOpacity>
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
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    flexGrow: 1,
  },
});
