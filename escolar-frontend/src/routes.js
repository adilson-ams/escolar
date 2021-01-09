import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
 

// Componentes
import LayoutAdmin from './components/header/header'; 


// Funções
import { isAuthenticated } from "./services/auth";


// Páginas
const Login = lazy(() => import("./pages/login/login"));
const Main = lazy(() => import("./pages/main/main"));



/* Usuário *****************************************************  */
const MainUsuario = lazy(() => import("./pages/usuarios/index"));
const CadastrarUsuario = lazy(() => import("./pages/usuarios/cadastrar/cadastrar"));
const EditarUsuario = lazy(() => import("./pages/usuarios/editar/editar"));


/* Escolas *****************************************************  */
const MainEscola = lazy(() => import("./pages/escolas/index"));
const CadastrarEscola = lazy(() => import("./pages/escolas/cadastrar/cadastrar"));
const EditarEscola = lazy(() => import("./pages/escolas/editar/editar"));


/* Turmas *****************************************************  */
const MainTurma = lazy(() => import("./pages/turmas/index"));
const CadastrarTurma = lazy(() => import("./pages/turmas/cadastrar/cadastrar"));
const EditarTurma = lazy(() => import("./pages/turmas/editar/editar"));


/* Alunos *****************************************************  */
const MainAluno = lazy(() => import("./pages/alunos/index"));
const CadastrarAluno = lazy(() => import("./pages/alunos/cadastrar/cadastrar"));
const EditarAluno = lazy(() => import("./pages/alunos/editar/editar"));



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <LayoutAdmin component={<Component {...props} />} />
            ) : (
                    <Redirect to={{ pathname: "/login", state: { from: props.location } }} />
                )
        }
    />
);


const Routes = () => (
    <BrowserRouter>
        <Fragment>
            <Switch>

                {/******* Autenticação ********/}
                <Route path="/Login" exact component={WaitingComponent(Login)} />
                {/* <Route path="/Login/redefinirsenha" component={WaitingComponent(RedefinirSenha)} /> */}


                {/******* Dashboard ********/}
                <PrivateRoute exact path="/" component={WaitingComponent(Main)} />
                {/* <PrivateRoute exact path="/calendario" component={WaitingComponent(Calendario)} /> */}



                {/******* Usuário *********/}
                <PrivateRoute exact path="/usuarios" component={WaitingComponent(MainUsuario)} />
                <PrivateRoute path="/usuarios/cadastrar" component={WaitingComponent(CadastrarUsuario)} />
                <PrivateRoute path="/usuarios/editar/:id" component={WaitingComponent(EditarUsuario)} />
                {/* <PrivateRoute path='/usuario/alterar-senha/:id' component={WaitingComponent(AlterarSenhaUsuario)} /> */}


                {/******* Escolas *********/}
                <PrivateRoute exact path="/escolas" component={WaitingComponent(MainEscola)} />
                <PrivateRoute path="/escolas/cadastrar" component={WaitingComponent(CadastrarEscola)} />
                <PrivateRoute path="/escolas/editar/:id" component={WaitingComponent(EditarEscola)} />


                {/******* Turmas *********/}
                <PrivateRoute exact path="/escolas/:idescola/turmas/" component={WaitingComponent(MainTurma)} />
                <PrivateRoute path="/escolas/:idescola/turmas/cadastrar" component={WaitingComponent(CadastrarTurma)} />
                <PrivateRoute path="/escolas/:idescola/turmas/editar/:id" component={WaitingComponent(EditarTurma)} />


                {/******* Alunos *********/}
                <PrivateRoute exact path="/escolas/:idescola/turmas/:idturma/alunos" component={WaitingComponent(MainAluno)} />
                <PrivateRoute path="/escolas/:idescola/turmas/:idturma/alunos/cadastrar" component={WaitingComponent(CadastrarAluno)} />
                <PrivateRoute path="/escolas/:idescola/turmas/:idturma/alunos/editar/:id" component={WaitingComponent(EditarAluno)} />


                <Route path="*" component={() => <h1>Página não encontrada.</h1>} />
            </Switch>
        </Fragment>
    </BrowserRouter>
);


function WaitingComponent(Component) {
    return props => (
        <Suspense fallback={
            <div style={{ paddingTop: 300 }} >
                <div className="sk-cube-grid" >
                    <div className="sk-cube sk-cube1"></div>
                    <div className="sk-cube sk-cube2"></div>
                    <div className="sk-cube sk-cube3"></div>
                    <div className="sk-cube sk-cube4"></div>
                    <div className="sk-cube sk-cube5"></div>
                    <div className="sk-cube sk-cube6"></div>
                    <div className="sk-cube sk-cube7"></div>
                    <div className="sk-cube sk-cube8"></div>
                    <div className="sk-cube sk-cube9"></div>
                </div>
            </div>
        }>
            <Component {...props} />
        </Suspense>
    );
}


export default Routes;


