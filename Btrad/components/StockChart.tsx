import React from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet } from 'react-native';

const StockChart = ({ data }: { data: number[] }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['6M', '5M', '4M', '3M', '2M', '1M'],
          datasets: [{ data }],
        }}
        width={screenWidth - 32}
        height={220}
        withVerticalLabels={true}
        withHorizontalLabels={true}
        withInnerLines={false}
        withOuterLines={false}
        withDots={false}
        withShadow={false}
        withVerticalLines={false}
        withHorizontalLines={false}
        chartConfig={{
          backgroundGradientFrom: '#000',
          backgroundGradientTo: '#000',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 255, 157, ${opacity})`, // Green accent color
          labelColor: (opacity = 1) => `rgba(155, 155, 155, ${opacity})`, // Gray labels
          propsForLabels: {
            fontSize: 10,
          },
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  chart: {
    borderRadius: 12,
  },
});

export default StockChart;