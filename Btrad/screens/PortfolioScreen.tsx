import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function PortfolioScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Portfolio</Text>
        </View>
        
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>$12,456.78</Text>
          <Text style={styles.balanceChange}>+$245.67 (2.01%) today</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Stocks</Text>
          {/* Portfolio stocks would go here */}
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
  balanceContainer: {
    backgroundColor: '#1C1C1C',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  balanceLabel: {
    color: '#9B9B9B',
    fontSize: 16,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  balanceChange: {
    color: '#00FF9D',
    fontSize: 16,
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