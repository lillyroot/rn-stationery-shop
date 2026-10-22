import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fetchDrugs } from '../api/mockDrugsAPI';
import { Drug } from '../types/drug';
import { RootStackParamList } from '../types/navigation';
import DrugListItem from '../components/DrugListItem';
import EmptyState from '../components/EmptyState';

type Nav = NativeStackNavigationProp<RootStackParamList, 'DrugList'>;

export default function DrugListScreen() {
  const navigation = useNavigation<Nav>();
  const [drugs, setDrugs] = useState<Drug[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchDrugs();
        if (alive) setDrugs(data);
      } catch (e) {
        if (alive) setError('Не удалось загрузить препараты');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00897b" />
        <Text style={styles.hint}>Загружаем каталог…</Text>
      </View>
    );
  }

  if (error) {
    return <EmptyState title="Ошибка" subtitle={error} />;
  }

  if (drugs.length === 0) {
    return <EmptyState title="Каталог пуст" />;
  }

  return (
    <FlatList
      data={drugs}
      keyExtractor={(d) => d.id}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <DrugListItem
          drug={item}
          onPress={() => navigation.navigate('DrugDetails', { drugId: item.id })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  list: { paddingVertical: 6 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  hint: { marginTop: 8, color: '#666' },
});
