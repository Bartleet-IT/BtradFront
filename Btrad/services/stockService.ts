export interface Stock {
    id: number;
    symbol: string;
    open: number;
    high: number;
    low: number;
    lastTradedPrice: number;
    change: number;
    changePercentage: number;
    crossingVolume: number;
    tradesTime: number;
    quantity: number;
  }
  
  export const fetchStockData = async (): Promise<Stock[]> => {
    try {
      const response = await fetch('https://www.cse.lk/api/todaySharePrice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      return [];
    }
  };