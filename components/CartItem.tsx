import { Pressable, StyleSheet, Text, View } from 'react-native';
import { CartLine } from '../types/drug';
import { useCartStore } from '../stores/cartStore';
import DrugIcon from './DrugIcon';
import PrescriptionBadge from './PrescriptionBadge';

export default function CartItem({ line }: { line: CartLine }) {
  const { drug, quantity } = line;
  const remove = useCartStore((s) => s.remove);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);

  // Больше, чем есть в наличии, добавить нельзя
  const atMax = quantity >= drug.stock;

  return (
    <View style={styles.row}>
      <DrugIcon form={drug.form} size={72} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {drug.name}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {drug.form} · {drug.dosage}
          </Text>
          {drug.prescription_required && <PrescriptionBadge />}
        </View>

        <View style={styles.controls}>
          <Pressable style={styles.qtyBtn} onPress={() => decrement(drug.id)}>
            <Text style={styles.qtyText}>−</Text>
          </Pressable>
          <Text style={styles.qty}>{quantity}</Text>
          <Pressable
            style={[styles.qtyBtn, atMax && styles.qtyBtnDisabled]}
            disabled={atMax}
            onPress={() => increment(drug.id)}
          >
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
          <Pressable onPress={() => remove(drug.id)} style={styles.remove}>
            <Text style={styles.removeText}>Удалить</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
  },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 },
  meta: { fontSize: 13, color: '#00897b', fontWeight: '600' },
  controls: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e0f2f1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnDisabled: { opacity: 0.4 },
  qtyText: { fontSize: 18, fontWeight: '700', color: '#00897b' },
  qty: { fontSize: 16, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  remove: { marginLeft: 'auto' },
  removeText: { color: '#e53935', fontSize: 13 },
});
