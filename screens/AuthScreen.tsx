import { useEffect, useState } from 'react';
import {
  ActivityIndicator, KeyboardAvoidingView, Platform, Pressable,
  ScrollView, StyleSheet, Text, TextInput, View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { makeRedirectUri, ResponseType, useAuthRequest } from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import * as ScreenCapture from 'expo-screen-capture';
import { useAuth } from '../auth/AuthContext';
import PasswordField from '../components/PasswordField';

WebBrowser.maybeCompleteAuthSession();

const github = { authorizationEndpoint: 'https://github.com/login/oauth/authorize' };

export default function AuthScreen() {
  const { signIn } = useAuth();
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [message, setMessage] = useState('');
  const [pending, setPending] = useState(false);
  const clientId = process.env.EXPO_PUBLIC_GITHUB_CLIENT_ID ?? '';
  const [request, , promptAsync] = useAuthRequest({
    clientId,
    redirectUri: makeRedirectUri({ scheme: 'marina-pharmacy', path: 'auth' }),
    responseType: ResponseType.Code,
    scopes: [],
  }, github);

  useEffect(() => {
    if (Platform.OS === 'web') return;
    ScreenCapture.preventScreenCaptureAsync('auth').catch(() => {
      setMessage('Не удалось включить защиту скриншотов на этом устройстве.');
    });
    return () => {
      ScreenCapture.allowScreenCaptureAsync('auth').catch(console.error);
    };
  }, []);

  async function submitCredentials() {
    if (pending) return;
    setMessage('');
    if (credentials.login.trim() !== 'admin' || credentials.password !== 'password') {
      setMessage('Проверьте логин и пароль.');
      return;
    }
    setPending(true);
    try {
      await signIn('marina-demo-session');
    } catch {
      setMessage('Не удалось сохранить вход на устройстве.');
    } finally {
      setPending(false);
    }
  }

  async function openGitHub() {
    if (pending) return;
    setMessage('');
    if (!clientId) {
      setMessage('Для GitHub укажите Client ID в .env.local. Пока доступен тестовый вход.');
      return;
    }
    setPending(true);
    try {
      const result = await promptAsync();
      if (result.type === 'cancel' || result.type === 'dismiss') return;
      if (result.type !== 'success' || !result.params.code) {
        setMessage('GitHub не подтвердил вход. Попробуйте ещё раз.');
        return;
      }
      await signIn(result.params.code);
    } catch {
      setMessage('Не удалось завершить вход через GitHub. Попробуйте ещё раз.');
    } finally {
      setPending(false);
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView style={styles.screen} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.emblem}><Text style={styles.cross}>+</Text></View>
            <Text style={styles.title}>Личный кабинет</Text>
            <Text style={styles.subtitle}>Войдите в аптеку, чтобы собрать свой заказ</Text>
            <Text style={styles.label}>Логин</Text>
            <TextInput
              accessibilityLabel="Логин"
              style={styles.input}
              placeholder="Введите логин"
              value={credentials.login}
              onChangeText={(login) => setCredentials({ ...credentials, login })}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              editable={!pending}
            />
            <PasswordField
              value={credentials.password}
              onChangeText={(password) => setCredentials({ ...credentials, password })}
              placeholder="Введите пароль"
              editable={!pending}
              returnKeyType="go"
              onSubmitEditing={submitCredentials}
            />
            {!!message && <Text style={styles.message} accessibilityRole="alert">{message}</Text>}
            <Pressable
              accessibilityRole="button"
              onPress={submitCredentials}
              disabled={pending}
              style={[styles.primary, pending && styles.disabled]}
            >
              {pending ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Продолжить</Text>}
            </Pressable>
            <View style={styles.divider}><View style={styles.line} /><Text style={styles.or}>или</Text><View style={styles.line} /></View>
            <Pressable
              accessibilityRole="button"
              onPress={openGitHub}
              disabled={pending || (!!clientId && !request)}
              style={[styles.githubButton, (pending || (!!clientId && !request)) && styles.disabled]}
            >
              <Text style={styles.githubText}>Войти с GitHub</Text>
            </Pressable>
          </View>
          <Text style={styles.demo}>Для проверки: admin / password</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f5f6f8' },
  content: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 24, width: '100%', maxWidth: 420, alignSelf: 'center' },
  emblem: { backgroundColor: '#e0f2ef', borderRadius: 12, width: 48, height: 48, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' },
  cross: { fontSize: 36, color: '#00897b', lineHeight: 40, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginTop: 16 },
  subtitle: { fontSize: 14, lineHeight: 20, color: '#666', textAlign: 'center', marginTop: 8, marginBottom: 24 },
  label: { color: '#444', fontSize: 14, fontWeight: '600', marginBottom: 8 },
  input: { backgroundColor: '#f5f6f8', borderRadius: 8, borderWidth: 1, borderColor: '#dde5e3', padding: 12, minHeight: 48, fontSize: 16, color: '#222', marginBottom: 16 },
  message: { color: '#c62828', fontSize: 13, lineHeight: 18, marginTop: 12 },
  primary: { marginTop: 20, backgroundColor: '#00897b', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 20, gap: 12 },
  line: { flex: 1, height: 1, backgroundColor: '#eee' },
  or: { color: '#888', fontSize: 13 },
  githubButton: { borderWidth: 1, borderColor: '#24292f', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  githubText: { color: '#24292f', fontSize: 16, fontWeight: '600' },
  disabled: { opacity: 0.5 },
  demo: { color: '#666', fontSize: 13, textAlign: 'center', marginTop: 20 },
});
