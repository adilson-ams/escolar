import React, { useRef, useState, useEffect } from 'react';


// import RTBOdataTable from "./../../components/RTBOdataTable/RTBOdataTable";
import DataTableBootstrap from "./../../components/DataTableBootstrap/DataTableBootstrap";



// Icones
import { BsFileEarmarkPlus } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

// Hooks
import { useToasts } from 'react-toast-notifications';
import { useFetch } from "./../../hooks/useFetch";


// Outros componentes
import BtnExcluir from './../../components/btnExcluir/btnExcluir';

import api from "../../services/api";

function MainUsuario() {


  const { addToast } = useToasts();



  let DataTableRef = useRef();
  const UpdateDataTable = () => DataTableRef.current();


  // Ações de botão
  function handleDelete(id, name) {
    api.delete('/usuarios/' + id, { responseType: 'json' })
      .then(response => {

        if (response.status) {
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
    
    window.location.href = "/usuarios/editar/" + id;
  }


  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span><h1 className="mt-4">Usuários</h1></span>
        <span style={{ paddingTop: 40 }} >
          <Link to="/usuarios/cadastrar" className="btn btn-primary"><BsFileEarmarkPlus /> Novo Usuário</Link>
        </span>
      </div>

      <DataTableBootstrap
        DataTableRef={DataTableRef}
        pageSize={10}
        url="usuarios"
        columns={[
          {
            Header: "#Id",
            accessor: "idusuario",
            align: 'center',
            filter: true,
            order: true,
            width: 200
          },
          {
            Header: "E-mail",
            accessor: "email",
            order: true,
            filter: true
          },
          {
            id: "excluir",
            Header: "",
            accessor: "idusuario",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <BtnExcluir
                id={e.row.values.idusuario}
                name={e.row.values.email}
                onClick={() => handleDelete(e.row.values.idusuario, e.row.values.email)}
              />
            )
          },
          {
            id: "editar",
            Header: "",
            accessor: "Id",
            align: 'center',
            width: 150,
            Cell: (e) => (
              <button className="btn btn-secondary"
                onClick={() => handleEdit(e.row.values.idusuario, e.row.values.email)} >
                <FiEdit />
              </button>
            )
          }
        ]}
      />

    </>
  );
}



export default MainUsuario;
