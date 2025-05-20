import { Stack } from 'expo-router';
import { Text, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>Page not found</Text>
    </>
  );
}
