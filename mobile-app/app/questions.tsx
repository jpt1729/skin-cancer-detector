// @ts-nocheck
import { useState } from "react";
import { Image, StyleSheet, View, Dimensions } from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import { skinCancerFacts } from "@/constants/Quotes";

import { MultiChoice } from "@/components/MultiChoice";

import { useImage } from "@/hooks/usePhotoContext";
import { useQuestions } from "@/hooks/useQuestionsContext";
import { useFact } from "@/hooks/useFact";

import CloseButton from "@/components/buttons/CloseButton";
import BackButton from "@/components/buttons/BackButton";
import NextButton from "@/components/buttons/NextButton";
import FinishButton from "@/components/buttons/FinishButton";

import { AnimatePresence, MotiView } from "moti";

export default function QuestionsScreen() {
  const { height } = Dimensions.get("window");
  const dynamicHeight = height - 120;

  const { fact } = useFact();

  const { image } = useImage();
  if (image === null) {
    router.replace("/"); // something happened and they need to be sent back
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
  const { questions, answers, setAnswers } = useQuestions();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  if (!questions) {
    return <View />;
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
            <ThemedText type="highlight">Did you know?</ThemedText> {fact}
          </ThemedText>
        </View>
      </View>
      <View>
        <View style={styles.questions}>
          <ThemedText type="defaultSemiBold">
            <ThemedText type="highlight">Questions</ThemedText>
          </ThemedText>
          <AnimatePresence>
            <MultiChoice
              title={questions["questions"][currentQuestion].title}
              name={questions["questions"][currentQuestion].name}
              options={questions["questions"][currentQuestion]["options"]}
            />
          </AnimatePresence>
          <View style={styles.ButtonView}>
            {currentQuestion === 0 && (
              <CloseButton
                onPress={() => {
                  setAnswers({});
                  setCurrentQuestion(0);
                  router.replace("/");
                }}
              />
            )}
            {currentQuestion > 0 && (
              <BackButton
                onPress={() => {
                  if (currentQuestion - 1 >= 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    return;
                  }
                }}
              />
            )}
            {currentQuestion + 1 !== questions["questions"].length && (
              <NextButton
                onPress={() => {
                  if (currentQuestion + 1 < questions["questions"].length) {
                    setCurrentQuestion(currentQuestion + 1);
                    return;
                  }
                  // final question code here
                }}
                disabled={
                  !(answers[questions["questions"][currentQuestion]["name"]] || answers[questions["questions"][currentQuestion]["name"]] === 0) // Janky way to get around 0 becoming a disabled value
                }
              />
            )}
            {currentQuestion + 1 === questions["questions"].length && (
              <FinishButton
                onPress={() => {
                  setCurrentQuestion(0);
                  router.replace("/analyze");
                }}
                disabled={
                  !(answers[questions["questions"][currentQuestion]["name"]] || answers[questions["questions"][currentQuestion]["name"]] === 0) // Janky way to get around 0 becoming a disabled value
                }
              />
            )}
          </View>
        </View>
        <View>
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
  questions: {
    display: "flex",
    flexDirection: "column",
    gap: 9,
  },
  ButtonView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
});
