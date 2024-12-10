import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useDebounce } from './useDebounce';

interface UseSupabaseSearchProps {
  table: string;
  searchColumns: string[];
  filters?: Record<string, any>;
  orderBy?: { column: string; ascending?: boolean };
  limit?: number;
}

export function useSupabaseSearch<T>({
  table,
  searchColumns,
  filters = {},
  orderBy,
  limit
}: UseSupabaseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const performSearch = async () => {
      if (!debouncedSearchTerm && Object.keys(filters).length === 0) {
        const { data, error: fetchError } = await supabase
          .from(table)
          .select('*')
          .limit(limit || 50);

        if (fetchError) {
          setError(fetchError.message);
          setResults([]);
        } else {
          setResults(data || []);
        }
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = supabase.from(table).select('*');

        // Apply search term filter
        if (debouncedSearchTerm) {
          const searchConditions = searchColumns.map(column => 
            `${column}.ilike.%${debouncedSearchTerm}%`
          );
          query = query.or(searchConditions.join(','));
        }

        // Apply additional filters
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(key, value);
          }
        });

        // Apply ordering
        if (orderBy) {
          query = query.order(orderBy.column, {
            ascending: orderBy.ascending ?? true
          });
        }

        // Apply limit
        if (limit) {
          query = query.limit(limit);
        }

        const { data, error: searchError } = await query;

        if (searchError) throw searchError;
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to perform search');
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [debouncedSearchTerm, table, searchColumns, filters, orderBy, limit]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error
  };
}