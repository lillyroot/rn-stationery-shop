import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const SESSION_KEY = 'marina_session';

export async function readSession(): Promise<string | null> {
  if (Platform.OS === 'web') return window.localStorage.getItem(SESSION_KEY);
  return SecureStore.getItemAsync(SESSION_KEY);
}

export async function writeSession(value: string): Promise<void> {
  if (Platform.OS === 'web') window.localStorage.setItem(SESSION_KEY, value);
  else await SecureStore.setItemAsync(SESSION_KEY, value);
}

export async function clearSession(): Promise<void> {
  if (Platform.OS === 'web') window.localStorage.removeItem(SESSION_KEY);
  else await SecureStore.deleteItemAsync(SESSION_KEY);
}
