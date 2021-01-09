import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
    Button
} from 'reactstrap';
import axios from "axios";


import { AiOutlineSave } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";


import { Form } from '@unform/web';

import * as Yup from 'yup';
import Input from './../../../components/form/input/input';
import Select from './../../../components/form/select/select';
import Checkbox from './../../../components/form/checkbox/checkbox';


import { getArrayErros } from './../../../components/form/erros';
import validate from './validate';
import "./styles.css";


import api from "../../../services/api";
import { useFetch } from "./../../../hooks/useFetch";



// Outros componentes
import { useToasts } from 'react-toast-notifications';



const initialData = {
}


const niveis = [
    { value: 1, descricao: "1 - Fundamental" },
    { value: 2, descricao: "2 - Médio" },
]

const turnos = [
    { value: 1, descricao: "1 - Manutino" },
    { value: 2, descricao: "2 - Vespertino" },
]

function EditarTurma(props) {


    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);

    const { id } = useParams();
    const { idescola } = props.match.params;

    const { data, error } = useFetch('/turmas/' + id);


    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            const response = await api.put(`turmas/${id}`, {
                idturma: id,
                ano: dataPost.ano,
                nivel: dataPost.nivel,
                serie: dataPost.serie,
                turno: dataPost.turno
            });

            if (response.data.status) {
                addToast("Registro de escola atualizado com sucesso!", { appearance: 'success' });
                history.push(`/escolas/${idescola}/turmas/`);
            } else {
                addToast("Atenção: " + response.message, { appearance: 'warning' });
            }

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                console.log(err);
                addToast(err.message, { appearance: 'error' });
                formRef.current.setErrors(getArrayErros(err));
            }
        }
    }


    return (
        !data ? 'Carregando...' : renderForm()
    );


    function renderForm() {
        return (

            <div className="content" style={{ marginTop: 15 }}>

                <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit} >
                    <div className="card">
                        <div className="card-body">
                            <div className="e-profile">

                                <div className="col-12">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="" className="active nav-link">
                                                Editar dados de escola
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-3">
                                        <div className="tab-pane active">
                                            <div className="row">
                                                <div className="col">

                                                    <div className="row">
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Input
                                                                    disabled
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Código"
                                                                    name="idturma"
                                                                    defaultValue={data.idturma || ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    disabled
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Descriçao"
                                                                    name="descricao"
                                                                    defaultValue={data.descricao || ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Select
                                                                    obrigatorio
                                                                    label="Nível"
                                                                    className="form-control"
                                                                    name="nivel"
                                                                    selected={data.nivel || ''}
                                                                    datasource={niveis} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Ano"
                                                                    name="ano"
                                                                    defaultValue={data.ano || ''}
                                                                    placeholder="Ano referênte á turma"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Série"
                                                                    name="serie"
                                                                    defaultValue={data.serie || ''}
                                                                    placeholder="Série referênte á turma"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Select
                                                                    obrigatorio
                                                                    label="Turno"
                                                                    className="form-control"
                                                                    name="turno"
                                                                    selected={data.turno || ''}
                                                                    datasource={turnos} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-muted footer-card text-right card-footer">
                        <Link onClick={() => history.goBack() } className="btn btn-secondary"> <RiArrowGoBackLine /> Cancelar </Link>  {'  '}
                        <Button type="submit" color="primary"> <AiOutlineSave size={18} /> Salvar </Button>
                    </div>
                </Form>
            </div>
        );
    }
}



export default EditarTurma;