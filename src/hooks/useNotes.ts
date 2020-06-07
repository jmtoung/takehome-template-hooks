import { useState, useCallback, useEffect } from 'react';
import { API } from '../api';

export const useNotes = (page: string) => {
  const [total, setTotal] = useState(0);
  const [notes, setNotes] = useState([]);

  const fetchNotes = useCallback(async () => {
    const result = await API.getNotes(page);
    setNotes(result.notes);
    if (result.total !== total) {
      setTotal(result.total);
    }
  }, [page, total]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return {
    fetchNotes: () => fetchNotes(),
    notes,
    total,
  };
};
