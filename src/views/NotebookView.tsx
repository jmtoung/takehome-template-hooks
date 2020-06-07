import React from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Container, Jumbotron } from 'react-bootstrap';
import { API } from '../api';
import { AddNote } from '../components/AddNote';
import { Pagination } from '../components/Pagination';
import { useNotes } from '../hooks/useNotes';
import { NoteList } from '../components/NoteList';

export const NotebookView = ({ history }: RouteComponentProps) => {
  let { page } = useParams();
  if (!page) {
    page = '1';
  }
  const { fetchNotes, total, notes } = useNotes(page);

  async function deleteNote(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    const { id } = event.currentTarget.dataset;
    if (id) {
      const response = await API.deleteNote(id);

      if (response !== 'Not found') {
        if (notes.length === 1) {
          const previousPage = page - 1;
          history.push(`/${previousPage}`);
          return;
        }
      }
      fetchNotes();
    }
  }

  if (!notes.length) {
    return null;
  }

  return (
    <Container>
      <Jumbotron>
        <h1>NoteBook</h1>
        <AddNote total={total} page={page} fetchNotes={() => fetchNotes()} />
        <NoteList notes={notes} deleteNote={(e) => deleteNote(e)} />
        <Pagination total={total} page={page} />
      </Jumbotron>
    </Container>
  );
};
