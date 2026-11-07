import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

export default function PasswordField(props: TextInputProps) {
  const [hidden, setHidden] = useState(true);

  return (
    <View>
      <View style={styles.heading}>
        <Text style={styles.label}>Пароль</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={hidden ? 'Показать пароль' : 'Скрыть пароль'}
          onPress={() => setHidden((value) => !value)}
          hitSlop={8}
          disabled={props.editable === false}
        >
          <Text style={styles.toggle}>{hidden ? 'Показать' : 'Скрыть'}</Text>
        </Pressable>
      </View>
      <TextInput
        {...props}
        accessibilityLabel="Пароль"
        style={[styles.input, props.style]}
        secureTextEntry={hidden}
        autoCapitalize="none"
        autoCorrect={false}
        autoComplete="current-password"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  label: { color: '#444', fontSize: 14, fontWeight: '600' },
  toggle: { color: '#00897b', fontSize: 14 },
  input: {
    backgroundColor: '#f5f6f8', borderRadius: 8, borderWidth: 1,
    borderColor: '#dde5e3', padding: 12, minHeight: 48, fontSize: 16, color: '#222',
  },
});
