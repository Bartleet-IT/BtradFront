import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeScreen from '../screens/Homescreen';
import MarketsScreen from '../screens/MarketScreen';
import PortfolioScreen from '../screens/PortfolioScreen';
import AccountScreen from '../screens/AccountScreen';
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <TabBarIcon route={route} focused={focused} />
        ),
        tabBarLabel: ({ focused }) => {
          let label;
          switch (route.name) {
            case 'Home': label = 'Home'; break;
            case 'Markets': label = 'Markets'; break;
            case 'Portfolio': label = 'Portfolio'; break;
            case 'Account': label = 'Account'; break;
          }
          return (
            <Text style={{
              color: focused ? '#00FF9D' : '#9B9B9B',
              fontSize: 12,
              marginBottom: 4,
            }}>
              {label}
            </Text>
          );
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#1C1C1C',
          paddingTop: 8,
          paddingBottom: insets.bottom > 0 ? insets.bottom + 8 : 16,
          height: 60 + insets.bottom,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Markets" component={MarketsScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}