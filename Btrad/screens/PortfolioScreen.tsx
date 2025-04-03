import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Feather } from '@expo/vector-icons';

const PortfolioScreen = () => {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [watchlist, setWatchlist] = useState([
    { symbol: 'LOFC', name: 'LOLC Finance', price: 42.50, change: 1.25, changePercent: 3.03, isSriLankan: true },
    { symbol: 'COMB', name: 'Commercial Bank', price: 85.75, change: -0.75, changePercent: -0.87, isSriLankan: true },
    { symbol: 'JKH', name: 'John Keells', price: 132.00, change: 2.50, changePercent: 1.93, isSriLankan: true },
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.34, change: 2.34, changePercent: 1.35, isSriLankan: false },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 170.18, change: 5.67, changePercent: 3.45, isSriLankan: false },
  ]);

  const [portfolioStocks, setPortfolioStocks] = useState([
    { symbol: 'LOFC', name: 'LOLC Finance', shares: 150, avgPrice: 38.20, currentPrice: 42.50, change: 645.00, changePercent: 11.26 },
    { symbol: 'COMB', name: 'Commercial Bank', shares: 80, avgPrice: 82.50, currentPrice: 85.75, change: 260.00, changePercent: 3.94 },
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 168.90, currentPrice: 175.34, change: 64.40, changePercent: 3.81 },
  ]);

  const totalBalance = 12456.78;
  const todayChange = { amount: 245.67, percent: 2.01 };
  const allTimeChange = { amount: 3245.89, percent: 35.2 };

  const toggleWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(stock => stock.symbol !== symbol));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Your Investments</Text>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={24} color="#00FF9D" />
          </TouchableOpacity>
        </View>
        
        {/* Balance Summary */}
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Portfolio Value</Text>
          <Text style={styles.balanceAmount}>LKR {totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
          
          <View style={styles.changeRow}>
            <View style={styles.changeContainer}>
              <Text style={styles.changeLabel}>Today</Text>
              <Text style={[styles.changeAmount, todayChange.amount >= 0 ? styles.positive : styles.negative]}>
                {todayChange.amount >= 0 ? '+' : ''}{todayChange.amount.toFixed(2)} ({todayChange.percent.toFixed(2)}%)
              </Text>
            </View>
            
            <View style={styles.changeContainer}>
              <Text style={styles.changeLabel}>All Time</Text>
              <Text style={[styles.changeAmount, allTimeChange.amount >= 0 ? styles.positive : styles.negative]}>
                {allTimeChange.amount >= 0 ? '+' : ''}{allTimeChange.amount.toFixed(2)} ({allTimeChange.percent.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>
        
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'portfolio' && styles.activeTab]}
            onPress={() => setActiveTab('portfolio')}
          >
            <Text style={[styles.tabText, activeTab === 'portfolio' && styles.activeTabText]}>Portfolio</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.tabButton, activeTab === 'watchlist' && styles.activeTab]}
            onPress={() => setActiveTab('watchlist')}
          >
            <Text style={[styles.tabText, activeTab === 'watchlist' && styles.activeTabText]}>Watchlist</Text>
          </TouchableOpacity>
        </View>
        
        {/* Portfolio Content */}
        {activeTab === 'portfolio' ? (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Your Holdings</Text>
            
            {portfolioStocks.map((stock, index) => (
              <View key={index} style={styles.stockCard}>
                <View style={styles.stockHeader}>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockName}>{stock.name}</Text>
                  </View>
                  <Text style={[styles.stockPrice, stock.change >= 0 ? styles.positive : styles.negative]}>
                    LKR {stock.currentPrice.toFixed(2)}
                  </Text>
                </View>
                
                <View style={styles.stockDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Shares</Text>
                    <Text style={styles.detailValue}>{stock.shares}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Avg Cost</Text>
                    <Text style={styles.detailValue}>LKR {stock.avgPrice.toFixed(2)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Value</Text>
                    <Text style={styles.detailValue}>LKR {(stock.shares * stock.currentPrice).toFixed(2)}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Profit/Loss</Text>
                    <Text style={[styles.detailValue, stock.change >= 0 ? styles.positive : styles.negative]}>
                      LKR {stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                    </Text>
                  </View>
                </View>
                
                <View style={styles.stockActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionText}>Sell</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.contentSection}>
            <Text style={styles.sectionTitle}>Your Watchlist</Text>
            
            {watchlist.map((stock, index) => (
              <View key={index} style={[styles.watchlistCard, stock.isSriLankan && styles.sriLankanHighlight]}>
                <View style={styles.watchlistHeader}>
                  <View style={styles.stockInfo}>
                    <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                    <Text style={styles.stockName}>{stock.name}</Text>
                    {stock.isSriLankan && (
                      <View style={styles.sriLankanBadge}>
                        <Text style={styles.badgeText}>LKR</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity onPress={() => toggleWatchlist(stock.symbol)}>
                    <Ionicons name="close" size={20} color="#9B9B9B" />
                  </TouchableOpacity>
                </View>
                
                <View style={styles.priceRow}>
                  <Text style={styles.stockPrice}>LKR {stock.price.toFixed(2)}</Text>
                  <Text style={[styles.stockChange, stock.change >= 0 ? styles.positive : styles.negative]}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                  </Text>
                </View>
                
                <View style={styles.watchlistFooter}>
                  <TouchableOpacity style={styles.smallActionButton}>
                    <Text style={styles.smallActionText}>View</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.smallActionButton, styles.buyButton]}>
                    <Text style={[styles.smallActionText, styles.buyText]}>Buy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            
            <TouchableOpacity style={styles.addButton}>
              <MaterialCommunityIcons name="plus" size={20} color="#00FF9D" />
              <Text style={styles.addButtonText}>Add to Watchlist</Text>
            </TouchableOpacity>
          </View>
        )}
        
        {/* Sri Lankan Market Highlights */}
        <View style={styles.contentSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Sri Lankan Market</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsContainer}>
            <View style={styles.highlightCard}>
              <Text style={styles.highlightTitle}>ASPI</Text>
              <Text style={styles.highlightValue}>8,800.00</Text>
              <Text style={[styles.highlightChange, styles.positive]}>+1.2%</Text>
            </View>
            
            <View style={styles.highlightCard}>
              <Text style={styles.highlightTitle}>S&P SL20</Text>
              <Text style={styles.highlightValue}>3,245.50</Text>
              <Text style={[styles.highlightChange, styles.positive]}>+0.8%</Text>
            </View>
            
            <View style={styles.highlightCard}>
              <Text style={styles.highlightTitle}>Turnover</Text>
              <Text style={styles.highlightValue}>LKR 2.1B</Text>
              <Text style={styles.highlightChange}>-</Text>
            </View>
            
            <View style={styles.highlightCard}>
              <Text style={styles.highlightTitle}>Volume</Text>
              <Text style={styles.highlightValue}>45.2M</Text>
              <Text style={[styles.highlightChange, styles.positive]}>+12%</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 32,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  settingsButton: {
    padding: 4,
  },
  balanceContainer: {
    backgroundColor: '#1C1C1C',
    margin: 16,
    padding: 20,
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
  changeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  changeContainer: {
    flex: 1,
  },
  changeLabel: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 4,
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
  tabContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#00FF9D',
  },
  tabText: {
    color: '#9B9B9B',
    fontSize: 16,
    fontWeight: '500',
  },
  activeTabText: {
    color: '#00FF9D',
  },
  contentSection: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#00FF9D',
    fontSize: 14,
  },
  stockCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  watchlistCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sriLankanHighlight: {
    borderLeftWidth: 4,
    borderLeftColor: '#00FF9D',
  },
  stockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  watchlistHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  stockName: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  stockPrice: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  stockChange: {
    fontSize: 14,
  },
  stockDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    color: '#9B9B9B',
    fontSize: 14,
  },
  detailValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  stockActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#2A2A2A',
  },
  actionText: {
    color: '#fff',
    fontWeight: '500',
  },
  watchlistFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  smallActionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    marginLeft: 8,
    backgroundColor: '#2A2A2A',
  },
  buyButton: {
    backgroundColor: 'rgba(0, 255, 157, 0.2)',
  },
  smallActionText: {
    color: '#fff',
    fontSize: 12,
  },
  buyText: {
    color: '#00FF9D',
  },
  sriLankanBadge: {
    backgroundColor: 'rgba(0, 255, 157, 0.2)',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#00FF9D',
    fontSize: 10,
    fontWeight: '500',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#00FF9D',
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: '#00FF9D',
    marginLeft: 8,
    fontWeight: '500',
  },
  highlightsContainer: {
    marginTop: 8,
  },
  highlightCard: {
    width: 120,
    backgroundColor: '#1C1C1C',
    borderRadius: 8,
    padding: 12,
    marginRight: 12,
  },
  highlightTitle: {
    color: '#9B9B9B',
    fontSize: 14,
    marginBottom: 8,
  },
  highlightValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  highlightChange: {
    fontSize: 14,
  },
});

export default PortfolioScreen;