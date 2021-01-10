import React, { useRef } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import {
    Button
} from 'reactstrap';
import Moment from 'moment';


import { AiOutlineSave } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";


import { Form } from '@unform/web';

import * as Yup from 'yup';
import Input from './../../../components/form/input/input';
import Select from './../../../components/form/select/select';


import { getArrayErros } from './../../../components/form/erros';
import validate from './validate';
import "./styles.css";


import api from "../../../services/api";
import { useFetch } from "./../../../hooks/useFetch";



// Outros componentes
import { useToasts } from 'react-toast-notifications';



const initialData = {
}


const generos = [
    { value: '1', descricao: "Masculino" },
    { value: '2', descricao: "Feminino" },
    { value: '3', descricao: "Transsexual" }
]

function EditarAlunosMatriculados(props) {


    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);

    const { id } = useParams();
    const { idescola, idturma } = props.match.params;

    const { data, error } = useFetch('/alunos/' + id);


    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            const response = await api.put(`alunos/${id}`, {
                idaluno: id,
                nome: dataPost.nome,
                telefone: dataPost.telefone,
                email: dataPost.email,
                dtnascimento: Moment(dataPost.dtnascimento).format("YYYY/MM/DD"),
                genero: dataPost.genero
            });

            if (response.data.status) {
                addToast("Registro de aluno atualizado com sucesso!", { appearance: 'success' });
                history.push(`/escolas/${idescola}/turmas/${idturma}/alunos`);
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
                                                Editar dados do aluno
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="tab-content pt-3">
                                        <div className="tab-pane active">
                                            <div className="row">
                                                <div className="col">

                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Nome"
                                                                    name="nome"
                                                                    value={data.nome || ''}
                                                                    placeholder="Nome do Aluno"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="date"
                                                                    label="Data de Nascimento"
                                                                    name="dtnascimento"
                                                                    value={data.dtnascimento || ''}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Telefone"
                                                                    name="telefone"
                                                                    value={data.telefone || ''}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="email"
                                                                    label="E-mail"
                                                                    name="email"
                                                                    value={data.email || ''}
                                                                    placeholder="Digite o e-mail do aluno"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-3">
                                                            <div className="form-group">
                                                                <Select
                                                                    obrigatorio
                                                                    label="Como você se identifica?"
                                                                    className="form-control"
                                                                    name="genero"
                                                                    selected={data.genero || ''}
                                                                    datasource={generos} >
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



export default EditarAlunosMatriculados;