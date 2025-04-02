import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StockCard = ({ stock, onPress }: { stock: any, onPress: () => void }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.leftContainer}>
        <MaterialCommunityIcons 
          name="chart-line" 
          size={24} 
          color="#00FF9D" 
          style={styles.icon}
        />
        <View>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>
      </View>
      
      <View style={styles.rightContainer}>
        <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
        <Text style={[
          styles.change,
          stock.change >= 0 ? styles.positive : styles.negative
        ]}>
          {stock.change >= 0 ? '+' : ''}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 12,
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
  rightContainer: {
    alignItems: 'flex-end',
  },
  price: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  change: {
    fontSize: 14,
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
});

export default StockCard;