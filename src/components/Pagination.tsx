import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  total: number;
  page: string;
}

export function Pagination(props: Props) {
  const { total, page } = props;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(total / 10); i++) {
    pageNumbers.push(i);
  }

  const pageLinks = pageNumbers.map((number) => {
    return (
      <li
        key={number}
        className={
          number === parseInt(page, 10) ? 'page-item active' : 'page-item'
        }
      >
        <Link
          onClick={(event) => {
            event.currentTarget.blur();
          }}
          className="page-link"
          to={`/${number}`}
        >
          {number}
        </Link>
      </li>
    );
  });

  return (
    <ul className="pagination">
      <li className="page-item">
        <Link
          onClick={(event) => {
            event.currentTarget.blur();
          }}
          className="page-link"
          to="/"
        >
          First
        </Link>
      </li>
      {pageLinks}
      <li className="page-item">
        <Link
          onClick={(event) => {
            event.currentTarget.blur();
          }}
          className="page-link"
          to={`/${pageNumbers.length}`}
        >
          Last
        </Link>
      </li>
    </ul>
  );
};
