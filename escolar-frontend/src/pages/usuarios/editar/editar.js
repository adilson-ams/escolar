import React, { useRef, useState, useEffect } from "react";
import { useHistory, useParams, useRouteMatch } from "react-router-dom";
import {
    Button,
    Progress
} from 'reactstrap';
import { AiOutlineSave } from "react-icons/ai";
import { RiArrowGoBackLine } from "react-icons/ri";


import { Form } from '@unform/web';

import * as Yup from 'yup';
import InputPassword from './../../../components/form/input-password/input-password';
import Input from './../../../components/form/input/input';
import Textarea from './../../../components/form/textarea/textarea';
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






function EditarUsuario() {

    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);

    const [forcaSenha, setForcaSenha] = useState('');
    const { id } = useParams();

    const { data, error, mutate } = useFetch('/usuarios/' + id);


    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({}); 

            const response = await api.put(`usuarios/${id}`, {
                idusuario: id,
                nome: dataPost.nome,
                email: dataPost.email,
                senha: dataPost.senha,
                sobre: dataPost.sobre
            });
 
            if (response.data.status) {
                addToast("Novo usuário cadastrado com sucesso!", { appearance: 'success' });
                history.push('/usuarios');
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




    function checkForcaSenha(senha) {
        var forca = 0;

        var regLetrasMa = /[A-Z]/;
        var regLetrasMi = /[a-z]/;
        var regNumero = /[0-9]/;
        var regEspecial = /[!@#$%&*?]/;

        var tam = false;
        var tamM = false;
        var letrasMa = false;
        var letrasMi = false;
        var numero = false;
        var especial = false;


        if (senha.length >= 6) tam = true;
        if (senha.length >= 10) tamM = true;
        if (regLetrasMa.exec(senha)) letrasMa = true;
        if (regLetrasMi.exec(senha)) letrasMi = true;
        if (regNumero.exec(senha)) numero = true;
        if (regEspecial.exec(senha)) especial = true;

        if (tam) forca += 10;
        if (tamM) forca += 10;
        if (letrasMa) forca += 10;
        if (letrasMi) forca += 10;
        if (letrasMa && letrasMi) forca += 20;
        if (numero) forca += 20;
        if (especial) forca += 20;


        return forca;
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
                                <div className="row">

                                    <div className="col-10">
                                        <ul className="nav nav-tabs">
                                            <li className="nav-item"><a href="" className="active nav-link">Configurações</a></li>
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
                                                                        defaultValue={data.nome || ''}
                                                                        placeholder="Digite seu nome"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <Input
                                                                        obrigatorio
                                                                        type="email"
                                                                        label="E-mail"
                                                                        name="email"
                                                                        defaultValue={data.email || ''}
                                                                        placeholder="Digite seu e-mail de login, ex: user@example.com"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col mb-3">
                                                                <div className="form-group">
                                                                    <Textarea
                                                                        rows="5"
                                                                        label="Sobre"
                                                                        name="sobre"
                                                                        defaultValue={data.sobre || ''}
                                                                        placeholder="Escreva algo sobre o usuário."
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12 col-sm-4 mb-3">
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <InputPassword
                                                                        obrigatorio
                                                                        label="Password"
                                                                        onChange={event => setForcaSenha(event.target.value)}
                                                                        name="senha" />
                                                                    {forcaSenha &&
                                                                        <Progress multi>
                                                                            <Progress bar value={checkForcaSenha(forcaSenha)} max={100}>{checkForcaSenha(forcaSenha)} %</Progress>
                                                                        </Progress>
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="form-group">
                                                                    <InputPassword
                                                                        obrigatorio
                                                                        label="Confirmar Password"
                                                                        name="confsenha"
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
}



export default EditarUsuario;

