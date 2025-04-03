import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StockChart from '../components/StockChart';
import { RouteProp } from '@react-navigation/native';
import { Stock } from '../constants/stocks'; // Import Stock interface

// Define the route prop type
type StockDetailScreenRouteProp = RouteProp<{
  StockDetail: {
    stock: Stock;
  };
}, 'StockDetail'>;

interface StockDetailScreenProps {
  route: StockDetailScreenRouteProp;
}

const StockDetailScreen: React.FC<StockDetailScreenProps> = ({ route }) => {
  const { stock } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stockSymbol}>{stock.symbol}</Text>
        <Text style={styles.stockName}>{stock.name}</Text>
        <Text style={styles.stockPrice}>${stock.price.toFixed(2)}</Text>
        <Text style={[
          styles.stockChange,
          stock.change >= 0 ? styles.positive : styles.negative
        ]}>
          {stock.change >= 0 ? '+' : ''}
          {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
        </Text>
      </View>
      
      <View style={styles.chartContainer}>
        <StockChart data={[stock.price - 10, stock.price - 5, stock.price - 2, stock.price + 3, stock.price + 8, stock.price + 5]} />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Market Cap</Text>
          <Text style={styles.detailValue}>${stock.marketCap}B</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Volume</Text>
          <Text style={styles.detailValue}>{stock.volume}M</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>P/E Ratio</Text>
          <Text style={styles.detailValue}>{stock.peRatio.toFixed(2)}</Text>
        </View>
        {stock.dividend && (
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Dividend</Text>
            <Text style={styles.detailValue}>{stock.dividend}%</Text>
          </View>
        )}
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Day Range</Text>
          <Text style={styles.detailValue}>{stock.dayRange}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Year Range</Text>
          <Text style={styles.detailValue}>{stock.yearRange}</Text>
        </View>
      </View>
      
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>About</Text>
        <Text style={styles.aboutText}>{stock.about}</Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
          <Text style={styles.actionButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.sellButton]}>
          <Text style={styles.actionButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    padding: 16,
    paddingTop: 32,
    alignItems: 'center',
  },
  stockSymbol: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  stockName: {
    color: '#9B9B9B',
    fontSize: 16,
    marginBottom: 8,
  },
  stockPrice: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 18,
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
  chartContainer: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  detailsContainer: {
    backgroundColor: '#1C1C1C',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  aboutContainer: {
    backgroundColor: '#1C1C1C',
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
    padding: 16,
  },
  aboutTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  aboutText: {
    color: '#9B9B9B',
    fontSize: 14,
    lineHeight: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailLabel: {
    color: '#9B9B9B',
    fontSize: 16,
  },
  detailValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 16,
    marginTop: 0,
  },
  actionButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buyButton: {
    backgroundColor: '#00FF9D',
  },
  sellButton: {
    backgroundColor: '#FF3B30',
  },
  actionButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StockDetailScreen;