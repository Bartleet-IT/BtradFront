import { useNavigation } from '@react-navigation/native';
import { MainTabParamList } from '../navigation/types';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import StockList from '../components/StockList';
import StockChart from '../components/StockChart';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';

type HomeScreenProps = NativeStackScreenProps<any, any>;

interface ChartDataPoint {
  d: number; // timestamp
  v: number; // value
  pc: number | null; // previous close
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [aspiData, setAspiData] = useState<number[]>([]);
  const [currentValue, setCurrentValue] = useState<number>(8800);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch real-time ASPI data from CSE API
  const fetchASPI = async () => {
    try {
      setLoading(true);
  
      // Prepare form data
      const formData = new URLSearchParams();
      formData.append("chartId", "1");
      formData.append("period", "1");
  
      // Send POST request
      const response = await axios.post<ChartDataPoint[]>(
        "https://www.cse.lk/api/chartData",
        formData.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Accept": "application/json",
          },
        }
      );
  
      const apiData = response.data;
  
      if (apiData && apiData.length > 0) {
        const values = apiData.map((item) => item.v);
        setAspiData(values);
        setCurrentValue(values[values.length - 1]);
        setError(null);
      }
    } catch (err) {
      console.error("Error fetching ASPI data:", err);
      setError("Failed to load market data. Showing sample data.");
      setAspiData([8500, 8550, 8530, 8600, 8650, 8620, 8700, 8750, 8720, 8800]);
      setCurrentValue(8800);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchASPI();
    const interval = setInterval(fetchASPI, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);
  

  // Calculate daily change
  const calculateChange = () => {
    if (aspiData.length < 2) return { value: 80, percent: 0.92 }; // Default values
    
    const firstValue = aspiData[0];
    const changeValue = currentValue - firstValue;
    const changePercent = (changeValue / firstValue) * 100;
    
    return {
      value: changeValue,
      percent: changePercent
    };
  };

  const change = calculateChange();

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
          <Text style={styles.welcomeTitle}>Welcome back, Eshantha!</Text>
          <Text style={styles.welcomeText}>
            Let's start trading
          </Text>
          <TouchableOpacity 
            style={styles.viewPortfolioButton}
            onPress={() => navigation.navigate('Portfolio')}
          >
            <Text style={styles.buttonText}>View Portfolio</Text>
          </TouchableOpacity>
        </View>

        {/* ASPI Live Chart */}
        <View style={styles.chartSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Colombo Stock Exchange (ASPI)</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.liveDot} />
              <Text style={styles.liveBadge}>LIVE</Text>
            </View>
          </View>
          
          {loading ? (
            <ActivityIndicator color="#00FF9D" size="large" style={styles.loader} />
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : (
            <>
              <StockChart data={aspiData} />
              <View style={styles.aspiInfo}>
                <View>
                  <Text style={styles.aspiLabel}>Current</Text>
                  <Text style={styles.aspiValue}>{currentValue.toFixed(2)}</Text>
                </View>
                <View>
                  <Text style={styles.aspiLabel}>Today's Change</Text>
                  <Text style={[
                    styles.aspiValue,
                    change.value >= 0 ? styles.positiveChange : styles.negativeChange
                  ]}>
                    {change.value >= 0 ? '+' : ''}{change.value.toFixed(2)} ({change.percent.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>

        {/* Today's Movers */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Movers</Text>
          <StockList navigation={navigation} />
        </View>
        
        {/* Market News */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market News</Text>
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>ASPI Reaches All-Time High</Text>
            <Text style={styles.newsText}>
              The Colombo Stock Exchange main index gained 1.2% today, reaching record levels.
            </Text>
          </View>
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>New Banking Regulations</Text>
            <Text style={styles.newsText}>
              Central Bank announces new measures to stabilize financial markets.
            </Text>
          </View>
          <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>Tech Sector Growth</Text>
            <Text style={styles.newsText}>
              Local tech companies report 15% revenue increase in Q2.
            </Text>
          </View>
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
    marginLeft: 4,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00FF9D',
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
  negativeChange: {
    color: '#FF3B30',
  },
  section: {
    marginBottom: 24,
  },
  newsItem: {
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  newsTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsText: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  loader: {
    marginVertical: 40,
  },
  errorText: {
    color: '#FF3B30',
    textAlign: 'center',
    marginVertical: 20,
  },
});