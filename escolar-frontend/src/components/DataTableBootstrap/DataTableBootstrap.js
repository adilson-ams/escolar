import React, { useState, useEffect, useRef } from "react";

// hooks
import { useFetch } from "./../../hooks/useFetch";
import { useTable } from "react-table";

import { Form } from '@unform/web';


// Icons

import {
    BsFillSkipBackwardFill, BsFillSkipStartFill, BsFillSkipEndFill, BsFillSkipForwardFill, BsFilter,
    BsFillXOctagonFill
} from "react-icons/bs";
import { Button, PopoverHeader, PopoverBody, Popover } from 'reactstrap';

// import './styles.css';
import './styles.css';
import Input from "../form/input/input";

export default function DataTableBootstrap(props) {

    const [_Order, _setOrder] = useState("asc");
    const [_OrderField, _setOrderField] = useState(props.columns[0]["accessor"]);

    const [pageSize, setPageSize] = useState(props.pageSize);
    const [page, setPage] = useState(1);


    const [filtros, setFiltros] = useState('');

    const { data, error, mutate } = useFetch(
        props.url +
        "?$top=" +
        pageSize +
        "&$count=true" +
        "&$skip=" +
        ((page - 1) * pageSize) +
        "&$orderby=" + (_OrderField + " " + _Order) +
        (filtros ? ("&$filter=" + filtros)+' ' + (props.filterFixed !== undefined ? props.filterFixed : '' ) : 
        (props.filterFixed !== undefined ? '&$filter= ' + props.filterFixed : '' ) )
    );



    const DataTable = () => {
        setPage(1);
        mutate();
    }

    useEffect(() => {
        props.DataTableRef.current = DataTable;
    });



    /************* Ordenação /*************/
    function orderBy(accessor) {
        if (accessor === _OrderField) {
            if (_Order === "asc") {
                _setOrder("desc");
            } else {
                _setOrder("asc");
            }
        } else {
            _setOrder("asc");
        }
        _setOrderField(accessor);
    }



    /************* FILTROS /*************/
    function addFilter(type, campo, conteudo) {
        var filtro = "";

        switch (type) {
            case "eq": filtro = `'${campo}' = '${conteudo}' `; break;
            case "contains": filtro = ` LOWER(${campo}) LIKE LOWER('%${conteudo}%')`; break;
        }

        setFiltros(filtro);
    }


    const RenderFilter = (props) => {

        const [type, setType] = useState('contains');
        const [filtrar, setFiltrar] = useState('');

        const [popoverOpen, setPopoverOpen] = useState(false);
        const toggle = () => setPopoverOpen(!popoverOpen);


        return (
            <>


                <button
                    id={"PopoverFilter-" + props.index}
                    onClick={toggle}
                    className="btn btn-default"
                    type="button">
                    <BsFilter />
                </button>
                <Popover
                    placement="bottom"
                    isOpen={popoverOpen}
                    target={"PopoverFilter-" + props.index}
                    toggle={toggle}
                >
                    <PopoverHeader>Filtrar: <strong>{props.column.accessor}</strong></PopoverHeader>
                    <PopoverBody>
                        <div className="form-group">
                            <label >Tipo:</label>
                            <select
                                type="email"
                                className="form-control"
                                onChange={(e) => {
                                    setType(e.currentTarget.value);
                                }}
                            >
                                <option value="contains">Contém</option>
                                {/* <option value="eq">Igual</option> */}
                            </select>
                        </div>
                        <div className="form-group">
                            <label >Filtrar conteúdo:</label>
                            <input
                                type="text"
                                name="filtrar"
                                autoComplete="off"
                                className="form-control"
                                placeholder="Filtrar"
                                onChange={(e) => {
                                    setFiltrar(e.currentTarget.value);
                                }}
                            />
                            <small id="emailHelp" className="form-text text-muted">Descreva o conteúdo que deseja pesquisa.</small>
                        </div>
                    </PopoverBody>
                    <div className="popover-footer" style={{ flexDirection: 'row', display: 'block' }}>
                        <Button
                            type="submit"
                            onClick={() => {
                                addFilter(type, props.column.accessor, filtrar);
                                toggle();
                            }}
                            block color="primary" >
                            Filtrar
                        </Button>

                        <Button
                            onClick={toggle}
                            block
                            color="secondary" >
                            Cancelar
                        </Button>
                    </div>
                </Popover>
            </>
        );
    }

    /************* FIM - FILTROS /*************/


    const RenderDataTablex = () => {
        return (
            <>
                <table className="table table-striped">
                    {/*****************  Header *****************/}
                    <thead className="thead">
                        <tr>
                            {props.columns.map(function (d, index) {
                                return (
                                    <th
                                        key={"thead" + index}
                                        style={{ textAlign: d.align }}
                                        width={d.width}
                                        className={
                                            d.order ? (_OrderField == d.accessor ? _Order : "sorting") : ""
                                        }
                                    >
                                        {d.order ? (
                                            <>
                                                <button onClick={() => orderBy(d.accessor)}>
                                                    {d.Header}
                                                </button>

                                                {d.filter && <RenderFilter column={d} index={index} />}
                                            </>
                                        ) : (
                                                <>
                                                    <span>{d.Header}</span>

                                                    {d.filter && <RenderFilter column={d} index={index} />}
                                                </>
                                            )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                </table>
            </>);
    }

    const RenderDataTable = () => {
        return (
            <>

                {filtros &&
                    <div className="alert bg-light" role="alert">
                        <button type="button" onClick={() => {
                            setFiltros(null);
                        }} className="btn btn-primary">
                            {filtros} <span className="badge"><BsFillXOctagonFill /></span>
                        </button>
                    </div>
                }

                <table className="table table-striped">

                    {/*****************  Header *****************/}
                    <thead className="thead">
                        <tr>
                            {props.columns.map(function (d, index) {
                                return (
                                    <th
                                        key={"thead" + index}
                                        style={{ textAlign: d.align }}
                                        width={d.width}
                                        className={
                                            d.order ? (_OrderField == d.accessor ? _Order : "sorting") : ""
                                        }
                                    >
                                        {d.order ? (
                                            <>
                                                <button onClick={() => orderBy(d.accessor)}>
                                                    {d.Header}
                                                </button>

                                                {d.filter && <RenderFilter column={d} index={index} />}
                                            </>
                                        ) : (
                                                <>
                                                    <span>{d.Header}</span>

                                                    {d.filter && <RenderFilter column={d} index={index} />}
                                                </>
                                            )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>

                    {/*****************  Fim - Header *****************/}

                    {/*****************  Body *****************/}
                    <DataTableBody columns={props.columns} data={data !== undefined ? data.values : ''} />


                    {/*****************  Fim - Body *****************/}

                    <tfoot className="tfoot">
                        <tr>
                            {props.columns.map(function (d, index) {
                                return <th
                                    key={"tfoot" + index}
                                    style={{ textAlign: d.align }}
                                    width={d.width}>
                                    {d.Header}
                                </th>;
                            })}
                        </tr>
                    </tfoot>

                </table>


                <div className="row">

                    {/***************** Controle de paginação *****************/}
                    <div className="col">
                        <select
                            className="form-control-paginator"
                            defaultValue={pageSize}
                            name="pageSize"
                            onChange={(e) => {
                                if ((Math.round(data["@odata.count"] / e.currentTarget.value)) < page) {
                                    setPage(1);
                                }

                                setPageSize(e.currentTarget.value);
                            }} >
                            <option value="5" >5</option>
                            <option value="10" >10</option>
                            <option value="50" >50</option>
                        </select>{' '}
                        <span>
                            Página {' '}
                            <input
                                style={{ width: 70 }}
                                type="number"
                                className="form-control-paginator"
                                name="page"
                                value={page}
                                onChange={(e) => {
                                    if (e.currentTarget.value > 0 && e.currentTarget.value <= (Math.ceil(data["@odata.count"] / pageSize))) {
                                        setPage(e.currentTarget.value);
                                    }
                                }}
                            />
                            {" "}de{" "}
                            {data && Math.ceil(data["@odata.count"] / pageSize)} página(s) - Total de {data && data["@odata.count"]} Registros
                    </span>
                    </div>

                    {/**************** Paginação *****************/}
                    <div className="col">
                        <ul className="pagination">

                            {/* Primeira Página */}
                            <li
                                className={(page == 1 ? "page-item disabled" : "page-item")}
                            >
                                <button onClick={() => setPage(1)} className="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true"><BsFillSkipBackwardFill /></span>
                                    <span className="sr-only">Previous</span>
                                </button>
                            </li>

                            {/* Anterior  */}
                            <li
                                className={(page == 1 ? "page-item disabled" : "page-item")}
                            >
                                <button
                                    onClick={() => {
                                        if (page > 1) {
                                            setPage(page - 1);
                                        }
                                    }}
                                    className="page-link">
                                    <span aria-hidden="true"><BsFillSkipStartFill /></span>
                                    <span className="sr-only">Next</span></button>
                            </li>

                            {/* Página atual */}
                            <li className="page-item active"><a className="page-link" href="#">{page}</a></li>

                            {/* Próximo */}
                            <li
                                className={(page == (Math.ceil(data["@odata.count"] / pageSize)) ? "page-item disabled" : "page-item")}
                            >
                                <button
                                    onClick={() => {
                                        var numPage = Math.ceil(data["@odata.count"] / pageSize);
                                        if (page < numPage) {
                                            setPage(page + 1);
                                        }
                                    }}
                                    className="page-link">
                                    <span aria-hidden="true"><BsFillSkipEndFill /></span>
                                    <span className="sr-only">Next</span>
                                </button>
                            </li>

                            {/* Última página */}
                            <li
                                className={(page == (Math.ceil(data["@odata.count"] / pageSize)) ? "page-item disabled" : "page-item")}
                            >
                                <button
                                    onClick={() => {
                                        var num = Math.ceil(data["@odata.count"] / pageSize)
                                        setPage(num);
                                    }}
                                    className="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true"><BsFillSkipForwardFill /></span>
                                    <span className="sr-only">Next</span>
                                </button>
                            </li>

                        </ul>
                    </div>

                    {/**************** Fim - Paginação *****************/}



                </div>

            </>
        );
    }


    return (
        <div>
            {!data ? <div>Carregando..</div> : <RenderDataTable columns={props.columns} data={data.value} />}
            {error && error}
        </div>
    );



}



const DataTableBody = ({ columns, data }) => {
    const { prepareRow, rows } = useTable({
        columns,
        data,
        initialState: { pageIndex: 0 }
    });

    return (
        <>
            <tbody className="tbody">
                {rows.map((row, index) => {
                    prepareRow(row);
                    return (
                        <tr key={"tbody-" + index} {...row.getRowProps()} >
                            {row.cells.map((cell) => {
                                return <td style={{ textAlign: (cell.column.align ?? 'left') }}  {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </>
    );
};
