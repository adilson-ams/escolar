<?php
require 'bootstrap.php';

$statement = <<<EOS
    CREATE TABLE IF NOT EXISTS person (
        id INT NOT NULL AUTO_INCREMENT,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        firstparent_id INT DEFAULT NULL,
        secondparent_id INT DEFAULT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (firstparent_id)
            REFERENCES person(id)
            ON DELETE SET NULL,
        FOREIGN KEY (secondparent_id)
            REFERENCES person(id)
            ON DELETE SET NULL
    ) ENGINE=INNODB;

    INSERT INTO person
        (id, firstname, lastname, firstparent_id, secondparent_id)
    VALUES
        (1, 'Krasimir', 'Hristozov', null, null),
        (2, 'Maria', 'Hristozova', null, null),
        (3, 'Masha', 'Hristozova', 1, 2),
        (4, 'Jane', 'Smith', null, null),
        (5, 'John', 'Smith', null, null),
        (6, 'Richard', 'Smith', 4, 5),
        (7, 'Donna', 'Smith', 4, 5),
        (8, 'Josh', 'Harrelson', null, null),
        (9, 'Anna', 'Harrelson', 7, 8);


    CREATE TABLE aluno (
        id INT auto_increment NOT NULL,
        nome varchar(100) NOT NULL,
        telefone varchar(11) NULL,
        email varchar(150) NOT NULL,
        dtnascimento DATE NULL,
        genero varchar(50) NULL,
        PRIMARY KEY (id)
     )
    ENGINE=InnoDB


    CREATE TABLE escola (
        id INT auto_increment NOT NULL,
        nome varchar(100) NOT NULL,
        logradouro varchar(150) NULL,
        bairro varchar(150) NULL,
        numero varchar(11) NULL,
        cep varchar(11) NULL,
        cidade varchar(150) NULL,
        uf  char(1) NULL,
        situacao int NOT NULL
        dtcadastro DATE NULL,
        dtatual varchar(50) NULL,
        PRIMARY KEY (id)
     )
    ENGINE=InnoDB


    
    CREATE TABLE turma (
        id INT auto_increment NOT NULL,
        descricao varchar(150) NULL, 
        ano int NOT NULL, 
        nivel int NOT NULL COMMENT '1 - Fundamental, 2 - Médio',
        serie int NOT NULL,
        turno varchar(11) NOT NULL COMMENT '1 - Manutino, 2 - Vespertino',
        PRIMARY KEY (id)
     )
    ENGINE=InnoDB
        

EOS;

try {
    $createTable = $dbConnection->exec($statement);
    echo "Success!\n";
} catch (\PDOException $e) {
    exit($e->getMessage());
}