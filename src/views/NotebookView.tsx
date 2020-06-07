import React, { useCallback, useContext, useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { AddNote } from '../components/AddNote';
import { Pagination } from '../components/Pagination';
import { useNotesContext } from '../hooks/useNotes';
import { NoteList } from '../components/NoteList';
import { useFetchNotes } from '../hooks/useFetchNotes';

export const NotebookView = () => {
  const { page = '1' } = useParams();
  const [{ notes, total }] = useNotesContext()

  const fetchNotes = useFetchNotes()

  useEffect(() => {
    fetchNotes
  }, [fetchNotes])

  if (!notes.length) {
    return null;
  }

  return (
    <Container>
      <Jumbotron>
        <h1>NoteBook</h1>
        <AddNote total={total} page={page} />
        <NoteList page={page} />
        <Pagination total={total} page={page} />
      </Jumbotron>
    </Container>
  );
};
