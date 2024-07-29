import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

import { ImageProvider } from "@/hooks/usePhotoContext";
import { QuestionsProvider } from "@/hooks/useQuestionsContext";
import { FactProvider } from "@/hooks/useFact";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <FactProvider>
      <QuestionsProvider>
        <ImageProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
              headerShown: false,
              tabBarStyle: {
                display: "none",
              },
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={color}
                  />
                ),
              }}
            />
            <Tabs.Screen
              name="camera"
              options={{
                title: "Camera",
                tabBarIcon: ({ color, focused }) => (
                  <TabBarIcon
                    name={focused ? "home" : "home-outline"}
                    color={color}
                  />
                ),
              }}
            />
          </Tabs>
        </ImageProvider>
      </QuestionsProvider>
    </FactProvider>
  );
}
