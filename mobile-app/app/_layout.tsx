import { useCallback } from "react";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useFocusEffect } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";

import { ImageProvider } from "@/hooks/usePhotoContext";
import { QuestionsProvider } from "@/hooks/useQuestionsContext";
import { FactProvider } from "@/hooks/useFact";
import { RagProvider } from "@/hooks/useRagContext";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("../assets/fonts/Inter.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);
  useFocusEffect(
    useCallback(() => {
      // This effect runs every time the screen comes into focus
      // Reset the state or perform any necessary action here

      return () => {
        // Cleanup if necessary when the screen goes out of focus
      };
    }, [])
  );
  if (!loaded) {
    return null;
  }

  return (
    <RagProvider>
      <FactProvider>
        <QuestionsProvider>
          <ImageProvider>
            <ThemeProvider value={DefaultTheme}>
              <Stack>
                <Stack.Screen
                  name="index"
                  options={{ headerShown: false, animation: "none" }}
                />
                <Stack.Screen
                  name="camera"
                  options={{ headerShown: false, animation: "none" }}
                />
                <Stack.Screen
                  name="questions"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="analyze"
                  options={{ headerShown: false, animation: "none" }}
                />
                <Stack.Screen
                  name="chat"
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="+not-found" />
              </Stack>
            </ThemeProvider>
          </ImageProvider>
        </QuestionsProvider>
      </FactProvider>
    </RagProvider>
  );
}
