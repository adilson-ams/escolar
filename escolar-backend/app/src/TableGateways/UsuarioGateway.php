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
                idusuario, email
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
                idusuario, email
            FROM
                usuario
            WHERE 
                idusuario = ?;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $statement->execute(array($id));
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }


    public function login(Array $input)
    {
        $statement = "
            SELECT 
                idusuario, email
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
            $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
            return $result;

        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }


    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO usuario
                ( email, senha, dtcadastro, dtatual )
            VALUES
                ( :email, :senha, :dtcadastro, :dtatual );
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                'email'         => $input['email'],
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
                email = :email,
                senha = :senha,
                dtatual = :dtatual
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $array = array(
                'id' => (int) $id,
                'email'         => $input['email'],
                'senha'         => $input['senha'],
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
