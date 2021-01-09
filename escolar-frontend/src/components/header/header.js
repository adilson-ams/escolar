import React, { useState } from 'react';
import { Nav, NavItem, Collapse, NavbarToggler, UncontrolledDropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink, Button } from 'reactstrap';
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

import { useHistory, Link } from "react-router-dom";


import { FiLogOut } from "react-icons/fi";


import { logout } from "../../services/auth";


import './styles.css';

export default function LayoutAdmin(props) {


    let history = useHistory();

    const [isOpen, setIsOpen] = useState(false);
    const [toggle, setToggle] = useState(false);

    function handleLogout() {
        logout();
        history.push('/login');
    }


    return (
        <>
            <div className={isOpen ? 'd-flex toggled' : 'd-flex'} id="wrapper">
                <div className="border-right bg-secondary" id="sidebar-wrapper">

                    <div className="sidebar-heading">Start Bootstrap </div>


                    <div className="list-group list-group-flush ">
                        <Link to="/" className={(window.location.pathname === '/' ? 'list-group-item active' : 'list-group-item')}>
                            Dashboard
                        </Link>

                        <Link to="/escolas" className={(window.location.pathname === '/escolas' ? 'list-group-item active' : 'list-group-item ')}>
                            Escolas
                        </Link>

                        {/* <Link to="/Trumas" className={(window.location.pathname === '/artistas' ? 'list-group-item active' : 'list-group-item ')}>
                            Artistas
                        </Link> */}

                        <Link to="/usuarios" className={(window.location.pathname === '/usuarios' ? 'list-group-item active' : 'list-group-item ')}>
                            Usuários
                        </Link>

                    </div>

                </div>

                <div id="page-content-wrapper">

                    <Nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">

                        <Button onClick={() => setIsOpen(!isOpen)} outline id="menu-toggle">
                            {isOpen ? <BsToggleOff /> : <BsToggleOn />}
                        </Button>


                        <NavbarToggler onClick={() => setToggle(!toggle)} />
                        <Collapse isOpen={toggle} navbar>
                            <Nav className="mr-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>Options</DropdownToggle>
                                    <DropdownMenu right>
                                        <DropdownItem>Option 1</DropdownItem>
                                        <DropdownItem>Option 2</DropdownItem>
                                        <DropdownItem divider />
                                        <DropdownItem>Reset</DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret><FaUserCircle size={25} /> Adilson M.</DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>Option 1</DropdownItem>
                                    <DropdownItem>Option 2</DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem onClick={() => { handleLogout() }}>
                                        <FiLogOut /> Sair
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Collapse>
                    </Nav>

                    <div className="container-fluid">
                        {props.component}
                    </div>

                </div>

            </div>


        </>
    )

}
