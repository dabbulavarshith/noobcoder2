export interface MarketDataPoint {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  sector?: string;
  lastUpdated: Date | string;
}

export interface CryptoData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  icon: string;
}

export interface PineScript {
  id: string;
  userId?: string;
  name: string;
  description?: string;
  category: 'strategy' | 'indicator' | 'study';
  code: string;
  views?: number;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface PriceAlert {
  id: string;
  userId?: string;
  symbol: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive?: boolean;
  createdAt: Date | string;
}

export interface EducationContent {
  id: string;
  title: string;
  description: string;
  readTime: string;
  icon: string;
  category: string;
}
