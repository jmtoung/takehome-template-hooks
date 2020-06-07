import { useCallback } from 'react';
import { API } from '../api';
import { useNotesContext } from './useNotes';

export function useFetchNotes() {
  const [, dispatch] = useNotesContext()

  return useCallback(async (page: string) => {
    const { notes, total } = await API.getNotes(page);
    // If API response is not correct, you should handle, potentially bump people back to '/'
    dispatch({
      notes,
      total,
    })
  }, [])
}
