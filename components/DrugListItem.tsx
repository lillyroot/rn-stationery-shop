import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drug';
import { useCartStore } from '../stores/cartStore';
import DrugIcon from './DrugIcon';
import PrescriptionBadge from './PrescriptionBadge';

interface Props {
  drug: Drug;
  onPress: () => void;
}

export default function DrugListItem({ drug, onPress }: Props) {
  const add = useCartStore((s) => s.add);

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <DrugIcon form={drug.form} size={64} />
      <View style={styles.info}>
        <Text style={styles.manufacturer}>{drug.manufacturer}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {drug.name}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta}>
            {drug.form} · {drug.dosage}
          </Text>
          {drug.prescription_required && <PrescriptionBadge />}
        </View>
      </View>

      {/* stopPropagation: чтобы тап по кнопке не открывал экран препарата */}
      <Pressable
        style={styles.addBtn}
        onPress={(e) => {
          e.stopPropagation();
          add(drug);
        }}
      >
        <Text style={styles.addBtnText}>+</Text>
      </Pressable>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  info: { flex: 1, marginLeft: 12 },
  manufacturer: { fontSize: 11, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 14, fontWeight: '600', marginVertical: 2 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  meta: { fontSize: 13, fontWeight: '600', color: '#00897b' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#00897b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: { color: '#fff', fontSize: 22, lineHeight: 24, fontWeight: '700' },
});
