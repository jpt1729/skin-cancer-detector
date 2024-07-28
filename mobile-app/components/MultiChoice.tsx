import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

import SelectIcon from "./icons/SelectIcon";
import SelectedIcon from "./icons/SelectedIcon";

import { ThemedText } from "./ThemedText";

export type MultiChoiceProps = {
  title: string;
  options: {
    name: string
  }[];
};
type MultiChoiceItemProps = {
  selected: boolean,
  name: string,
  onPress: () => void,
};
function MultiChoiceItem({ selected, name, onPress }: MultiChoiceItemProps) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.OptionStyle}>
      {selected ? <SelectedIcon/> : <SelectIcon/> }
      <ThemedText type="defaultSemiBold">
        {name}
      </ThemedText>
    </TouchableOpacity>
  );
}

export function MultiChoice({ title, options }: MultiChoiceProps) {
  const [selected, setSelected] = useState('');

  const renderItem = ({ item }: { item: { name: string } }) => {
    const itemSelected = item.name === selected;
    return (
      <MultiChoiceItem
        name={item.name}
        onPress={() => setSelected(item.name)}
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
    display: 'flex',
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
    marginBottom: 12
  }
});
