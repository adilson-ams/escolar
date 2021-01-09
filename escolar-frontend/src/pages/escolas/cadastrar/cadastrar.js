import React, { useRef } from "react";
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
import Checkbox from './../../../components/form/checkbox/checkbox';


import { getArrayErros } from './../../../components/form/erros';
import validate from './validate';
import "./styles.css";


import api from "../../../services/api"; 



// Outros componentes
import { useToasts } from 'react-toast-notifications';



const initialData = {
}






function CadastrarEscola() {

    let history = useHistory();
    const { addToast } = useToasts();
    const formRef = useRef(null);
 



    async function handleSubmit(dataPost, { }) {

        try {

            await validate.validate(dataPost, {
                abortEarly: false
            });

            formRef.current.setErrors({});
 
            const response = await api.post(`escolas/`, {
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
                addToast("Nova escola cadastrada com sucesso!", { appearance: 'success' });
                history.push('/escolas');
            } else {
                addToast("Atenção: " + response.data.message, { appearance: 'warning' });
            }

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                console.log(err);
                addToast(err.message, { appearance: 'error' });
                formRef.current.setErrors(getArrayErros(err));
            }
        }
    }


    async function buscaEndereco(e) {
        console.log(e);
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
                                                Cadastro de novas escolas
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
                                                                        name="logradouro"
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
                                                                        placeholder="Município/Distrito"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="col-2">
                                                                <div className="form-group">
                                                                    <Select obrigatorio label="Estado" className="form-control" type="text" name="uf" >
                                                                        <option value="">Selecione</option>
                                                                        <option value="AC">Acre</option>
                                                                        <option value="AL">Alagoas</option>
                                                                        <option value="AP">Amapá</option>
                                                                        <option value="AM">Amazonas</option>
                                                                        <option value="BA">Bahia</option>
                                                                        <option value="CE">Ceará</option>
                                                                        <option value="DF">Distrito Federal</option>
                                                                        <option value="ES">Espirito Santo</option>
                                                                        <option value="GO">Goiás</option>
                                                                        <option value="MA">Maranhão</option>
                                                                        <option value="MS">Mato Grosso do Sul</option>
                                                                        <option value="MT">Mato Grosso</option>
                                                                        <option value="MG">Minas Gerais</option>
                                                                        <option value="PA">Pará</option>
                                                                        <option value="PB">Paraíba</option>
                                                                        <option value="PR">Paraná</option>
                                                                        <option value="PE">Pernambuco</option>
                                                                        <option value="PI">Piauí</option>
                                                                        <option value="RJ">Rio de Janeiro</option>
                                                                        <option value="RN">Rio Grande do Norte</option>
                                                                        <option value="RS">Rio Grande do Sul</option>
                                                                        <option value="RO">Rondônia</option>
                                                                        <option value="RR">Roraima</option>
                                                                        <option value="SC">Santa Catarina</option>
                                                                        <option value="SP">São Paulo</option>
                                                                        <option value="SE">Sergipe</option>
                                                                        <option value="TO">Tocantins</option>
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
                <div className="text-muted footer-card text-right card-footer">
                    <Button onClick={() => history.goBack()} className="btn btn-secondary"> <RiArrowGoBackLine /> Cancelar </Button>  {'  '}
                    <Button type="submit" color="primary"> <AiOutlineSave size={18} /> Salvar </Button>
                </div>
            </Form>
        </div>
    );
}



export default CadastrarEscola;

