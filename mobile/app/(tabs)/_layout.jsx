import React from 'react'
import { Redirect, Stack, Tabs } from 'expo-router'
import { useAuth } from "@clerk/clerk-expo"
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants/colors';

const TabsLayout = () => {

  const { isSignedIn, isLoaded } = useAuth(); // Example hook to check auth status

  if (!isLoaded) return null; // or a loading spinner

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />
  return (
    <Tabs 
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.white,
          borderTopColor: COLORS.border,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}>
      <Tabs.Screen 
      name="index" 
      options={{ title: 'Recipes',
      tabBarIcon: ({ size, color }) => <Ionicons name="restaurant" size={size} color={color} />,
      }}
      />

    
      
    <Tabs.Screen 
    name="search" 
    options={{ title: 'Search',
    tabBarIcon: ({ size, color }) => <Ionicons name="search" size={size} color={color} />,
     }}
     />

    <Tabs.Screen name="favorities" options={{ title: 'Favorites',
    tabBarIcon: ({ size, color }) => <Ionicons name="heart" size={size} color={color} />,
     }} />
    </Tabs>
  )
}

export default TabsLayout