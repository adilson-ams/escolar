import React, { useRef } from "react";
import Moment from 'moment';
import { useHistory } from "react-router-dom";
import {
    Button
} from 'reactstrap';
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



// Outros componentes
import { useToasts } from 'react-toast-notifications';



const initialData = {
}

const generos = [
    { value: '1', descricao: "Masculino" },
    { value: '2', descricao: "Feminino" },
    { value: '3', descricao: "Transsexual" }
]

function CadastrarAlunosMatriculados(props) {

    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);

    const { idescola, idturma } = props.match.params;


    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            const response = await api.post(`alunos/`, {
                idturma: idturma,
                nome: dataPost.nome,
                telefone: dataPost.telefone,
                email: dataPost.email,
                dtnascimento: Moment(dataPost.dtnascimento).format("YYYY/MM/DD"),
                genero: dataPost.genero
            });

            if (response.data.status) {
                addToast("Nova escola cadastrada com sucesso!", { appearance: 'success' });
                history.push(`/escolas/${idescola}/turmas/${idturma}/alunos`);
            } else {
                addToast("Atenção: " + response.data.message, { appearance: 'warning' });
            }

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                addToast(err.message, { appearance: 'error' });
                formRef.current.setErrors(getArrayErros(err));
            }
        }
    }
 

    return (
        <div className="content" style={{ marginTop: 15 }}>
            <Form ref={formRef} initialData={initialData} onSubmit={handleSubmit} >

                <div className="card">
                    <div className="card-body">
                        <div className="e-profile">
                            <div className="row">


                                <div className="col-12">
                                    <ul className="nav nav-tabs">
                                        <li className="nav-item">
                                            <a href="" className="active nav-link">
                                                Matricular aluno
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
                                                                    placeholder="Nome do Aluno"
                                                                />
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
                </div>
                <div className="text-muted footer-card text-right card-footer">
                    <Button onClick={() => history.goBack()} className="btn btn-secondary"> <RiArrowGoBackLine /> Cancelar </Button>  {'  '}
                    <Button type="submit" color="primary"> <AiOutlineSave size={18} /> Salvar </Button>
                </div>
            </Form>
        </div>
    );
}



export default CadastrarAlunosMatriculados;