import React from 'react';
import { Note } from './Note';
import { useNotesContext, NoteType } from '../hooks/useNotes';
import { useDeleteNote } from '../hooks/useDeleteNote';

type Props = {
  page: string
}

export function NoteList ({ page }: Props) {
  const [{ notes }] = useNotesContext()
  const deleteNote = useDeleteNote(page)

  const noteListItems = notes.map((note: NoteType) => {
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
