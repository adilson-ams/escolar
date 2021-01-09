import React, { useState, useEffect } from "react";

const RTBOdataPagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const count = Math.round(props.datasource["@odata.count"] / props.maxPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [props.maxPage]);

  function onChangePage(page) {
    props.onChange(page);
    setCurrentPage(page);
  }

  const pages = [];
  for (var i = 1; i <= count; i++) {
    pages.push(i);
  }

  function renderPagination(number, currentPage) {
    return (
      <li className="page-item">
        {number === currentPage ? (
          <li className="page-item active" aria-current="page">
            <button onClick={() => onChangePage(number)} className="page-link">
              {number} <span className="sr-only">(current)</span>
            </button>
          </li>
        ) : (
          <li className="page-item">
            <button onClick={() => onChangePage(number)} className="page-link">
              {number}
            </button>
          </li>
        )}
      </li>
    );
  }

  return (
    <ul className="pagination">
      <li className={currentPage - 1 <= 1 ? "page-item disabled" : "page-item"}>
        <button
          onClick={() => onChangePage(currentPage - 2)}
          className="page-link"
        >
          Anterior
        </button>
      </li>

      {pages.map((number) => (
        <div>
          {currentPage - 1 <= number && currentPage + 2 > number
            ? renderPagination(number, currentPage)
            : ""}
        </div>
      ))}

      <li
        className={
          count - 1 <= currentPage ? "page-item disabled" : "page-item"
        }
      >
        <button
          onClick={() => onChangePage(currentPage + 2)}
          className="page-link"
        >
          Próximo
        </button>
      </li>
    </ul>
  );
};

export default RTBOdataPagination;
