// @ts-ignore
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import { skinCancerFacts } from "@/constants/Quotes";

import { MultiChoice } from "@/components/MultiChoice";

import { useImage } from "@/hooks/usePhotoContext";

import CloseButton from "@/components/buttons/CloseButton";
import NextButton from "@/components/buttons/NextButton";

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
          <ThemedText type="defaultSemiBold">
            <ThemedText type="highlight">Questions</ThemedText>
          </ThemedText>
          <MultiChoice
            title="What part of the body is this?"
            options={[
              { name: "lower extremity (leg, hip, thigh, etc.)" },
              { name: "anterior torso (front chest, stomach, etc.)" },
              { name: "posterior torso (back, shoulders, etc.)" },
              { name: "head/neck" },
              { name: "upper extremity (arm, wrist, hand, etc.)" },
            ]}
          />
          <View style={styles.ButtonView}>
            <CloseButton
              onPress={() => {
                router.push("/");
              }}
            />
            <NextButton
              onPress={() => {
                router.push("/");
              }}
            />
          </View>
        </View>
        <Image
          source={{ uri: image && image.uri }}
          style={{
            width: 155,
            height: 155,
            borderColor: "#084887",
            borderRadius: 15,
            borderWidth: 2,
            marginLeft: "auto",
          }}
        />
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
    flexDirection: "column",
    gap: 9,
    marginTop: 24,
  },
  ButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  }
});
