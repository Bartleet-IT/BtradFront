import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

interface MarketIndexData {
  value: number;
  change: number;
  percentage: number;
  highValue: number;
  lowValue: number;
  timestamp?: number;
}

const MarketIndexCard = () => {
  const [aspiData, setAspiData] = useState<MarketIndexData | null>(null);
  const [snpData, setSnpData] = useState<MarketIndexData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMarketData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch both APIs in parallel
      const [aspiResponse, snpResponse] = await Promise.all([
        axios.post<MarketIndexData>('https://www.cse.lk/api/aspiData'),
        axios.post<MarketIndexData>('https://www.cse.lk/api/snpData')
      ]);

      setAspiData({
        value: aspiResponse.data.value,
        change: aspiResponse.data.change,
        percentage: aspiResponse.data.percentage,
        highValue: aspiResponse.data.highValue,
        lowValue: aspiResponse.data.lowValue,
        timestamp: aspiResponse.data.timestamp
      });

      setSnpData({
        value: snpResponse.data.value,
        change: snpResponse.data.change,
        percentage: snpResponse.data.percentage,
        highValue: snpResponse.data.highValue,
        lowValue: snpResponse.data.lowValue,
        timestamp: snpResponse.data.timestamp
      });

    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to load market data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    
    // Set up refresh interval (every 2 minutes)
    const interval = setInterval(fetchMarketData, 120000);
    
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={[styles.card, styles.loadingContainer]}>
        <ActivityIndicator size="small" color="#00FF9D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!aspiData || !snpData) {
    return null;
  }

  // Format timestamp to readable time
  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.card}>
      {/* Last updated time */}
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>
          Updated: {formatTime(aspiData.timestamp || snpData.timestamp)}
        </Text>
      </View>

      {/* ASPI Column */}
      <View style={styles.column}>
        <Text style={styles.indexName}>ASPI</Text>
        <Text style={styles.indexValue}>{aspiData.value.toFixed(2)}</Text>
        <View style={styles.changeContainer}>
          <Text style={[
            styles.changeText,
            aspiData.change >= 0 ? styles.positive : styles.negative
          ]}>
            {aspiData.change >= 0 ? '+' : ''}{aspiData.change.toFixed(2)} ({aspiData.percentage.toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeLabel}>Day Range</Text>
          <Text style={styles.rangeValue}>
            {aspiData.lowValue.toFixed(2)} - {aspiData.highValue.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* S&P Column */}
      <View style={styles.column}>
        <Text style={styles.indexName}>S&P SL20</Text>
        <Text style={styles.indexValue}>{snpData.value.toFixed(2)}</Text>
        <View style={styles.changeContainer}>
          <Text style={[
            styles.changeText,
            snpData.change >= 0 ? styles.positive : styles.negative
          ]}>
            {snpData.change >= 0 ? '+' : ''}{snpData.change.toFixed(2)} ({snpData.percentage.toFixed(2)}%)
          </Text>
        </View>
        <View style={styles.rangeContainer}>
          <Text style={styles.rangeLabel}>Day Range</Text>
          <Text style={styles.rangeValue}>
            {snpData.lowValue.toFixed(2)} - {snpData.highValue.toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative', // For absolute positioning of time
  },
  timeContainer: {
    position: 'absolute',
    top: 8,
    left: 16,
  },
  timeText: {
    color: '#9B9B9B',
    fontSize: 10,
  },
  column: {
    flex: 1,
    alignItems: 'center',
    marginTop: 12, // Make space for time text
  },
  divider: {
    width: 1,
    backgroundColor: '#2A2A2A',
    marginHorizontal: 8,
  },
  indexName: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  indexValue: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  changeContainer: {
    marginBottom: 12,
  },
  changeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
  rangeContainer: {
    alignItems: 'center',
  },
  rangeLabel: {
    color: '#9B9B9B',
    fontSize: 10,
    marginBottom: 2,
  },
  rangeValue: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 80,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
  },
});

export default MarketIndexCard;