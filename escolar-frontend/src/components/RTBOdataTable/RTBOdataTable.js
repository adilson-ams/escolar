import React, { useState } from "react";
import { useFetch } from "./../../hooks/useFetch";
import RTBOdataBody from "./RTBOdataBody";
import RTBOdataPagination from "./RTBOdataPagination";

import './styles.css';

export default function RTBOdataTable(props) {
  const [_Order, _setOrder] = useState("");
  const [_OrderField, _setOrderField] = useState("");

  const [pageSize, setPageSize] = useState(props.pageSize);
  const [page, setPage] = useState(1);

  const { data } = useFetch(
    props.url +
    "?$top=" +
    pageSize +
    "&$count=true" +
    "&$skip=" +
    (page - 1) * pageSize
  );

  function orderBy(accessor) {
    if (accessor === _OrderField) {
      if (_Order === "sorting_asc") {
        _setOrder("sorting_desc");
      } else {
        _setOrder("sorting_asc");
      }
    } else {
      _setOrder("sorting_asc");
    }

    _setOrderField(accessor);
  }


  function pageChange(page) {
    setPage(page);
  }


  return (
    <>
 {/*
      <div className="row">
        <div className="col-6">
          <div className="form-group row">
            <label for="staticEmail" className="col-sm-2 col-form-label">
              Mostrar:{" "}
            </label>
            <div className="col-sm-4">
              <select
                className="form-control"
                defaultValue={pageSize}
                onChange={(event) => setPageSize(event.target.value)}
              >
                <option value="5">5 </option>
                <option value="10">10 </option>
                <option value="50">50 </option>
              </select>
            </div>
          </div>
        </div>

        <div id="master-filter" className="col-6">
          <div class="input-group">
            <input type="text" className="form-control" />
            <div className="input-group-append">
              <button className="btn btn-outline-primary" type="button">
                Filtrar
              </button>
            </div>
          </div>
        </div>
      </div>
 */}
 
      <table className="table table-striped">

        {/* <RTBOdataHeader columns={props.columns} />  */}
        <thead className="thead">
          <tr>
            {props.columns.map(function (d) {
              return (
                <th
                  style={{ textAlign: d.align}}
                  width={d.width}
                  className={
                    d.order
                      ? _OrderField === d.accessor
                        ? _Order
                        : "sorting"
                      : ""
                  }
                >
                  {d.order ? (
                    <button onClick={() => orderBy(d.accessor)}>
                      {d.Header}
                    </button>
                  ) : (
                      d.Header
                    )}
                </th>
              );
            })}
          </tr>
        </thead>

        {data ? (
          <RTBOdataBody columns={props.columns} data={data.value} />
        ) : (
            "Carregando.."
          )}

        <tfoot className="tfoot">
          <tr>
            {props.columns.map(function (d) {
              return <th>{d.Header}</th>;
            })}
          </tr>
        </tfoot>
      </table>

      <div className="row">
        <div className="col">
          <span>
            Página {page} de{" "}
            {data && Math.round(data["@odata.count"] / pageSize)} paginá(s) -
            Total de {data && data["@odata.count"]} Registros
          </span>
        </div>

        {/* Paginação */}
        <div className="col">
          {data && (
            <RTBOdataPagination
              currentPage={page}
              onChange={pageChange}
              datasource={data}
              maxPage={pageSize}
            />
          )}
        </div>
      </div>
    </>
  );
}
