import { useState } from 'react';

import {SafeAreaView, StyleSheet, TextInput} from 'react-native';

export default function SendMessage({}){
    const [text, setText] = useState("")
    return (
        <SafeAreaView>
            <TextInput
        style={styles.input}
        onChangeText={setText}
        value={text}
      >
        </TextInput>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });