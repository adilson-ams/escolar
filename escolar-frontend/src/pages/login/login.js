import React, { useState } from 'react';
import { Link } from "react-router-dom";

// Icons
import { FaSignInAlt } from "react-icons/fa";
import { BsFillEnvelopeFill, BsQuestion } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri"; 
import { login } from "../../services/auth";

// Outros componentes
import { useToasts } from 'react-toast-notifications';

import api from "../../services/api";

import './login.css';


function Login() {

    
    const { addToast } = useToasts();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    
    async function handleLogin() { 
        
        const response = await api.post(`usuarios/login`, {
            email: email,
            senha: senha
        });
  
        if (response.data.status) {
            login(response.data.token, response.data.result);
            window.location.href = "/";
        } else {
            addToast("Atenção: " + response.data.message, { appearance: 'warning' });
        } 

    }
 
    
    return (
        <form className="form-signin">

            <img className="mb-4 logo" src="https://getbootstrap.com/docs/4.5/assets/brand/bootstrap-solid.svg" alt="Logo" width="72" height="72" />

            <h1 className="h3 mb-3 font-weight-normal text-center">Painel Administrativo</h1>

            <div className="form-group">
                <label for="email">E-mail</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><BsFillEnvelopeFill /></span>
                    </div>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        placeholder="Digite sua senha"
                        aria-label="Digite sua senha"
                        aria-describedby="basic-addon1" />
                </div>
            </div>



            <div className="form-group">
                <label for="senha">Senha</label>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon1"><RiLockPasswordLine /></span>
                    </div>
                    <input
                        type="password"
                        id="senha"
                        name="senha"
                        value={senha}
                        onChange={event => setSenha(event.target.value)}
                        className="form-control"
                        placeholder="Digite sua senha"
                        aria-label="Digite sua senha"
                        aria-describedby="basic-addon1" />
                </div>
            </div>



            <div className="checkbox mb-3 text-right">
                <label>
                   <Link className="nav-link" to="lembrar-senha" >Esqueci minha senha. (<BsQuestion size={20} />)</Link>
                </label>
            </div>

            <button
                type="button"
                onClick={handleLogin}
                className="btn btn-lg btn-primary btn-block" >
                <FaSignInAlt /> Entrar
                </button>

            <p className="mt-5 mb-3 text-muted text-center">
                &copy;{new Date().getFullYear()} - Todos os direitos reservados a <a href="http://www.adilsonmoraesdasilva.com.br">AMS</a>
            </p>

        </form>
    );

}



export default Login;