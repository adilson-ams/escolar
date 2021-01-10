# Controle de Alunos - Sistema escolar


O sistema foi dividdo em dois projetos.
- [frontend](https://github.com/adilson-ams/escolar/tree/main/escolar-frontend "frontend"): responsável pela parte client.
- [backend](https://github.com/adilson-ams/escolar/tree/main/escolar-backend "backend"): responsável pelo servidor de dados.

### Introdução

As tecnologias utilizadas foram:
- Banco de dados: Mysql
- Backend: Servidor de aplicação/dados
- Frontemd: React Js

### Instalação

A instalação é divida em 3 fases. Start do banco de dados, start do projeto backend em php, e start da aplicação frontend em react js. 

Em nosso caso é utlizado a containerização via docker, porém pode ser utilizado com a instalação nativa.


#### Banco de dados Mysql:

Com as ferramentas *docker* e *docker-compose* instaladas, execute o seguinte comando no diretório principal do projeto onde se encontra o arquivo *docker-compose.yml*:


Instalação via docker:

Com a ferramenta (docker, docker-compose) instalada, execute:

```sh
$ docker-compose up -d --build
```

Para os ambientes de backend e frontend consulte o README em:

- [frontend](https://github.com/adilson-ams/escolar/tree/main/escolar-frontend "frontend")
- [backend](https://github.com/adilson-ams/escolar/tree/main/escolar-backend "backend")


### Manual do usuário
