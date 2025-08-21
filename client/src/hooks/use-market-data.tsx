import { useQuery } from '@tanstack/react-query';
import { useWebSocket } from './use-websocket';
import { useEffect, useState } from 'react';
import type { MarketDataPoint } from '../types/market';

export function useMarketData() {
  const [realTimeData, setRealTimeData] = useState<MarketDataPoint[]>([]);
  const { lastMessage } = useWebSocket('/ws');

  // Fetch initial data
  const { data: initialData, isLoading } = useQuery<MarketDataPoint[]>({
    queryKey: ['/api/market-data'],
  });

  // Update real-time data when WebSocket message arrives
  useEffect(() => {
    if (lastMessage && lastMessage.type === 'market_data') {
      setRealTimeData(lastMessage.data);
    }
  }, [lastMessage]);

  // Use real-time data if available, otherwise use initial data
  const data = realTimeData.length > 0 ? realTimeData : initialData || [];

  return { data, isLoading };
}

export function useTopGainers() {
  return useQuery<MarketDataPoint[]>({
    queryKey: ['/api/market-data/gainers'],
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useTopLosers() {
  return useQuery<MarketDataPoint[]>({
    queryKey: ['/api/market-data/losers'],
    refetchInterval: 30000,
  });
}

export function useHighVolumeStocks() {
  return useQuery<MarketDataPoint[]>({
    queryKey: ['/api/market-data/high-volume'],
    refetchInterval: 30000,
  });
}
