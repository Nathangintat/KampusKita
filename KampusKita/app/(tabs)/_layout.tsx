import React from 'react';
import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        headerShown: false,
        tabBarBackground: () => (
            <View style={{ backgroundColor: Colors.background3 }}/>
        ),
    }}>
        <Tabs.Screen name="index" options={{ title: 'Home' }}/>
    </Tabs>
  );
}
