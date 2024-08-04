import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Dimensions,
  Button,
  ScrollView,
  FlatList,
} from "react-native";

import { ThemedText } from "@/components/ThemedText";

import { router } from "expo-router";
import CameraButton from "@/components/buttons/CameraButton";
import { useFact } from "@/hooks/useFact";
import { useImage } from "@/hooks/usePhotoContext";
import { useQuestions } from "@/hooks/useQuestionsContext";
import BackButton from "@/components/buttons/BackButton";
import SendMessage from "@/components/SendMessage";

import { useRag, MessageType } from "@/hooks/useRagContext";

const Message = ({ item }: { item: MessageType }) => {
  const { message, creator } = item;
  return (
    <View style={{ marginBottom: 24 }}>
      <View
        style={{
          marginLeft: creator === "user" && "auto",
          marginRight: creator === "rag" && "auto",
          padding: 12,
          paddingHorizontal: 16,
          backgroundColor: creator === "user" ? "#084887" : "#a6a4a8",
          borderRadius: 24,
          maxWidth: "75%",
        }}
      >
        <ThemedText
          style={{ color: creator === "user" ? "#FFFFFF" : "#000000" }}
        >
          {message}
        </ThemedText>
      </View>
      <ThemedText
        style={{
          textAlign: creator === "user" ? "right" : "left",
          marginLeft: creator === "rag" && 12,
          marginRight: creator === "user" && 12,
        }}
        type="subtext"
      >
        {creator === "user" ? "You" : "Our model"}
      </ThemedText>
    </View>
  );
};

export default function ChatScreen() {
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
  const { imageReady } = useImage();
  const { questionsReady } = useQuestions();
  const { ragEnabled, conversationHistory } = useRag();
  if (!ragEnabled) {
    router.replace("/");
  }
  return (
    <View style={[styles.viewContainer, { height: dynamicHeight }]}>
      <View>
        <View>
          <ThemedText type="title">
           <ThemedText type='highlight'>Learn</ThemedText> More
          </ThemedText>
          <View style={styles.dividerBar} />
        </View>
      </View>
      <View>
        <FlatList
          data={conversationHistory}
          renderItem={Message}
          keyExtractor={(item) => item.id}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <BackButton
            onPress={() => {
              router.replace("/analyze");
            }}
          />
          <SendMessage location="/chat" />
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
});
