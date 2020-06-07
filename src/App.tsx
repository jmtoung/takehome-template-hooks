import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { NotebookView } from './views/NotebookView';
import { NoteDetailView } from './views/NoteDetailView';

export function App() {
  return (
    <Switch>
      <Route exact path='/' component={NotebookView} />
      <Route exact path='/:page' component={NotebookView} />
      <Route exact path='/note/:id' component={NoteDetailView} />
      <Redirect to='/' />
    </Switch>
  );
}
