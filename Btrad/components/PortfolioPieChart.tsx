import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { VictoryPie } from 'victory';
import { G, Text as SvgText } from 'react-native-svg';

const { width } = Dimensions.get('window');

interface PortfolioPieChartProps {
  stocks: Array<{
    symbol: string;
    shares: number;
    currentPrice: number;
    color: string;
  }>;
}

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({ stocks }) => {
  // Prepare data for pie chart
  const pieChartData = stocks.map(stock => ({
    x: stock.symbol,
    y: stock.shares * stock.currentPrice,
    color: stock.color
  }));

  // Custom label component
  const CustomLabel: React.FC<{ datum: any; x: number; y: number }> = ({ datum, x, y }) => {
    return (
      <G>
        <SvgText
          x={x}
          y={y}
          textAnchor="middle"
          fill="#fff"
          fontSize={12}
          fontWeight="bold"
        >
          {datum.x}
        </SvgText>
        <SvgText
          x={x}
          y={y + 16}
          textAnchor="middle"
          fill="#9B9B9B"
          fontSize={10}
        >
          {`LKR ${datum.y.toFixed(2)}`}
        </SvgText>
      </G>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Portfolio Allocation</Text>
      <View style={styles.chartWrapper}>
        <VictoryPie
          data={pieChartData}
          width={width - 32}
          height={250}
          colorScale={pieChartData.map(item => item.color)}
          innerRadius={60}
          padAngle={2}
          animate={{ duration: 1000, easing: "bounce" }}
          labelComponent={<CustomLabel datum={{}} x={0} y={0} />}
          style={{ labels: { fill: "white", fontSize: 12, fontWeight: "bold" } }}
        />
      </View>
      
      {/* Legend */}
      <View style={styles.legendContainer}>
        {pieChartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.x}</Text>
            <Text style={styles.legendValue}>
              LKR {item.y.toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  chartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1C1C1C',
    borderRadius: 12,
    paddingVertical: 16,
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
    marginRight: 8,
    flex: 1,
  },
  legendValue: {
    color: '#9B9B9B',
    fontSize: 12,
  },
});

export default PortfolioPieChart;