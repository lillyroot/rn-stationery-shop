import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import DrugListScreen from '../screens/DrugListScreen';
import DrugDetailsScreen from '../screens/DrugDetailsScreen';
import CartScreen from '../screens/CartScreen';
import HeaderCartButton from '../components/HeaderCartButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTintColor: '#00897b' }}>
        <Stack.Screen
          name="DrugList"
          component={DrugListScreen}
          options={{
            title: 'Аптека',
            headerRight: () => <HeaderCartButton />,
          }}
        />
        <Stack.Screen
          name="DrugDetails"
          component={DrugDetailsScreen}
          options={{
            title: 'Препарат',
            headerRight: () => <HeaderCartButton />,
          }}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={{ title: 'Корзина' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
