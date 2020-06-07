import React, { useCallback, useState } from 'react';
import { Button } from 'react-bootstrap';
import { API } from '../api';
import { useInput } from '../hooks/useInput';
import { NoteForm } from './NoteForm';

type Props = {
  total: number;
  page: string;
  fetchNotes: () => Promise<void>;
}

export function AddNote({ page, total, fetchNotes }: Props) {
  const [isCreating, setIsCreating] = useState(false);
  const { value: title, onChange: changeTitle, reset: resetTitle } = useInput(
    ''
  );
  const { value: body, onChange: changeBody, reset: resetBody } = useInput('');

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await API.addNote(title, body);
      resetTitle();
      resetBody();
    } catch(error) {
      // process the error
    } finally {
      setIsCreating(false);
    }

    if (parseInt(page, 10) === Math.ceil(total / 10)) {
      await fetchNotes();
    }
  }, [fetchNotes, page, total, title, body, resetBody, resetTitle]);

  if (!isCreating) {
    return (
      <Button className="create-note" onClick={() => setIsCreating(true)}>
        Create Note
      </Button>
    );
  }

  return (
    <NoteForm
      text="Create Note"
      title={title}
      body={body}
      handleSubmit={handleSubmit}
      handleBodyChange={changeBody}
      handleTitleChange={changeTitle}
    />
  );
}
