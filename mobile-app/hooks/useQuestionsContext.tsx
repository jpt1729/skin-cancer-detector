import React, { createContext, useState, useEffect, useContext, ReactNode } from "react";

type QuestionsContextType = {
  questions: any[] | null,
  answers: object,
  setAnswers: Function,
  questionsReady: boolean,
};
type QuestionsProviderProps = {
  children: ReactNode;
};

// Create the context with a default value
const QuestionsContext = createContext<QuestionsContextType>({
    "questions": [
      {
        "title": "What part of the body is this?",
        "name": "body-part",
        "options": [
          {
            "name": "lower extremity (leg, hip, thigh, etc.)",
            "value": "lower-extremity"
          },
          {
            "name": "upper extremity (arm, wrist, hand, etc.)",
            "value": "upper-extremity"
          },
          {
            "name": "anterior torso (front chest, stomach, etc.)",
            "value": "anterior-torso"
          },
          {
            "name": "posterior torso (back, shoulders, etc.)",
            "value": "posterior-torso"
          },
          {
            "name": "head/neck",
            "value": "head"
          }
        ]
      },
      {
        "title": "Age group",
        "name": "age",
        "options": [
          {
            "name": "0-19",
            "value": "0-19"
          },
          {
            "name": "20-39",
            "value": "upper-extremity"
          },
          {
            "name": "40-59",
            "value": "40-59"
          },
          {
            "name": "60-79",
            "value": "60-79"
          },
          {
            "name": "80-99",
            "value": "80-99"
          }
        ]
      },
      {
        "title": "Sex",
        "name": "sex",
        "options": [
          {
            "name": "male",
            "value": "male"
          },
          {
            "name": "female",
            "value": "female"
          }
        ]
      }
    ],
    answers: {}, // defaults
    setAnswers: () => {}, //defaults
    questionsReady: false,
  });

export const QuestionsProvider = ({ children }: QuestionsProviderProps) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState({})
  const [questionsReady, setQuestionsReady] = useState(false)
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `${process.env.EXPO_PUBLIC_API_URL}/questions`
        );
        const data = await response.json();
        setQuestions(data);
        setQuestionsReady(true)
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [setQuestionsReady]);

  return (
    <QuestionsContext.Provider value={{ questions, answers, setAnswers, questionsReady }}>
      {children}
    </QuestionsContext.Provider>
  );
};

// Custom hook to use the QuestionsContext
export const useQuestions = () => {
  const context = useContext(QuestionsContext);
  if (context === undefined) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
};
