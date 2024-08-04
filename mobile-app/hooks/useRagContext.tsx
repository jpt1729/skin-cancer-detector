// @ts-nocheck
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { router } from "expo-router";

import { useImage } from "@/hooks/usePhotoContext";

/*
[
    {
        id: 1,
        creator: 'rag',
        message: ""
    },
    {
        id: 2,
        creator: 'user',
        message: "",
    }
]
*/
const sendMessageTest = async (message, location) => {
  if (location === "/analyze") {
    router.replace("/chat");
  }
  return;
};
const RagContext = createContext({
  conversationHistory: [],
  ragEnabled: false,
  sendMessage: sendMessageTest,
  ragLoading: true,
  setRagLoading: () => {},
  setConversationHistory: () => {}
});

export type MessageType = {
  id: number;
  creator: "rag" | "user";
  message: string;
};

export const RagProvider = ({ children }: QuestionsProviderProps) => {
  const [conversationHistory, setConversationHistory] = useState<MessageType[]>(
    []
  );
  const [ragEnabled, setRagEnabled] = useState(true);

  const [ragLoading, setRagLoading] = useState(false);
  const { results } = useImage();

  const sendMessage = async (message, location) => {
    if (location === "/analyze") {
        router.replace("/chat");
      }
    let jsonObject;
    try {
      jsonObject = JSON.parse(results.body);
    } catch (error) {
      router.replace("/");
    }
    let trueMessage = encodeURIComponent(
      `I have an ${(jsonObject.probability * 100).toFixed(1)} chance of ${
        jsonObject.type
      }. ${message}`
    );
    let updatedConversation = [...conversationHistory];

    updatedConversation.push({
      id: Math.floor(Math.random() * 100000000000) + 1,
      creator: "user",
      message: message,
    });
    if (updatedConversation.length > 6) {
        setConversationHistory([])
      return;
    }
    setConversationHistory(updatedConversation);
    setRagLoading(false)
    const res = await fetch(
      `http://73.189.37.210:48010/query?text=${trueMessage}`
    );
    const json = await res.json();
    console.log(json)
    updatedConversation.push({
      id: Math.floor(Math.random() * 100000000000) + 1,
      creator: "rag",
      message: json["message"].replace(/(\r\n|\n|\r)/gm, "")
    });
    
    setRagLoading(false)
    return;
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/rag-enabled`
        );
        setRagEnabled(response.status === 200);
      } catch (error) {
        console.log(error);
      }
    };

    fetchQuestions();
  }, [setRagEnabled]);
  return (
    <RagContext.Provider
      value={{
        conversationHistory,
        ragEnabled,
        sendMessage,
        ragLoading,
        setRagLoading,
        setConversationHistory
      }}
    >
      {children}
    </RagContext.Provider>
  );
};

// Custom hook to use the QuestionsContext
export const useRag = () => {
  const context = useContext(RagContext);
  if (context === undefined) {
    throw new Error("useRag must be used within a RagProvider");
  }
  return context;
};
