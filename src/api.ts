const API_URL = 'https://5ec581652a4ba000163d2084.mockapi.io/api/v1/notes';
export const API = {
  getNote: async (id: string) => {
    const getNoteURL = `${API_URL}/${id}`;
    try {
      const response = await fetch(getNoteURL);
      const decodedResponse = await response.json();
      return { title: decodedResponse.title, body: decodedResponse.body };

    } catch (error) {
      throw new Error(`There was an error getting the note :${error}`);
    }
  },

  getNotes: async (page: string) => {
    const getNotesURL = `${API_URL}?page=${page}&limit=10`;
    try {
      const response = await fetch(getNotesURL);
      const decodedResponse = await response.json();
      return decodedResponse;
    } catch (error) {
      throw new Error(`There was an error getting notes: ${error}`);
    }
  },

  addNote: async (title: string, body: string) => {
    const payload = {
      'title': title,
      'body': body
    };
    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      throw new Error(`Was not able to create note because of error: ${error}`);
    }
  },

  deleteNote: async (id: string) => {
    const deleteURL = `${API_URL}/${id}`;
    try {
      const response = await fetch(deleteURL, { method: 'DELETE' });
      const decodedResponse = await response.json();
      return decodedResponse;
    } catch (error) {
      throw new Error(`Was not able to delete note due to: ${error}`);
    }
  },

  updateNote: async (id:string, title:string, body:string) => {
    const patchURL = `${API_URL}/${id}`;
    const payload = {
      'title': title,
      'body': body
    };
    try {
      const response = await fetch(patchURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      const decodedResponse = await response.json();
      return decodedResponse;
    } catch (error) {
      throw new Error(`Was not able to update note due to error: ${error}`);
    }
  }
};