import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

// В моках нет картинок — показываем иконку по форме выпуска
const FORM_ICONS: Record<string, string> = {
  Таблетки: '💊',
  Капсулы: '💊',
  Сироп: '🥄',
  Гель: '🧴',
  Раствор: '🧪',
  Капли: '💧',
};

interface Props {
  form: string;
  size: number;
  style?: StyleProp<ViewStyle>;
}

export default function DrugIcon({ form, size, style }: Props) {
  return (
    <View style={[styles.wrap, { width: size, height: size }, style]}>
      <Text style={{ fontSize: size / 2 }}>{FORM_ICONS[form] ?? '💊'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 8,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
