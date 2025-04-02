// types.ts
import { Stock } from '../constants/stocks';

// Stack Navigator types
export type RootStackParamList = {
    MainTabs: undefined;
    StockDetail: {
      stock: Stock;
    };
  };
  
  // Tab Navigator types
  export type MainTabParamList = {
    Markets: undefined;  // Changed from MarketsScreen to Markets
    Watchlist: undefined;
    Portfolio: undefined;
    // Add other tabs if needed
  };
  
  declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
}