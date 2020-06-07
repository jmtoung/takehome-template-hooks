import React, { Dispatch, createContext, useState, useCallback, useEffect, useReducer, useContext } from 'react';

export type NoteType = {
  id: string,
  title: string
  body: string
}

type NotesState = {
  notes: NoteType[]
  total: number
}

type NotesContextType = [
  NotesState,
  Dispatch<NotesState>
]

const NotesContext = createContext<NotesContextType | null>(null)

type Props = {
  children?: React.ReactNode
}

function notesReducer(state: NotesState, newState: NotesState): NotesState {
  return {...state, ...newState}
}

export const NotesProvider = (props: Props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(notesReducer, { notes: [], total: 0 })

  return (
    <NotesContext.Provider value={ [state, dispatch] }>
      {children}
    </NotesContext.Provider>
  )
}

export function useNotesContext() {
  const context = useContext(NotesContext)
  if (!context) {
    throw new Error('Missing Provider')
  }
  return context
}

