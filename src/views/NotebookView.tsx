import React, { useCallback } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { API } from '../api';
import { AddNote } from '../components/AddNote';
import { Pagination } from '../components/Pagination';
import { useNotes } from '../hooks/useNotes';
import { NoteList } from '../components/NoteList';

export const NotebookView = ({ history }: RouteComponentProps) => {
  const { page = '1' } = useParams();
  const { fetchNotes, total, notes } = useNotes(page);

  const deleteNote = useCallback(async (
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
      await fetchNotes();
    }
  }, [fetchNotes, history, notes.length, page])

  if (!notes.length) {
    return null;
  }

  return (
    <Container>
      <Jumbotron>
        <h1>NoteBook</h1>
        <AddNote total={total} page={page} fetchNotes={fetchNotes} />
        <NoteList notes={notes} deleteNote={deleteNote} />
        <Pagination total={total} page={page} />
      </Jumbotron>
    </Container>
  );
};
