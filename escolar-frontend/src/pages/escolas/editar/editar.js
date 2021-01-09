import React, { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
 
const dataUf = [
    { value: "AM", descricao: "Amazonas"}
]

function EditarEscola() {

    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);

    const { id } = useParams();

    const { data, error } = useFetch('/escolas/' + id);
    const [dataForm, setDataForm] = useState({});


    useEffect(() => {
        if (data) {
            setDataForm(data);
        }
    }, [data])


    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({});

            const response = await api.put(`escolas/${id}`, {
                idescola: id,
                nome: dataPost.nome,
                logradouro: dataPost.logradouro,
                bairro: dataPost.bairro,
                numero: dataPost.numero,
                cep: dataPost.cep,
                cidade: dataPost.cidade,
                uf: dataPost.uf,
                situacao: dataPost.situacao === 'on' ? true : false
            });

            if (response.data.status) {
                addToast("Registro de escola atualizado com sucesso!", { appearance: 'success' });
                history.push('/escolas');
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


    async function buscaEndereco(cep) {

        if (cep.length === 8) {
            const response = await axios.get(`https://estuda.com/apps/api/cep?q=${cep}`);
            if (response.status) {

                if (!response.erro) {
                    var mutate =
                    {
                        "bairro": response.data.cep.bairro,
                        "cep": cep,
                        "cidade": response.data.cep.cidade,
                        "dtatual": dataForm.dtatual,
                        "dtcadastro": "2021-01-05 18:45:51",
                        "idescola": "2",
                        "logradouro": response.data.cep.logradouro,
                        "nome": "Hélio de souza vieira",
                        "numero": data.numero,
                        "situacao": "1",
                        "uf": response.data.cep.uf
                    };

                    setDataForm(mutate);
                }

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
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Nome"
                                                                    name="nome"
                                                                    defaultValue={dataForm.nome || ''}
                                                                    placeholder="Digite seu nome"
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
                                                                    label="Cep"
                                                                    name="cep"
                                                                    defaultValue={dataForm.cep || ''}
                                                                    onChange={(e) => buscaEndereco(e.target.value)}
                                                                    placeholder="Rua, avenida, travessa.."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Logradouro"
                                                                    name="logradouro"
                                                                    defaultValue={dataForm.logradouro || ''}
                                                                    placeholder="Rua, avenida, travessa.."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Numero"
                                                                    name="numero"
                                                                    defaultValue={dataForm.numero || ''}
                                                                    placeholder=""
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Bairro"
                                                                    name="bairro"
                                                                    defaultValue={dataForm.bairro || ''}
                                                                    placeholder="Rua, avenida, travessa.."
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col">
                                                            <div className="form-group">
                                                                <Input
                                                                    obrigatorio
                                                                    type="text"
                                                                    label="Município"
                                                                    name="cidade"
                                                                    defaultValue={dataForm.cidade || ''}
                                                                    placeholder="Município/Distrito"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-2">
                                                            <div className="form-group">
                                                                <Select
                                                                    obrigatorio
                                                                    label="Estado"
                                                                    className="form-control"
                                                                    name="uf"
                                                                    selected={dataForm.uf || ''}
                                                                    datasource={dataUf} >
                                                                </Select>
                                                            </div>
                                                        </div>
                                                    </div> 

                                                    <div className="row">
                                                        <div className="col mb-3">
                                                            <label>Situação:</label>
                                                            <Checkbox
                                                                label="Ativo"
                                                                name="ativo"
                                                                defaultChecked={dataForm.situacao || ''}
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
                    <div className="text-muted footer-card text-right card-footer">
                        <Button onClick={() => history.goBack()} className="btn btn-secondary"> <RiArrowGoBackLine /> Cancelar </Button>  {'  '}
                        <Button type="submit" color="primary"> <AiOutlineSave size={18} /> Salvar </Button>
                    </div>
                </Form>
            </div>
        );
    }
}



export default EditarEscola;