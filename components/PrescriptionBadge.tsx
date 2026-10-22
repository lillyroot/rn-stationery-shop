import { StyleSheet, Text, View } from 'react-native';

// Плашка «по рецепту» для рецептурных препаратов
export default function PrescriptionBadge() {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Рецепт</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fdecea',
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  text: { color: '#e53935', fontSize: 11, fontWeight: '700' },
});
