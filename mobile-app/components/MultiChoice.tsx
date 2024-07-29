// @ts-nocheck
import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import SelectIcon from "./icons/SelectIcon";
import SelectedIcon from "./icons/SelectedIcon";

import { ThemedText } from "./ThemedText";

import { useQuestions } from "@/hooks/useQuestionsContext";

export type MultiChoiceProps = {
  title: string;
  name: string;
  options: {
    name: string;
    value: string;
  }[];
};
type MultiChoiceItemProps = {
  selected: boolean;
  item: any;
  onPress: () => void;
};
function MultiChoiceItem({ item, selected, onPress }: MultiChoiceItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.OptionStyle}>
      {selected ? <SelectedIcon /> : <SelectIcon />}
      <ThemedText type="defaultSemiBold">{item.name}</ThemedText>
    </TouchableOpacity>
  );
}

export function MultiChoice({ title, name, options }: MultiChoiceProps) {
  const { answers, setAnswers } = useQuestions();
  const [selected, setSelected] = useState(answers[name] ? answers[name]: "");
  
  const renderItem = ({ item }: { item: { name: string; value: string } }) => {
    const itemSelected = item.value === selected;
    return (
      <MultiChoiceItem
        item={item}
        onPress={() => {
          setSelected(item.value);
          let newAnswers = {...answers}
          newAnswers[name] = item.value
          setAnswers(newAnswers)
        }}
        selected={itemSelected}
      />
    );
  };

  return (
    <View style={styles.MultiChoiceView}>
      <ThemedText type="subtitle">{title}</ThemedText>
      <FlatList
        data={options}
        renderItem={renderItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  MultiChoiceView: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
  },
  OptionStyle: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginBottom: 12,
  },
});
