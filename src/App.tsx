import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotebookView } from './views/NotebookView';
import { NoteDetailView } from './views/NoteDetailView';
import { NotesProvider } from './hooks/useNotes';

export function App() {
  return (
    <NotesProvider>
      <Switch>
        <Route exact path='/' component={NotebookView} />
        <Route exact path='/:page' component={NotebookView} />
        <Route exact path='/note/:id' component={NoteDetailView} />
        <Redirect to='/' />
      </Switch>
    </NotesProvider>
  );
}
