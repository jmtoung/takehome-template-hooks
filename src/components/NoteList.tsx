import React from 'react';
import { Note } from './Note';

interface Note {
  id: string;
  title: string;
  body: string;
}
export const NoteList: React.FunctionComponent<{
  notes: Array<Note>;
  deleteNote: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = (props) => {
  const { notes, deleteNote } = props;

  const noteListItems = notes.map((note: Note) => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        body={note.body}
        deleteNote={deleteNote}
      />
    );
  });

  return <ul>{noteListItems}</ul>;
};
