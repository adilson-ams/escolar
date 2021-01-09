import React from 'react';
import { Nav, NavItem,  Col } from 'reactstrap';
import {
    Link
} from "react-router-dom";



import './styles.css';


function Sidebar() {

    return (
        <Col className="sidebar" xs="2" >

            <Link className="nav-link" to="/">Inicio</Link>
            <p>Cadastro</p>
            <Nav className="nav" vertical>
                <NavItem>
                    <Link className="nav-link" to="/usuarios">Usuários</Link>
                </NavItem>
                <NavItem>
                    <Link to="/">Link</Link>
                </NavItem>
            </Nav>

            <hr />

            <p>The Cifrando</p>
            <Nav vertical>
                <NavItem>
                    <Link to="/">Artistas</Link>
                </NavItem>
                <NavItem>
                    <Link to="/">Cifras</Link>
                </NavItem>
            </Nav>
        </Col >
    )
}

export default Sidebar;