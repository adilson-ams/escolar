import React, { useRef } from 'react';
import Moment from 'moment';


// Icones
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";


import { Link } from "react-router-dom";

// Hooks
import { useToasts } from 'react-toast-notifications';


// Outros componentes
import BtnExcluir from './../../components/btnExcluir/btnExcluir';
import DataTableBootstrap from "./../../components/DataTableBootstrap/DataTableBootstrap";
import { useFetch } from "./../../hooks/useFetch";


import api from "../../services/api";

function MainAluno(props) {


  const { addToast } = useToasts(); 
  let DataTableRef = useRef();
  const UpdateDataTable = () => DataTableRef.current();


  // Ações de botão
  function handleDelete(id, name) {
    api.delete('/alunos/' + id, { responseType: 'json' })
      .then(response => {

        if (response.data.status) {
          addToast(`${name} excluído com sucesso`, { appearance: 'success' });
          UpdateDataTable();
        } else {
          addToast('Atenção: ' + response.data.message, { appearance: 'warning' });
        }
        
      })
      .catch(error => {
        addToast('Erro ao excluir ' + name + ':' + error, { appearance: 'error' });
      });
  }

  function handleEdit(id) {
    window.location.href = `/alunos/editar/` + id;
  }


  return (
    <>
      <br /> 

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><h1 className="mt-4">Alunos</h1></span>
        <span style={{ paddingTop: 40 }} >
          <Link to={`/alunos/cadastrar`} className="btn btn-primary">
            <BsFileEarmarkPlus /> Novo Aluno
          </Link>
        </span>
      </div>

      <DataTableBootstrap
        DataTableRef={DataTableRef}
        pageSize={10}
        url="alunos"
        columns={[
          {
            Header: "#Id",
            accessor: "idaluno",
            align: 'center',
            filter: true,
            order: true,
            width: 200
          },
          {
            Header: "Nome",
            accessor: "nome",
            order: true,
            filter: true
          },
          {
            id: "dtatual",
            Header: "Atualizado",
            accessor: "dtatual",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <div>{Moment(e.row.values.dtatual)
                .local()
                .format("DD/MM/YYYY HH:mm")}</div>
            )
          },
          {
            id: "excluir",
            Header: "",
            accessor: "idaluno",
            align: 'center',
            width: 100,
            Cell: (e) => (
              <BtnExcluir
                id={e.row.values.idaluno}
                name={e.row.values.nome}
                onClick={() => handleDelete(e.row.values.idaluno, e.row.values.nome)}
              />
            )
          },
          {
            id: "editar",
            Header: "",
            accessor: "idaluno",
            align: 'center',
            width: 100,
            Cell: (e) => (
              <button className="btn btn-secondary"
                onClick={() => handleEdit(e.row.values.idaluno, e.row.values.nome)} >
                <FiEdit />
              </button>
            )
          }
        ]}
      />

    </>
  );
}

export default MainAluno;