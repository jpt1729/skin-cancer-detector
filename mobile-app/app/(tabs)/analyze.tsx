// @ts-nocheck
import { StyleSheet, View, Dimensions, Image } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import { useFact } from "@/hooks/useFact";
import { useQuestions } from "@/hooks/useQuestionsContext";
import { useImage } from "@/hooks/usePhotoContext";
import CloseButton from "@/components/buttons/CloseButton";

import { uploadImage, test } from "@/scripts/file-upload";

export default function AnalyzeScreen() {
  const { height } = Dimensions.get("window");
  const dynamicHeight = height - 120;

  const { fact } = useFact();

  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "morning!";
  } else if (currentHour < 18) {
    greeting = "afternoon!";
  } else {
    greeting = "night!";
  }
  const { answers, setAnswers } = useQuestions();
  const { image } = useImage();

  
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
            <ThemedText type="highlight">Did you know?</ThemedText> {fact}
          </ThemedText>
        </View>
      </View>
      <View>
        <View style={styles.middle}>
          <View>
            <Image
              source={{ uri: image && image.uri }}
              style={styles.cameraBox}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 16,
            }}
          >
            <View
              style={{
                borderRadius: 9999,
                width: "30%",
                height: 8,
                backgroundColor: "#084887",
              }}
            />
          </View>
          <ThemedText type="defaultSemiBold" style={{ marginTop: -18 }}>
            Sending photos to our server!
          </ThemedText>
          <CloseButton
            onPress={async () => {
              setAnswers({})
              router.push('/')
            }}
          />
        </View>
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
    gap: 24,
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
  cameraBox: {
    aspectRatio: "1",
    width: "100%",
    borderRadius: 24,
    borderWidth: 4,
    borderColor: "#084887",
  },
  middle: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
