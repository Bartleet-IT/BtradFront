export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: number; // in billions LKR
    volume: number; // in millions
    peRatio: number;
    dayRange: string;
    yearRange: string;
    dividend?: number;
    about: string;
    sector: string;
    isSriLankan: boolean;
  }
  
  export const stocks: Stock[] = [
    // Blue Chip Sri Lankan Stocks
    {
      symbol: 'JKH',
      name: 'John Keells Holdings PLC',
      price: 185.50,
      change: 2.75,
      changePercent: 1.50,
      marketCap: 320,
      volume: 1.8,
      peRatio: 22.4,
      dayRange: '182.00 - 186.25',
      yearRange: '150.75 - 210.50',
      dividend: 2.50,
      about: 'Diversified conglomerate with interests in transportation, consumer foods, retail, leisure, property and financial services.',
      sector: 'Diversified Holdings',
      isSriLankan: true
    },
    {
      symbol: 'COMB',
      name: 'Commercial Bank of Ceylon PLC',
      price: 95.25,
      change: -0.75,
      changePercent: -0.78,
      marketCap: 145,
      volume: 0.9,
      peRatio: 8.5,
      dayRange: '94.50 - 96.00',
      yearRange: '85.25 - 110.75',
      dividend: 5.00,
      about: 'One of the largest private commercial banks in Sri Lanka with international operations.',
      sector: 'Banking',
      isSriLankan: true
    },
    {
      symbol: 'HNB',
      name: 'Hatton National Bank PLC',
      price: 210.00,
      change: 3.50,
      changePercent: 1.69,
      marketCap: 120,
      volume: 0.5,
      peRatio: 7.8,
      dayRange: '206.50 - 211.25',
      yearRange: '180.00 - 230.50',
      dividend: 10.00,
      about: 'Premier private sector commercial bank with strong retail and corporate banking operations.',
      sector: 'Banking',
      isSriLankan: true
    },
    {
      symbol: 'LOFC',
      name: 'LOLC Finance PLC',
      price: 42.50,
      change: 1.25,
      changePercent: 3.03,
      marketCap: 45,
      volume: 2.1,
      peRatio: 12.3,
      dayRange: '41.00 - 43.25',
      yearRange: '35.50 - 48.75',
      about: 'Leading non-banking financial institution offering leasing, savings and investment products.',
      sector: 'Financial Services',
      isSriLankan: true
    },
    {
      symbol: 'DIPD',
      name: 'Aitken Spence Hotel Holdings PLC',
      price: 68.75,
      change: -1.25,
      changePercent: -1.79,
      marketCap: 32,
      volume: 0.3,
      peRatio: 15.2,
      dayRange: '68.00 - 70.50',
      yearRange: '60.25 - 85.75',
      about: 'Leading hospitality company managing resorts in Sri Lanka and overseas.',
      sector: 'Hotels & Travel',
      isSriLankan: true
    },
    {
      symbol: 'RICH',
      name: 'Richard Pieris & Company PLC',
      price: 25.50,
      change: 0.75,
      changePercent: 3.03,
      marketCap: 28,
      volume: 1.2,
      peRatio: 10.5,
      dayRange: '24.75 - 26.00',
      yearRange: '20.50 - 30.25',
      about: 'Diversified conglomerate with interests in retail, rubber, plastics and plantations.',
      sector: 'Diversified Holdings',
      isSriLankan: true
    },
    {
      symbol: 'HAYC',
      name: 'Hayleys PLC',
      price: 92.00,
      change: 1.50,
      changePercent: 1.66,
      marketCap: 65,
      volume: 0.4,
      peRatio: 18.3,
      dayRange: '90.50 - 93.25',
      yearRange: '75.00 - 105.50',
      about: 'Global conglomerate with businesses in agriculture, transportation and consumer goods.',
      sector: 'Diversified Holdings',
      isSriLankan: true
    },
    // International Stocks (kept as reference)
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 175.34,
      change: 2.34,
      changePercent: 1.35,
      marketCap: 2700,
      volume: 45.2,
      peRatio: 28.5,
      dayRange: '$172.50 - $176.20',
      yearRange: '$142.53 - $198.23',
      dividend: 0.92,
      about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.',
      sector: 'Technology',
      isSriLankan: false
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 328.39,
      change: -1.45,
      changePercent: -0.44,
      marketCap: 2440,
      volume: 22.8,
      peRatio: 32.1,
      dayRange: '$326.50 - $330.75',
      yearRange: '$275.37 - $366.78',
      dividend: 2.48,
      about: 'Microsoft develops and licenses consumer and enterprise software.',
      sector: 'Technology',
      isSriLankan: false
    }
  ];
  
  // Filter functions for different stock categories
  export const popularStocks = stocks.filter(stock => 
    ['JKH', 'COMB', 'HNB', 'LOFC', 'HAYC'].includes(stock.symbol)
  );
  
  export const bankingStocks = stocks.filter(stock => 
    stock.sector === 'Banking' && stock.isSriLankan
  );
  
  export const diversifiedStocks = stocks.filter(stock => 
    stock.sector === 'Diversified Holdings' && stock.isSriLankan
  );
  
  export const blueChipStocks = stocks.filter(stock => 
    stock.marketCap > 50 && stock.isSriLankan
  );
  
  export const techStocks = stocks.filter(stock => 
    stock.sector === 'Technology'
  );