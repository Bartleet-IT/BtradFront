import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import StockList from '../components/StockList';

import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<any, any>;

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Feed</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Movers</Text>
          <StockList navigation={navigation} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>News</Text>
          {/* News items would go here */}
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