import React from 'react';
import { Form, Button } from 'react-bootstrap';

type Props = {
  title: string;
  body: string;
  text: string;
  handleBodyChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export function NoteForm(props: Props) {
  const {
    title,
    body,
    text,
    handleSubmit,
    handleBodyChange,
    handleTitleChange,
  } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Control
          type="text"
          placeholder="Title..."
          className="title-input"
          name="title"
          value={title}
          onChange={handleTitleChange}
        />
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Content..."
          name="body"
          className="body-input"
          value={body}
          onChange={handleBodyChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        {text}
      </Button>
    </Form>
  );
}
