import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StockList from '../components/StockList';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../navigation/types';

// Combined navigation prop type for screens in tabs
type MarketsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Markets'>,
  StackNavigationProp<RootStackParamList>
>;

type MarketsScreenProps = {
  navigation: MarketsScreenNavigationProp;
};

export default function MarketsScreen({ navigation }: MarketsScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Markets</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>US Markets</Text>
          <StockList navigation={navigation} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Crypto</Text>
          {/* Crypto list would go here */}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    paddingTop: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
});