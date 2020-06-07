import React, { useCallback } from 'react';
import { API } from '../api';
import { useFetchNotes } from './useFetchNotes';
import { useNotesContext } from './useNotes';
import { useHistory } from 'react-router-dom';

export function useDeleteNote(page: string) {
  const history = useHistory()
  const [{ notes }] = useNotesContext()
  const fetchNotes = useFetchNotes()

  return useCallback(async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const { id } = event.currentTarget.dataset;
    if (id) {
      const response = await API.deleteNote(id);

      if (response !== 'Not found') {
        if (notes.length === 1) {
          const previousPage = Number(page) - 1;
          history.push(`/${previousPage}`);
          return;
        }
      }
      await fetchNotes(page);
    }
  }, [fetchNotes, history, notes.length, page])

}
