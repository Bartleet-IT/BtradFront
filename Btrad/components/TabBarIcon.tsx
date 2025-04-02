import React from 'react';
import { View } from 'react-native';
import { MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';

export default function TabBarIcon({ route, focused }: { route: { name: string }; focused: boolean }) {
  const iconColor = focused ? '#00FF9D' : '#9B9B9B';
  const iconSize = 24;

  switch (route.name) {
    case 'Home':
      return <Feather name="home" size={iconSize} color={iconColor} />;
    case 'Markets':
      return <MaterialCommunityIcons name="chart-line" size={iconSize} color={iconColor} />;
    case 'Portfolio':
      return <FontAwesome name="pie-chart" size={iconSize} color={iconColor} />;
    case 'Account':
      return <Feather name="user" size={iconSize} color={iconColor} />;
    default:
      return null;
  }
}