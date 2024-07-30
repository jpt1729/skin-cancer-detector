import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Button,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router, useNavigation } from "expo-router";
import CameraButton from "@/components/buttons/CameraButton";
import { useFact } from "@/hooks/useFact";


import HelloWorld from "@/components/AnimationTest";
export default function HomeScreen() {
  const { height } = Dimensions.get("window");
  const dynamicHeight = height - 120;

  const { fact } = useFact()

  const currentHour = new Date().getHours();
  let greeting;
  
  if (currentHour < 12) {
    greeting = "morning!";
  } else if (currentHour < 18) {
    greeting = "afternoon!";
  } else {
    greeting = "night!";
  }
  
  const navigation = useNavigation()

  return (
    <View style={[styles.viewContainer, { height: dynamicHeight }]}>
      <View>
        <View>
          <ThemedText type="title">
            Good <ThemedText type="highlight">{greeting}</ThemedText>
          </ThemedText>
          <View style={styles.dividerBar} />
        </View>
        <View>
          <ThemedText>
            <ThemedText type="highlight">Did you know?</ThemedText>{" "}
            {
              fact
            }
          </ThemedText>
        </View>
      </View>
      <View style={styles.bottom}>
        <View>
          <CameraButton onPress = {() => {
            router.replace('/camera')
          }}/>
        </View>
        <ThemedText type="subtext">Detect skin cancer</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  viewContainer: {
    marginTop: 80,
    margin: 40,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dividerBar: {
    marginVertical: 9,
    backgroundColor: "#F58A07",
    borderRadius: 9999,
    width: 120,
    height: 5,
  },
  bottom: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
