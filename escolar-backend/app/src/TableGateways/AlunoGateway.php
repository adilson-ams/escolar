<?php

namespace Src\TableGateways;

use Src\Helpers\Paginator;

class AlunoGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll($params)
    {

        $statement = "
            SELECT 
                count(*) as count
            FROM 
                aluno;
        ";
 
        // filtros
        if( $params['$filter'] ){
            $statement .= " WHERE " . $params['$filter'];
        }
        
         $statement = $this->db->query($statement);
         $result = $statement->fetch(\PDO::FETCH_ASSOC);
         $total = $result["count"]; 
   
         $statement = "
            SELECT 
                idaluno, nome, telefone, email, dtnascimento, genero, dtcadastro, dtatual
            FROM 
                aluno
        ";

        // filtros
        if( $params['$filter'] ){
            $statement .= " WHERE " . $params['$filter'];
        }

        // ordernacao
        if( $params['$orderby'] ){
            $statement .= " ORDER BY " . $params['$orderby'];
        }

        // paginacao
        if( $params['$top'] ){
            
            $statement .= " LIMIT " ;
            
            if($params['$skip']){
                $statement .= $params['$skip'] . ",";
            }
            $statement .= $params['$top'];
        }

 
         $statement = $this->db->query($statement);
         $result = $statement->fetchAll(\PDO::FETCH_ASSOC);
         return array( "values" => $result, "@odata.count" => $total ); 
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
