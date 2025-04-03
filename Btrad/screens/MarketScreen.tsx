import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native';
import StockList from '../components/StockList';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RootStackParamList, MainTabParamList } from '../navigation/types';
import axios from 'axios';

// Combined navigation prop type for screens in tabs
type MarketsScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<MainTabParamList, 'Markets'>,
  StackNavigationProp<RootStackParamList>
>;

type MarketsScreenProps = {
  navigation: MarketsScreenNavigationProp;
};

interface SectorData {
  id: number;
  sectorId: number;
  symbol: string;
  indexName: string;
  name: string;
  indexValue: number;
  change: number;
  percentage: number;
  sectorTradeToday: number | null;
  sectorVolumeToday: number | null;
  sectorTurnoverToday: number | null;
  transactionTime: number;
}

interface StockData {
  id: number;
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercentage: number;
}

interface MarketIndexData {
  value: number;
  change: number;
  percentage: number;
  highValue: number;
  lowValue: number;
  timestamp?: number;
}

const MarketIndicesSection = () => {
  const [sectors, setSectors] = useState<SectorData[]>([]);
  const [stocksBySector, setStocksBySector] = useState<Record<number, StockData[]>>({});
  const [aspiData, setAspiData] = useState<MarketIndexData | null>(null);
  const [snpData, setSnpData] = useState<MarketIndexData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedSector, setExpandedSector] = useState<number | null>(null);

  interface MarketIndexResponse {
    value: number;
    change: number;
    percentage: number;
    highValue: number;
    lowValue: number;
    timestamp: number;
  }
  
  const fetchMarketIndices = async () => {
    try {
      const [aspiResponse, snpResponse] = await Promise.all([
        axios.post('https://www.cse.lk/api/aspiData'),
        axios.post('https://www.cse.lk/api/snpData')
      ]);
  
      const aspiData = aspiResponse.data as MarketIndexResponse;
      const snpData = snpResponse.data as MarketIndexResponse;
  
      setAspiData({
        value: aspiData.value,
        change: aspiData.change,
        percentage: aspiData.percentage,
        highValue: aspiData.highValue,
        lowValue: aspiData.lowValue,
        timestamp: aspiData.timestamp
      });
  
      setSnpData({
        value: snpData.value,
        change: snpData.change,
        percentage: snpData.percentage,
        highValue: snpData.highValue,
        lowValue: snpData.lowValue,
        timestamp: snpData.timestamp
      });
    } catch (err) {
      console.error('Error fetching market indices:', err);
    }
  };

  const fetchSectorData = async () => {
    try {
      const sectorsResponse = await axios.post('https://www.cse.lk/api/allSectors');
      const filteredSectors = (sectorsResponse.data as SectorData[]).filter((s: SectorData) => s.sectorId !== 1 && s.sectorId !== 40);
      setSectors(filteredSectors);

      const stocksData: Record<number, StockData[]> = {};
      await Promise.all(
        filteredSectors.map(async (sector: SectorData) => {
          try {
            const response = await axios.post('https://www.cse.lk/api/listBySector', {
              sectorId: sector.sectorId
            });
            const sectorStocks = response.data as { reqIndustryBySectors: any[] };
            stocksData[sector.sectorId] = sectorStocks.reqIndustryBySectors.map((stock: any) => ({
              id: stock.id,
              name: stock.name,
              symbol: stock.symbol,
              price: stock.price,
              change: stock.change,
              changePercentage: stock.changePercentage
            }));
          } catch (err) {
            console.error(`Error fetching stocks for sector ${sector.sectorId}:`, err);
            stocksData[sector.sectorId] = [];
          }
        })
      );
      setStocksBySector(stocksData);
    } catch (err) {
      console.error('Error fetching sector data:', err);
      setError('Failed to load market data. Please try again later.');
    }
  };

  const fetchAllData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await Promise.all([
        fetchMarketIndices(),
        fetchSectorData()
      ]);
    } catch (err) {
      console.error('Error fetching all data:', err);
      setError('Failed to load market data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    
    const interval = setInterval(fetchAllData, 300000);
    return () => clearInterval(interval);
  }, []);

  const toggleSector = (sectorId: number) => {
    setExpandedSector(expandedSector === sectorId ? null : sectorId);
  };

  const formatTime = (timestamp?: number) => {
    if (!timestamp) return '--:--';
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const renderMarketIndex = (data: MarketIndexData | null, name: string) => (
    <View style={marketIndicesStyles.marketIndexCard}>
      <Text style={marketIndicesStyles.marketIndexName}>{name}</Text>
      <Text style={marketIndicesStyles.marketIndexValue}>{data?.value.toFixed(2) || '--'}</Text>
      <Text style={[
        marketIndicesStyles.marketIndexChange,
        data?.change && data.change >= 0 ? marketIndicesStyles.positive : marketIndicesStyles.negative
      ]}>
        {data?.change ? `${data.change >= 0 ? '+' : ''}${data.change.toFixed(2)} (${data.percentage.toFixed(2)}%)` : '--'}
      </Text>
      <Text style={marketIndicesStyles.marketIndexRange}>
        {data ? `${data.lowValue.toFixed(2)} - ${data.highValue.toFixed(2)}` : '--'}
      </Text>
    </View>
  );

  const renderSectorItem = ({ item }: { item: SectorData }) => (
    <View style={marketIndicesStyles.sectorCard}>
      <TouchableOpacity onPress={() => toggleSector(item.sectorId)}>
        <View style={marketIndicesStyles.sectorHeader}>
          <View style={marketIndicesStyles.sectorInfo}>
            <Text style={marketIndicesStyles.sectorName}>{item.name}</Text>
            <Text style={marketIndicesStyles.sectorSymbol}>{item.symbol}</Text>
          </View>
          <View style={marketIndicesStyles.sectorValues}>
            <Text style={marketIndicesStyles.sectorIndexValue}>{item.indexValue.toFixed(2)}</Text>
            <Text style={[
              marketIndicesStyles.sectorChange,
              item.change >= 0 ? marketIndicesStyles.positive : marketIndicesStyles.negative
            ]}>
              {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)} ({item.percentage.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {expandedSector === item.sectorId && (
        <View style={marketIndicesStyles.stocksContainer}>
          {stocksBySector[item.sectorId]?.length > 0 ? (
            stocksBySector[item.sectorId].map((stock) => (
              <View key={stock.id} style={marketIndicesStyles.stockItem}>
                <View style={marketIndicesStyles.stockInfo}>
                  <Text style={marketIndicesStyles.stockSymbol}>{stock.symbol.replace('.N0000', '')}</Text>
                  <Text style={marketIndicesStyles.stockName}>{stock.name}</Text>
                </View>
                <View style={marketIndicesStyles.stockValues}>
                  <Text style={marketIndicesStyles.stockPrice}>{stock.price.toFixed(2)}</Text>
                  <Text style={[
                    marketIndicesStyles.stockChange,
                    stock.change >= 0 ? marketIndicesStyles.positive : marketIndicesStyles.negative
                  ]}>
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.changePercentage.toFixed(2)}%)
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <Text style={marketIndicesStyles.noStocksText}>No stock data available</Text>
          )}
        </View>
      )}
    </View>
  );

  if (loading) {
    return (
      <View style={marketIndicesStyles.loadingContainer}>
        <ActivityIndicator size="large" color="#00FF9D" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={marketIndicesStyles.errorContainer}>
        <Text style={marketIndicesStyles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchAllData} style={marketIndicesStyles.retryButton}>
          <Text style={marketIndicesStyles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={marketIndicesStyles.container}>
      <Text style={marketIndicesStyles.lastUpdated}>
        Last updated: {formatTime(aspiData?.timestamp || sectors[0]?.transactionTime)}
      </Text>

      {/* Market Indices Row */}
      <View style={marketIndicesStyles.marketIndicesRow}>
        {renderMarketIndex(aspiData, 'ASPI')}
        {renderMarketIndex(snpData, 'S&P SL20')}
      </View>

      {/* Sector List */}
      <FlatList
        data={sectors}
        renderItem={renderSectorItem}
        keyExtractor={(item) => item.sectorId.toString()}
        contentContainerStyle={marketIndicesStyles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const marketIndicesStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
  },
  lastUpdated: {
    color: '#9B9B9B',
    fontSize: 12,
    textAlign: 'right',
    marginBottom: 8,
  },
  marketIndicesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  marketIndexCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    alignItems: 'center',
  },
  marketIndexName: {
    color: '#9B9B9B',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  marketIndexValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  marketIndexChange: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  marketIndexRange: {
    color: '#9B9B9B',
    fontSize: 12,
  },
  listContainer: {
    paddingBottom: 24,
  },
  sectorCard: {
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  sectorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectorInfo: {
    flex: 1,
  },
  sectorName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectorSymbol: {
    color: '#9B9B9B',
    fontSize: 12,
  },
  sectorValues: {
    alignItems: 'flex-end',
  },
  sectorIndexValue: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  sectorChange: {
    fontSize: 14,
    fontWeight: '500',
  },
  positive: {
    color: '#00FF9D',
  },
  negative: {
    color: '#FF3B30',
  },
  stocksContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 12,
  },
  stockItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  stockInfo: {
    flex: 1,
  },
  stockSymbol: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  stockName: {
    color: '#9B9B9B',
    fontSize: 12,
  },
  stockValues: {
    alignItems: 'flex-end',
  },
  stockPrice: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 12,
  },
  noStocksText: {
    color: '#9B9B9B',
    fontSize: 12,
    textAlign: 'center',
    paddingVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#00FF9D',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  retryButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

export default function MarketsScreen({ navigation }: MarketsScreenProps) {
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Markets</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Market</Text>
          <StockList navigation={navigation} />
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Indices</Text>
          <MarketIndicesSection />
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