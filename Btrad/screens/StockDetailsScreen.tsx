import React from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import StockChart from '../components/StockChart';
import { RouteProp } from '@react-navigation/native';
import { Stock } from '../services/stockService'; // Updated import path
import Toast from 'react-native-toast-message'; // ✅ Import Toast

type StockDetailScreenRouteProp = RouteProp<{ StockDetail: { stock: Stock } }, 'StockDetail'>;

interface StockDetailScreenProps {
  route: StockDetailScreenRouteProp;
}

const StockDetailScreen: React.FC<StockDetailScreenProps> = ({ route }) => {
  const { stock } = route.params;

  const lastUpdated = new Date(stock.tradesTime).toLocaleTimeString();
  const dayRange = `${stock.low.toFixed(2)} - ${stock.high.toFixed(2)}`;
  const chartData = [stock.open, (stock.open + stock.lastTradedPrice) / 2, stock.lastTradedPrice, stock.high, stock.low];

  // ✅ Function to Show Toast
  const showToast = (message: string) => {
    Toast.show({
      type: 'success',
      text1: message,
      position: 'bottom',
      visibilityTime: 1500, // 1.5 seconds
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.stockSymbol}>{stock.symbol.replace('.N0000', '')}</Text>
        <Text style={styles.stockPrice}>{stock.lastTradedPrice.toFixed(2)} LKR</Text>
        <Text style={[styles.stockChange, stock.change >= 0 ? styles.positive : styles.negative]}>
          {stock.change >= 0 ? '+' : ''}
          {stock.change.toFixed(2)} ({stock.changePercentage.toFixed(2)}%)
        </Text>
        <Text style={styles.lastUpdated}>Last updated: {lastUpdated}</Text>
      </View>
      
      <View style={styles.chartContainer}>
        <StockChart data={chartData} />
      </View>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Open</Text><Text style={styles.detailValue}>{stock.open.toFixed(2)}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>High</Text><Text style={styles.detailValue}>{stock.high.toFixed(2)}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Low</Text><Text style={styles.detailValue}>{stock.low.toFixed(2)}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Day Range</Text><Text style={styles.detailValue}>{dayRange}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Volume</Text><Text style={styles.detailValue}>{stock.quantity.toLocaleString()}</Text></View>
        <View style={styles.detailRow}><Text style={styles.detailLabel}>Crossing Volume</Text><Text style={styles.detailValue}>{stock.crossingVolume.toLocaleString()}</Text></View>
      </View>
      
      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Stock Information</Text>
        <Text style={styles.aboutText}>
          {stock.symbol} is traded on the Colombo Stock Exchange. 
          Last traded at {stock.lastTradedPrice.toFixed(2)} LKR with a change of 
          {stock.change >= 0 ? ' +' : ' '}{stock.change.toFixed(2)} (
          {stock.changePercentage.toFixed(2)}%) from previous close.
        </Text>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={[styles.actionButton, styles.buyButton]} onPress={() => showToast('✅ Stock Bought!')}>
          <Text style={styles.actionButtonText}>Buy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.sellButton]} onPress={() => showToast('❌ Stock Sold!')}>
          <Text style={styles.actionButtonText}>Sell</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Render Toast */}
      <Toast />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { padding: 16, paddingTop: 32, alignItems: 'center' },
  stockSymbol: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  stockPrice: { color: '#fff', fontSize: 32, fontWeight: 'bold', marginVertical: 8 },
  stockChange: { fontSize: 18, marginBottom: 8 },
  lastUpdated: { color: '#9B9B9B', fontSize: 12 },
  positive: { color: '#00FF9D' },
  negative: { color: '#FF3B30' },
  chartContainer: { marginVertical: 16, paddingHorizontal: 16, height: 200 },
  detailsContainer: { backgroundColor: '#1C1C1C', margin: 16, borderRadius: 12, padding: 16 },
  aboutContainer: { backgroundColor: '#1C1C1C', margin: 16, marginTop: 0, borderRadius: 12, padding: 16 },
  aboutTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  aboutText: { color: '#9B9B9B', fontSize: 14, lineHeight: 20 },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  detailLabel: { color: '#9B9B9B', fontSize: 16 },
  detailValue: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  actionsContainer: { flexDirection: 'row', justifyContent: 'space-between', margin: 16, marginTop: 0 },
  actionButton: { flex: 1, padding: 16, borderRadius: 8, alignItems: 'center', marginHorizontal: 8 },
  buyButton: { backgroundColor: '#00FF9D' },
  sellButton: { backgroundColor: '#FF3B30' },
  actionButtonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
});

export default StockDetailScreen;
