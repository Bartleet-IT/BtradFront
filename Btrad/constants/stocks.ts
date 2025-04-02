export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    marketCap: number;
    volume: number;
    peRatio: number;
    dayRange: string;
    yearRange: string;
    dividend?: number;
    about: string;
  }
  
  export const stocks: Stock[] = [
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
      about: 'Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.'
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
      about: 'Microsoft develops and licenses consumer and enterprise software. It is known for its Windows operating systems and Office productivity suite.'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc. (Google)',
      price: 138.25,
      change: 3.21,
      changePercent: 2.38,
      marketCap: 1750,
      volume: 18.3,
      peRatio: 24.7,
      dayRange: '$135.40 - $139.80',
      yearRange: '$115.53 - $153.78',
      about: 'Alphabet Inc. provides online advertising services in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.'
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 178.75,
      change: -0.75,
      changePercent: -0.42,
      marketCap: 1820,
      volume: 30.1,
      peRatio: 58.3,
      dayRange: '$177.20 - $180.50',
      yearRange: '$155.63 - $189.77',
      about: 'Amazon.com operates as an online retailer in North America and internationally. It operates through three segments: North America, International, and AWS.'
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 170.18,
      change: 5.67,
      changePercent: 3.45,
      marketCap: 540,
      volume: 95.7,
      peRatio: 72.4,
      dayRange: '$165.30 - $172.45',
      yearRange: '$138.80 - $299.29',
      about: 'Tesla designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States and internationally.'
    },
    {
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      price: 450.22,
      change: 12.34,
      changePercent: 2.82,
      marketCap: 1110,
      volume: 42.5,
      peRatio: 65.2,
      dayRange: '$445.60 - $455.80',
      yearRange: '$222.97 - $505.48',
      about: 'NVIDIA Corporation provides graphics, and compute and networking solutions in the United States, Taiwan, China, and internationally.'
    },
    {
      symbol: 'META',
      name: 'Meta Platforms Inc.',
      price: 285.67,
      change: -2.45,
      changePercent: -0.85,
      marketCap: 730,
      volume: 15.8,
      peRatio: 22.4,
      dayRange: '$283.50 - $288.90',
      yearRange: '$235.77 - $326.20',
      about: 'Meta Platforms develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide.'
    }
  ];
  
  export const popularStocks = stocks.slice(0, 5);
  export const techStocks = stocks.filter(stock => 
    ['AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NVDA'].includes(stock.symbol)
  );