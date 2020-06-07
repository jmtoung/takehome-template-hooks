import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';
import { RouteComponentProps } from 'react-router-dom';
import { NoteForm } from '../components/NoteForm';
import { API } from '../api';
import { NotFound } from '../components/NotFound';
import { useNote } from '../hooks/useNote';

type TParams = { id: string };

export const NoteDetailView = ({
  match,
  history,
}: RouteComponentProps<TParams>) => {
  const { id } = match.params;
  const { title, body, setTitle, setBody, notFound } = useNote(id);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await API.updateNote(id, title, body);
    history.goBack();
  };

  if (notFound) {
    return <NotFound />;
  }

  if (title === '' && body === '') {
    return null;
  }

  return (
    <Container>
      <Jumbotron>
        <h1>Note Editor</h1>
        <NoteForm
          text="Update Note"
          title={title}
          body={body}
          handleSubmit={(e) => handleSubmit(e)}
          handleBodyChange={(e) => setBody(e.target.value)}
          handleTitleChange={(e) => setTitle(e.target.value)}
        />
      </Jumbotron>
    </Container>
  );
};
