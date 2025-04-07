import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainTabNavigator from './MainTabNavigator';
import StockDetailScreen from '../screens/StockDetailsScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000' },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabNavigator} />
      {/* <Stack.Screen 
        name="StockDetail" 
        component={StockDetailScreen} 
        options={{
          headerShown: true,
          headerTitle: '',
          headerStyle: { backgroundColor: '#000' },
          headerTintColor: '#fff',
          headerBackVisible: false,
        }}
      /> */}
    </Stack.Navigator>
  ); 
}