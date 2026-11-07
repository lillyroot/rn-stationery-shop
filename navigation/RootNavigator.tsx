import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import DrugListScreen from '../screens/DrugListScreen';
import DrugDetailsScreen from '../screens/DrugDetailsScreen';
import CartScreen from '../screens/CartScreen';
import HeaderCartButton from '../components/HeaderCartButton';
import SignOutButton from '../components/SignOutButton';
import { StyleSheet, View } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AccountActions() {
  return (
    <View style={styles.actions}>
      <HeaderCartButton />
      <SignOutButton />
    </View>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: '#00897b' }}>
        <Stack.Screen
          name="DrugList"
          component={DrugListScreen}
          options={{
            title: 'Аптека',
            headerRight: () => <AccountActions />,
          }}
        />
        <Stack.Screen
          name="DrugDetails"
          component={DrugDetailsScreen}
          options={{
            title: 'Препарат',
            headerRight: () => <AccountActions />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Корзина', headerRight: () => <SignOutButton /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8 },
});
