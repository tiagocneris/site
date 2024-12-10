import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useDebounce } from './useDebounce';

interface UseSearchProps {
  table: string;
  searchFields: string[];
  filters?: Record<string, any>;
  initialSort?: { field: string; ascending: boolean };
}

export function useSearch<T>({ 
  table, 
  searchFields, 
  filters = {},
  initialSort
}: UseSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearchTerm && Object.keys(filters).length === 0) {
        setResults([]);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let query = supabase.from(table).select('*');

        // Apply search term filter
        if (debouncedSearchTerm) {
          const searchConditions = searchFields.map(field => 
            `${field}.ilike.%${debouncedSearchTerm}%`
          ).join(',');
          query = query.or(searchConditions);
        }

        // Apply additional filters
        Object.entries(filters).forEach(([field, value]) => {
          if (value !== undefined && value !== null) {
            query = query.eq(field, value);
          }
        });

        // Apply sorting
        if (initialSort) {
          query = query.order(initialSort.field, {
            ascending: initialSort.ascending
          });
        }

        const { data, error: queryError } = await query;

        if (queryError) throw queryError;
        setResults(data || []);
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to perform search');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearchTerm, table, searchFields, filters, initialSort]);

  return {
    searchTerm,
    setSearchTerm,
    results,
    loading,
    error
  };
}