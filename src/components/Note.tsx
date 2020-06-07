import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Row, Image, Col } from 'react-bootstrap';
import { useInput } from '../hooks/useInput';
import { API } from '../api';
import { NoteForm } from './NoteForm';

const deleteIcon = require('../assets/delete.png');
const editIcon = require('../assets/pencil.png');

export const Note: React.FunctionComponent<{
  id: string;
  title: string;
  body: string;
  deleteNote: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}> = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const { id } = props;
  const { value: title, onChange: changeTitle } = useInput(props.title);
  const { value: body, onChange: changeBody } = useInput(props.body);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await API.updateNote(id, title, body);
    setIsUpdating(false);
  };

  let view;

  if (isUpdating) {
    view = (
      <NoteForm
        text="Update Note"
        title={title}
        body={body}
        handleSubmit={(e) => handleSubmit(e)}
        handleBodyChange={changeBody}
        handleTitleChange={changeTitle}
      />
    );
  } else {
    view = (
      <div>
        <Row>
          <Col>
            <Link to={{ pathname: `/note/${id}` }}>
              <h2>{title}</h2>
            </Link>
          </Col>
          <Button
            type="button"
            style={{ margin: '5px' }}
            className="update-view"
            onClick={() => setIsUpdating(true)}
          >
            <Image alt="edit" src={editIcon} width="20" height="20" />
          </Button>
          <Button
            style={{ margin: '5px' }}
            type="button"
            className="delete"
            data-id={id}
            variant="secondary"
            onClick={props.deleteNote}
          >
            <Image alt="delete" src={deleteIcon} width="20" height="20" />
          </Button>
        </Row>
        <Row>
          <Col>
            <p>{body}</p>
          </Col>
        </Row>
      </div>
    );
  }

  return <div id={id}>{view}</div>;
};
