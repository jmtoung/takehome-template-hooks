import React from 'react';
import { Container, Jumbotron } from 'react-bootstrap';

export function NotFound() {
  return (
    <Container>
      <Jumbotron>
        <h1>404! The page you are looking for was not found.</h1>
      </Jumbotron>
    </Container>
  );
}
