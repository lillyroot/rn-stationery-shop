import { StyleSheet, Text, View } from 'react-native';
import {
  selectCartCount,
  selectCartPositions,
  selectPrescriptionCount,
  useCartStore,
} from '../stores/cartStore';

export default function CartSummary() {
  const positions = useCartStore(selectCartPositions);
  const count = useCartStore(selectCartCount);
  const prescriptionCount = useCartStore(selectPrescriptionCount);

  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Text style={styles.label}>Препаратов</Text>
        <Text style={styles.value}>{positions}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalLabel}>Всего упаковок</Text>
        <Text style={styles.totalValue}>{count}</Text>
      </View>
      {prescriptionCount > 0 && (
        <Text style={styles.warning}>
          Для {prescriptionCount} поз. нужен рецепт врача — возьмите его с
          собой при получении.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  label: { fontSize: 14, color: '#666' },
  value: { fontSize: 14, fontWeight: '600' },
  totalLabel: { fontSize: 16, fontWeight: '700' },
  totalValue: { fontSize: 18, fontWeight: '800', color: '#00897b' },
  warning: {
    marginTop: 6,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fdecea',
    color: '#c62828',
    fontSize: 13,
  },
});
