// @ts-nocheck
import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";
/*
[
    {
        creator: 'rag',
        message: ""
    },
    {
        creator: 'user',
        message: "",
    }
]
*/

const RagContext = createContext({conversationHistory: [], ragEnabled: false, sendMessage: () => {}})

export const RagProvider = ({ children }: QuestionsProviderProps) => {
  const [conversationHistory, setConversationHistory] = useState<any[]>([]);
  const [ragEnabled, setRagEnabled] = useState(true)
  const sendMessage = async (message) => {
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
