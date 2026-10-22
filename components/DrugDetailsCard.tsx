import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Drug } from '../types/drug';
import DrugIcon from './DrugIcon';
import PrescriptionBadge from './PrescriptionBadge';

// Одна строка в таблице характеристик: «название — значение»
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function DrugDetailsCard({ drug }: { drug: Drug }) {
  return (
    <ScrollView contentContainerStyle={styles.wrap}>
      <DrugIcon form={drug.form} size={200} style={styles.icon} />
      <Text style={styles.manufacturer}>{drug.manufacturer}</Text>
      <Text style={styles.name}>{drug.name}</Text>
      <Text style={styles.latin}>{drug.latin_name}</Text>
      <Text style={styles.category}>{drug.category}</Text>
      {drug.prescription_required && <PrescriptionBadge />}

      <View style={styles.info}>
        <InfoRow label="Действующее вещество" value={drug.active_substance} />
        <InfoRow label="Форма выпуска" value={drug.form} />
        <InfoRow label="Дозировка" value={drug.dosage} />
        <InfoRow
          label="Отпуск"
          value={drug.prescription_required ? 'По рецепту' : 'Без рецепта'}
        />
      </View>

      <Text style={styles.stock}>В наличии: {drug.stock} уп.</Text>
      <Text style={styles.desc}>{drug.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrap: { padding: 20, paddingBottom: 40 },
  icon: { width: '100%', borderRadius: 16, marginBottom: 16 },
  manufacturer: { fontSize: 12, color: '#888', textTransform: 'uppercase' },
  name: { fontSize: 22, fontWeight: '700', marginTop: 6 },
  latin: { fontSize: 14, color: '#888', fontStyle: 'italic', marginBottom: 6 },
  category: { fontSize: 13, color: '#999', marginBottom: 8 },
  info: {
    marginTop: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#f5f6f8',
    gap: 8,
  },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 12 },
  infoLabel: { fontSize: 14, color: '#666' },
  infoValue: { flexShrink: 1, fontSize: 14, fontWeight: '600', textAlign: 'right' },
  stock: { fontSize: 13, color: '#4caf50', marginBottom: 16 },
  desc: { fontSize: 15, lineHeight: 22, color: '#333' },
});
