// @ts-nocheck
import { useEffect, useState } from "react";

import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Dimensions,
  Image,
} from "react-native";
import { MotiView } from "moti";
import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import { useFact } from "@/hooks/useFact";
import { useQuestions } from "@/hooks/useQuestionsContext";
import { useImage } from "@/hooks/usePhotoContext";
import CloseButton from "@/components/buttons/CloseButton";
import SendMessage from "@/components/SendMessage";
import { uploadImage, imagePreprocessing } from "@/scripts/file-upload";

import DiagnosisMessage from "@/components/DiagnosisMessage";

export default function AnalyzeScreen() {
  const [result, setResult] = useState();

  const { width, height } = Dimensions.get("window");
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
  const { image, updateImage, imageDetails } = useImage();
  const [currentUri, setCurrentUri] = useState(image.uri);

  useEffect(() => {
    const fetchData = async () => {
      const res = await uploadImage(image.uri, answers, imageDetails);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      setResult(res);
    };
    fetchData();
    return () => {};
  }, [width, height, uploadImage, setResult]);

  // TODO: Error handling
  return (
    <KeyboardAvoidingView style={[styles.viewContainer]} behavior="position">
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
          <View style={{ position: "relative" }}>
            <Image
              source={{ uri: image && image.uri }}
              style={styles.cameraBox}
            />
            {result && (
              <View
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.45)",
                  borderRadius: 24,
                  padding: 40,
                }}
              >
                <MotiView
                  from={{
                    opacity: 0,
                    translateY: 15,
                  }}
                  animate={{
                    opacity: 1,
                    translateY: 0,
                  }}
                  transition={{
                    type: "timing",
                  }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                  }}
                >
                  <DiagnosisMessage result={result} />
                </MotiView>
              </View>
            )}
          </View>
          {!result && (
            <View
              style={{
                width: "100%",
                height: 16,
              }}
            >
              <MotiView
                style={{
                  borderRadius: 9999,
                  height: 8,
                  width: "100%",
                  backgroundColor: "#084887",
                  transformOrigin: "left",
                }}
                from={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  type: "timing",
                  duration: 250,
                  repeat: 9999,
                }}
              />
            </View>
          )}
          {!result && <ThemedText type="subtext">Model running</ThemedText>}
          {result && (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "between",
                alignItems: "center",
                gap:12,
              }}
            >
              <CloseButton
                onPress={async () => {
                  setAnswers({});
                  router.replace("/");
                }}
              />
              <SendMessage />
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 24,
  },
  dividerBar: {
    marginVertical: 9,
    backgroundColor: "#F58A07",
    borderRadius: 9999,
    width: 120,
    height: 5,
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
    marginTop: 48,
  },
  bottomBar: {
    display: "flex",
    flexDirection: "row",
  },
});
