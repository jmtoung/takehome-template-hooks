import { useState, useEffect } from 'react';
import { API } from '../api';

export const useNote = (id: string) => {
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      const note = await API.getNote(id);
      if (note && note.title && note.body) {
        setBody(note.body);
        setTitle(note.title);
      } else {
        setNotFound(true);
      }
    };
    fetchNote();
  }, [id]);

  return {
    title,
    body,
    setBody,
    setTitle,
    notFound,
  };
};
