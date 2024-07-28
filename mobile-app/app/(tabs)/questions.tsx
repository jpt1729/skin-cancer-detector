// @ts-ignore
import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Button,
  ImageBackground,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import CameraButton from "@/components/buttons/CameraButton";
import { skinCancerFacts } from "@/constants/Quotes";

import { useImage } from "@/hooks/usePhotoContext";

const questions = [
  {
    title: 'What part of the body is this?',
    options: [

    ]
  }
]

export default function HomeScreen() {
  const { height } = Dimensions.get("window");
  const dynamicHeight = height - 120;

  const skinCancerFact =
    skinCancerFacts[Math.floor(Math.random() * skinCancerFacts.length)];
  const { image } = useImage();
  if (image === null) {
    router.push("/"); // something happened and they need to be sent back
  }
  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "morning!";
  } else if (currentHour < 18) {
    greeting = "afternoon!";
  } else {
    greeting = "night!";
  }

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
            {skinCancerFact}
          </ThemedText>
        </View>
      </View>
      <View>
        <View style={styles.questions}>
          <ThemedText type='defaultSemiBold'>
            <ThemedText type='highlight'>
              Questions
            </ThemedText>
          </ThemedText>
          <ThemedText type='subtitle'>
            What part of the body is this?
          </ThemedText>
        </View>
        <Image source={{ uri: image && image.uri }} style={{
            width: 155,
            height: 155,
            borderColor: "#084887",
            borderRadius: 15,
            borderWidth: 2,
            marginLeft: 'auto'
          }}/>
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
  questions: {
    display: "flex",
    flexDirection: 'column',
    gap: 9,
  }
});
