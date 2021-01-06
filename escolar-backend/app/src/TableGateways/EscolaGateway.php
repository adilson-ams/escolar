<?php
namespace Src\TableGateways;


# https://alexandrebbarbosa.wordpress.com/2016/03/14/phppersistencia-de-dados-com-design-pattern-table-data-gateway/
# sse padrão Table Data Gateway provê um meio mais simplificado de manipular uma tabela 

class EscolaGateway {

    private $db = null;

    public function __construct($db)
    {
        $this->db = $db;
    }

    public function findAll()
    {
        $statement = "
            SELECT 
                id, nome, logradouro, bairro, numero, cep, cidade, uf, situacao, dtcadastro, dtatual
            FROM 
                escola;
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
                id, nome, logradouro, bairro, numero, cep, cidade, uf, situacao, dtcadastro, dtatual
            FROM
                escola
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
            INSERT INTO escola
                (nome, logradouro, bairro, numero, cep, cidade, uf, situacao, dtcadastro, dtatual)
            VALUES
                (:nome, :logradouro, :bairro, :numero, :cep, :cidade, :uf, :situacao, :dtcadastro, :dtatual);
        ";

        try {
            $statement = $this->db->prepare($statement);

            $array = array(
                'nome'      => $input['nome'],
                'logradouro'  => $input['logradouro'],
                'bairro'    => $input['bairro'],
                'numero'    => $input['numero'],
                'cep'       => $input['cep'],
                'cidade'    => $input['cidade'],
                'uf'        => $input['uf'],
                'situacao'  => (int) $input['situacao'],
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
            UPDATE escola
            SET 
                nome = :nome, 
                logradouro = :logradouro, 
                bairro = :bairro, 
                numero = :numero, 
                cep = :cep,
                cidade = :cidade,
                uf = :uf,
                situacao = :situacao,
                dtatual = :dtatual
            WHERE id = :id;
        ";

        try {
            $statement = $this->db->prepare($statement);
            $array = array(
                'id' => (int) $id,
                'nome' => $input['nome'],
                'logradouro'  => $input['logradouro'],
                'bairro' => $input['bairro'] ?? null,
                'numero' => $input['numero'], 
                'cep' => $input['cep'],
                'cidade' => $input['cidade'],
                'uf' => $input['uf'],
                'situacao' => (int) $input['situacao'],
                'dtatual' => date("Y-m-d H:i:s")
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
            DELETE FROM escola
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
