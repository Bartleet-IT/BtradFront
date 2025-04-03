import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Stock } from '../services/stockService';

interface StockCardProps {
  stock: Stock;
  onPress: () => void;
}

const StockCard = ({ stock, onPress }: StockCardProps) => {
  const isPositive = stock.change >= 0;

  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.name}>{stock.lastTradedPrice.toFixed(2)} LKR</Text>
        </View>
        <View style={styles.rightAligned}>
          <Text style={[styles.change, isPositive ? styles.positive : styles.negative]}>
            {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercentage.toFixed(2)}%)
          </Text>
          <Text style={styles.volume}>Vol: {stock.quantity.toLocaleString()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1C',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  symbol: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  name: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  rightAligned: {
    alignItems: 'flex-end',
  },
  change: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
  volume: {
    color: '#9B9B9B',
    fontSize: 12,
  },
});

export default StockCard;