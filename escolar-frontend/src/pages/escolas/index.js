import React, { useRef } from 'react';
import Moment from 'moment';


// import RTBOdataTable from "./../../components/RTBOdataTable/RTBOdataTable";
import DataTableBootstrap from "./../../components/DataTableBootstrap/DataTableBootstrap";



// Icones
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";


import { Link } from "react-router-dom";

// Hooks
import { useToasts } from 'react-toast-notifications';


// Outros componentes
import BtnExcluir from './../../components/btnExcluir/btnExcluir';

import api from "../../services/api";

function MainEscola() {


  const { addToast } = useToasts();



  let DataTableRef = useRef();
  const UpdateDataTable = () => DataTableRef.current();


  // Ações de botão
  function handleDelete(id, name) {
    api.delete('/escolas/' + id, { responseType: 'json' })
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

  function handleEdit(id)
  {    
    window.location.href = "/turmas/" + id;
  }

  function handleTurmas(id)
  {    
    window.location.href = `/escolas/${id}/turmas`;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><h1 className="mt-4">Escolas</h1></span>
        <span style={{ paddingTop: 40 }} >
          <Link to="/escolas/cadastrar" className="btn btn-primary"><BsFileEarmarkPlus /> Novo Usuário</Link>
        </span>
      </div>

 
      <DataTableBootstrap
        DataTableRef={DataTableRef}
        pageSize={10}
        url="escolas"
        columns={[
          {
            Header: "#Id",
            accessor: "idescola",
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
              <div>{ Moment(e.row.values.dtatual)
                .local()
                .format("DD/MM/YYYY HH:mm")}</div>
            )
          },
          {
            id: "Turmas",
            Header: "Turmas",
            accessor: "idescola",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <button 
                alt="Turmas" 
                type="button" 
                className="btn btn-primary"
                onClick={() => handleTurmas(e.row.values.idescola)}
                >
                <SiGoogleclassroom />
              </button>
            )
          },
          {
            id: "excluir",
            Header: "",
            accessor: "idescola",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <BtnExcluir
                id={e.row.values.idescola}
                name={e.row.values.email}
                onClick={() => handleDelete(e.row.values.idescola, e.row.values.nome)}
              />
            )
          },
          {
            id: "editar",
            Header: "",
            accessor: "idescola",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <button className="btn btn-secondary"
                onClick={() => handleEdit(e.row.values.idescola, e.row.values.nome)} >
                <FiEdit />
              </button>
            )
          }
        ]}
      />

    </>
  );
}



export default MainEscola;
