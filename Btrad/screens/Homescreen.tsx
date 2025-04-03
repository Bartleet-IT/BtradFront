import { useNavigation } from '@react-navigation/native';
import { MainTabParamList } from '../navigation/types'; // Import your tab param types
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StockList from '../components/StockList';
import StockChart from '../components/StockChart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<any, any>;

// Mock ASPI data (in a real app, you'd fetch this from an API)
const aspiData = [8500, 8550, 8530, 8600, 8650, 8620, 8700, 8750, 8720, 8800];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* App Header */}
        <View style={styles.appHeader}>
          <Text style={styles.appTitle}>Btrad</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="bell-outline" size={24} color="#00FF9D" />
          </TouchableOpacity>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Welcome back, Investor!</Text>
          <Text style={styles.welcomeText}>
            Your portfolio is up 2.3% this week. Keep up the good work!
          </Text>
          <TouchableOpacity 
  style={styles.viewPortfolioButton}
  onPress={() => navigation.navigate('Portfolio')} // Make sure 'Portfolio' matches your screen name
>
  <Text style={styles.buttonText}>View Portfolio</Text>
</TouchableOpacity></View>

        {/* ASPI Live Chart */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Colombo Stock Exchange (ASPI)</Text>
            <Text style={styles.liveBadge}>
              <View style={styles.liveDot} /> LIVE
            </Text>
          </View>
          <StockChart data={aspiData} />
          <View style={styles.aspiInfo}>
            <View>
              <Text style={styles.aspiLabel}>Current</Text>
              <Text style={styles.aspiValue}>8,800.00</Text>
            </View>
            <View>
              <Text style={styles.aspiLabel}>Today's Change</Text>
              <Text style={[styles.aspiValue, styles.positiveChange]}>+80.00 (0.92%)</Text>
            </View>
          </View>
        </View>

        {/* Existing Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Movers</Text>
          <StockList navigation={navigation} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market News</Text>
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
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  appTitle: {
    color: '#00FF9D',
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  welcomeCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    marginTop: 8,
  },
  welcomeTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  welcomeText: {
    color: '#9B9B9B',
    fontSize: 14,
    marginBottom: 16,
  },
  viewPortfolioButton: {
    backgroundColor: '#00FF9D',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  chartSection: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    margin: 16,
    marginTop: 0,
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 12,
  },
  liveBadge: {
    color: '#00FF9D',
    fontSize: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF9D',
    marginRight: 4,
  },
  aspiInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  aspiLabel: {
    color: '#9B9B9B',
    fontSize: 12,
  },
  aspiValue: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
  },
  positiveChange: {
    color: '#00FF9D',
  },
  section: {
    marginBottom: 24,
  },
});