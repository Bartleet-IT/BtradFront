import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { stocks } from '../constants/stocks';

export default function StockList({ navigation }) {
  return (
    <View>
      {stocks.map((stock, index) => (
        <TouchableOpacity
          key={index}
          style={styles.stockItem}
          onPress={() => navigation.navigate('StockDetail', { stock })}
        >
          <View style={styles.stockLeft}>
            <MaterialCommunityIcons 
              name="chart-line" 
              size={24} 
              color="#00FF9D" 
              style={styles.stockIcon}
            />
            <View>
              <Text style={styles.stockSymbol}>{stock.symbol}</Text>
              <Text style={styles.stockName}>{stock.name}</Text>
            </View>
          </View>
          
          <View style={styles.stockRight}>
            <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
            <Text style={[
              styles.stockChange,
              stock.change >= 0 ? styles.positive : styles.negative
            ]}>
              {stock.change >= 0 ? '+' : ''}
              {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1C1C1C',
  },
  stockLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIcon: {
    marginRight: 12,
  },
  stockSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stockName: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  stockRight: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 14,
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
});