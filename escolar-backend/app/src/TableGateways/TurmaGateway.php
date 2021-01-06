<?php
namespace Src\TableGateways;


# https://alexandrebbarbosa.wordpress.com/2016/03/14/phppersistencia-de-dados-com-design-pattern-table-data-gateway/
# sse padrão Table Data Gateway provê um meio mais simplificado de manipular uma tabela 

class TurmaGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT
                id, descricao, ano, nivel,  
                CASE nivel 
                    WHEN 1 THEN '1 - Ensino fundamental' 
                    WHEN 2 THEN '2 - Ensino médio'
                END as NivelDescricao,
                serie, 
                turno, 
                idescola
            FROM 
                turma;
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
                id, descricao, 
                ano,
                nivel, 
                CASE nivel 
                    WHEN 1 THEN '1 - Ensino fundamental' 
                    WHEN 2 THEN '2 - Ensino médio'
                END as NivelDescricao,
                serie, turno, idescola
            FROM
                turma
            WHERE id = ?;
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

    public function insert(Array $input)
    {
        $statement = "
            INSERT INTO turma
                (descricao, ano, nivel, serie, turno, idescola, dtcadastro, dtatual)
            VALUES
                ( :descricao, :ano, :nivel, :serie, :turno, :idescola, :dtcadastro, :dtatual);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                'descricao' => $input['serie'] ."º". " série, período " . $input['turno'],
                'ano'   => (int) $input['ano'], 
                'nivel' => (int) $input['nivel'],
                'serie' => (int)  $input['serie'],
                'turno' => $input['turno'], 
                'idescola'  => (int) $input['idescola'],
                'dtcadastro'  => date("Y-m-d H:i:s"),
                'dtatual'  => date("Y-m-d H:i:s"),
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
            UPDATE turma
            SET 
                descricao = :descricao,
                ano = :ano,
                nivel = :nivel,
                serie = :serie,
                turno = :turno,
                idescola = :idescola,
                dtatual = :dtatual
            WHERE 
                id = :id;
        ";

        try {

            $statement = $this->db->prepare($statement);
            $array = array(
                'id' => (int) $id,
                'descricao' => $input['serie'] ."º". " série, período " . $input['turno'], 
                'ano' => $input['ano'],
                'nivel' => $input['nivel'],
                'serie' => $input['serie'],
                'turno' => $input['turno'],
                'idescola' => $input['idescola'],
                'dtatual' => date("Y-m-d H:i:s")
            );

            $statement->execute( $array ) or die( print_r( $statement->errorInfo() , true ) );

            return $statement->rowCount();
        } catch (\PDOException $e) {
            exit($e->getMessage());
        }    
    }

    public function delete($id)
    {
        $statement = "
            DELETE FROM 
                turma
            WHERE id = :id;
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
