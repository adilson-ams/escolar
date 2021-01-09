<?php
namespace Src\TableGateways;


# https://alexandrebbarbosa.wordpress.com/2016/03/14/phppersistencia-de-dados-com-design-pattern-table-data-gateway/
# sse padrão Table Data Gateway provê um meio mais simplificado de manipular uma tabela 

class AlunoGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                idaluno, nome, telefone, email, dtnascimento, genero, dtcadastro, dtatual
            FROM 
                aluno;
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
                idaluno, nome, telefone, email, dtnascimento, genero, dtcadastro, dtatual
            FROM
                aluno
            WHERE 
                idaluno = ?;
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

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO aluno
                ( nome, telefone, email, dtnascimento, genero, dtcadastro, dtatual )
            VALUES
                ( :nome, :telefone, :email, :dtnascimento, :genero, :dtcadastro, :dtatual );
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                'nome'          => $input['nome'], 
                'telefone'      => $input['telefone'], 
                'email'         => $input['email'],
                'dtnascimento'  => $input['dtnascimento'],
                'genero'        => $input['genero'],
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
            UPDATE aluno
            SET 
                nome = :nome,
                telefone = :telefone,
                email = :email,
                dtnascimento = :dtnascimento,
                genero = :genero,
                dtatual = :dtatual
            WHERE 
            idaluno = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $array = array(
                'id' => (int) $id,
                'nome'          => $input['nome'], 
                'telefone'      => $input['telefone'], 
                'email'         => $input['email'],
                'dtnascimento'  => $input['dtnascimento'],
                'genero'        => $input['genero'],
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
                aluno
            WHERE 
                idaluno = :id;
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
