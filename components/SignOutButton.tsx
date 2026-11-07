import { Alert, Platform, Pressable, StyleSheet, Text } from 'react-native';
import { useAuth } from '../auth/AuthContext';

export default function SignOutButton() {
  const { signOut } = useAuth();

  async function handlePress() {
    try {
      await signOut();
    } catch {
      const message = 'Не удалось выйти. Попробуйте ещё раз.';
      if (Platform.OS === 'web') window.alert(message);
      else Alert.alert('Ошибка', message);
    }
  }

  return (
    <Pressable onPress={handlePress} accessibilityRole="button" style={styles.button}>
      <Text style={styles.text}>Выйти</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: { padding: 8 },
  text: { color: '#00897b', fontSize: 14, fontWeight: '600' },
});
