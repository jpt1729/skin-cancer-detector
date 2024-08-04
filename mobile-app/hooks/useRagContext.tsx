// @ts-nocheck
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
import { router } from "expo-router";
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
    if (location === '/analyze'){
        router.replace('/chat')
    }
    return;
  }
const RagContext = createContext({conversationHistory: [], ragEnabled: false, sendMessage: sendMessageTest})

export type MessageType = {
    id: number,
    creator: 'rag' | 'user',
    message: string
}

export const RagProvider = ({ children }: QuestionsProviderProps) => {
  const [conversationHistory, setConversationHistory] = useState<MessageType[]>([
    {
        id: 1,
        creator: 'rag',
        message: "John hates chat bots"
    },
    {
        id: 2,
        creator: 'user',
        message: "he really does hate chat bots how did u guys get him to make this?",
    }
]);
  const [ragEnabled, setRagEnabled] = useState(true)

  const sendMessage = async (message, location) => {
    if (location === '/analyze'){
        router.replace('/chat')
    }
    return;
  }
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/rag-enabled`
        );
        setRagEnabled(response.status === 200)
      } catch (error) {
        console.log(error)
      }
    };

    fetchQuestions();
  }, [setRagEnabled]);
  return (
    <RagContext.Provider value={{ conversationHistory, ragEnabled, sendMessage }}>
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
