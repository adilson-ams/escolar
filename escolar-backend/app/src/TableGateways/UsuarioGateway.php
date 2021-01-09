<?php
namespace Src\TableGateways;


# https://alexandrebbarbosa.wordpress.com/2016/03/14/phppersistencia-de-dados-com-design-pattern-table-data-gateway/
# sse padrão Table Data Gateway provê um meio mais simplificado de manipular uma tabela 

class UsuarioGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                idusuario, nome, email, sobre
            FROM 
                usuario;
        ";

        try {
            $statement = $this->db->query($statement);
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }
    }

    public function find($id)
    { 
        $statement = "
            SELECT 
                idusuario, nome, email, sobre
            FROM
                usuario
            WHERE 
                idusuario = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetch(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }


    public function login(Array $input)
    {
        $statement = "
            SELECT 
                idusuario, nome, email, sobre
            FROM
                usuario
            WHERE 
                email = ? AND senha = ?
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                $input['email'],
                $input['senha'
            ]); 

            $statement->execute( $array ) or die(print_r($statement->errorInfo(), true));
            $result = $statement->fetch(\PDO::FETCH_ASSOC);
            return $result;

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }


    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO usuario
                ( nome, email, senha, sobre, dtcadastro, dtatual )
            VALUES
                ( :nome, :email, :senha, :sobre, :dtcadastro, :dtatual );
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                'nome'         => $input['nome'],
                'email'         => $input['email'],
                'sobre'         => $input['sobre'],
                'senha'         => $input['senha'],
                'dtcadastro'    => date("Y-m-d H:i:s"),
                'dtatual'       => date("Y-m-d H:i:s")
            ); 

            $statement->execute( $array ) or die(print_r($statement->errorInfo(), true));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function update($id, Array $input)
    {
        $statement = "
            UPDATE usuario
            SET 
                nome = :nome,
                email = :email,
                sobre = :sobre,
                dtatual = :dtatual
            WHERE 
                idusuario = :idusuario ;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $array = array(
                'idusuario' => $id,
                'nome'         => $input['nome'],
                'email'         => $input['email'],
                'sobre'         => $input['sobre'],
                'dtatual'       => date("Y-m-d H:i:s")
            );
            
            $statement->execute( $array ) or die(print_r($statement->errorInfo(), true));

            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM 
                usuario
            WHERE idusuario = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array('id' => $id));
            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }
}
