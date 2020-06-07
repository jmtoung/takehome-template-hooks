import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { API } from '../api';
import { useInput } from '../hooks/useInput';
import { NoteForm } from './NoteForm';

export const AddNote: React.FunctionComponent<{
  total: number;
  page: string;
  fetchNotes: () => {};
}> = (props) => {
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const { value: title, onChange: changeTitle, reset: resetTitle } = useInput(
    ''
  );
  const { value: body, onChange: changeBody, reset: resetBody } = useInput('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await API.addNote(title, body);
    resetTitle();
    resetBody();
    setIsCreating(false);

    const { page, total } = props;
    if (parseInt(page, 10) === Math.ceil(total / 10)) {
      props.fetchNotes();
    }
  };

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
      handleSubmit={(e) => handleSubmit(e)}
      handleBodyChange={changeBody}
      handleTitleChange={changeTitle}
    />
  );
};
