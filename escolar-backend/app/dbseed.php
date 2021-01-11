<?php
require 'bootstrap.php';

$statement = <<<EOS
    
    CREATE DATABASE `dbescolar`;

    CREATE TABLE `aluno` (
        `idaluno` int(11) NOT NULL AUTO_INCREMENT,
        `nome` varchar(100) NOT NULL,
        `telefone` varchar(12) DEFAULT NULL,
        `email` varchar(150) NOT NULL,
        `dtnascimento` date DEFAULT NULL,
        `genero` varchar(50) DEFAULT NULL,
        `dtcadastro` datetime NOT NULL,
        `dtatual` datetime NOT NULL,
        PRIMARY KEY (`idaluno`)
      ) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

      CREATE TABLE `escola` (
        `idescola` int(11) NOT NULL AUTO_INCREMENT,
        `nome` varchar(100) NOT NULL,
        `logradouro` varchar(150) DEFAULT NULL,
        `bairro` varchar(150) DEFAULT NULL,
        `numero` varchar(11) DEFAULT NULL,
        `cep` varchar(11) DEFAULT NULL,
        `cidade` varchar(150) DEFAULT NULL,
        `uf` char(2) DEFAULT NULL,
        `situacao` int(11) NOT NULL,
        `dtcadastro` datetime NOT NULL,
        `dtatual` datetime NOT NULL,
        PRIMARY KEY (`idescola`)
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

      CREATE TABLE `matriculado` (
        `idmatriculado` int(11) NOT NULL AUTO_INCREMENT,
        `idaluno` int(11) NOT NULL,
        `idturma` int(11) NOT NULL,
        PRIMARY KEY (`idmatriculado`)
      ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

      CREATE TABLE `turma` (
        `idturma` int(11) NOT NULL AUTO_INCREMENT,
        `descricao` varchar(150) DEFAULT NULL,
        `ano` int(11) NOT NULL,
        `nivel` int(11) NOT NULL COMMENT '1 - Fundamental, 2 - Médio',
        `serie` int(11) NOT NULL,
        `turno` int(11) NOT NULL COMMENT '1 - Manutino, 2 - Vespertino',
        `idescola` int(11) DEFAULT NULL,
        `dtcadastro` datetime NOT NULL,
        `dtatual` datetime NOT NULL,
        PRIMARY KEY (`idturma`),
        KEY `turma_FK` (`idescola`),
        CONSTRAINT `turma_FK` FOREIGN KEY (`idescola`) REFERENCES `escola` (`idescola`)
      ) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


      CREATE TABLE `usuario` (
        `idusuario` int(11) NOT NULL AUTO_INCREMENT,
        `email` varchar(100) DEFAULT NULL,
        `senha` varchar(255) DEFAULT NULL,
        `dtcadastro` datetime NOT NULL,
        `dtatual` datetime NOT NULL,
        `nome` varchar(100) NOT NULL,
        `sobre` text,
        PRIMARY KEY (`idusuario`)
      ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
      
    
        

EOS;

try {
    $createTable = $dbConnection->exec($statement);
    echo "Success!\n";
} catch (\PDOException $e) {
    exit($e->getMessage());
}