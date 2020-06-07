import { useState, useCallback, useEffect } from 'react';
import { API } from '../api';

export const useNotes = (page: string) => {
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    const result = await API.getNotes(page);
    // If API response is not correct, you should handle, potentially bump people back to '/'
    setNotes(result.notes);
    setTotal(result.total);
  }, [page]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    fetchNotes,
    notes,
    total,
  };
};
