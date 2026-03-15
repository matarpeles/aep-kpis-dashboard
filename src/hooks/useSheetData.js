import { useState, useEffect, useCallback } from 'react';
import { REFRESH_INTERVAL, DEFAULT_DATA } from '../config';

// Data source - use local JSON file
const DATA_URL = '/data.json';

export const useSheetData = () => {
  const [data, setData] = useState(DEFAULT_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(new Date());

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Add cache-busting parameter to ensure fresh data
      const response = await fetch(`${DATA_URL}?t=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
      }

      const jsonData = await response.json();
      
      setData({
        kpis: jsonData.kpis || DEFAULT_DATA.kpis,
        lastUpdated: jsonData.lastUpdated || new Date().toISOString()
      });
      
      setLastFetch(new Date());
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message);
      // Use default data on error
      if (!data.kpis.length) {
        setData(DEFAULT_DATA);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh
  useEffect(() => {
    const interval = setInterval(fetchData, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastFetch,
    refetch: fetchData
  };
};
