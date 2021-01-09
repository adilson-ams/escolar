import React, { useRef } from 'react';
import Moment from 'moment';


// Icones
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { ImUsers } from "react-icons/im";


import { Link } from "react-router-dom";

// Hooks
import { useToasts } from 'react-toast-notifications';


// Outros componentes
import BtnExcluir from './../../components/btnExcluir/btnExcluir';
import DataTableBootstrap from "./../../components/DataTableBootstrap/DataTableBootstrap";
import { useFetch } from "./../../hooks/useFetch";


import api from "../../services/api";

function MainTurma(props) {


  const { addToast } = useToasts();
  const { idescola } = props.match.params;


  const { data: dataEscola, error } = useFetch('/turmas/' + idescola);

  let DataTableRef = useRef();
  const UpdateDataTable = () => DataTableRef.current();


  // Ações de botão
  function handleDelete(id, name) {
    api.delete('/turmas/' + id, { responseType: 'json' })
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
    window.location.href = `/escolas/${idescola}/turmas/editar/` + id;
  }

  function handleAluno(id) {
    window.location.href = `/escolas/${idescola}/turmas/${id}/alunos/`;
  }

  return (
    <> 
      <br />  
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to={"/escolas/"} >
                Escolas
            </Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/escolas/editar/${idescola}` } >
                {dataEscola !== undefined ? dataEscola.nome : ''}
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">Turmas</li>
          </ol>
        </nav>


      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><h1 className="mt-4">Turmas</h1></span>
        <span style={{ paddingTop: 40 }} >
          <Link to={`/escolas/${idescola}/turmas/cadastrar`} className="btn btn-primary"><BsFileEarmarkPlus /> Nova Turma</Link>
        </span>
      </div>

      <DataTableBootstrap
        DataTableRef={DataTableRef}
        pageSize={10}
        url="turmas"
        columns={[
          {
            Header: "#Id",
            accessor: "idturma",
            align: 'center',
            filter: true,
            order: true,
            width: 200
          },
          {
            Header: "Descrição",
            accessor: "descricao",
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
            id: "aluno",
            Header: "",
            accessor: "idaluno",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <button className="btn btn-primary"
                onClick={() => handleAluno(e.row.values.idturma, e.row.values.descricao)} >
                <ImUsers />
              </button>
            )
          },
          {
            id: "excluir",
            Header: "",
            accessor: "idaluno",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <BtnExcluir
                id={e.row.values.idturma}
                name={e.row.values.email}
                onClick={() => handleDelete(e.row.values.idturma, e.row.values.descricao)}
              />
            )
          },
          {
            id: "editar",
            Header: "",
            accessor: "idaluno",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <button className="btn btn-secondary"
                onClick={() => handleEdit(e.row.values.idturma, e.row.values.descricao)} >
                <FiEdit />
              </button>
            )
          }
        ]}
      />

    </>
  );
}



export default MainTurma;
