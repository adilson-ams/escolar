<?php
namespace Src\Controller;

use Src\TableGateways\EscolaGateway;
use Src\Helpers\ResponseResult;

class EscolaController {

    private $db;
    private $requestMethod;
    private $userId;

    private $EscolaGateway;
    private $responseResult;

    public function __construct($db, $requestMethod, $userId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;

        $this->EscolaGateway = new EscolaGateway($db);
        $this->responseResult = new ResponseResult();
    }

    public function processRequest()
    { 
        switch ($this->requestMethod) {

            
            # caso seja informado um identificador, é chamada a action que retorna dados da pessoa por id
            # caso contrário, serão listados todos os registros
            case 'GET':
                if ($this->userId) {
                    $response = $this->getById($this->userId);
                } else {
                    $response = $this->getAll();
                };
                break;
            
            // Sempre que executada uma chamada via "Post", será interpretado como uma tentativa de inserção
            case 'POST':
                $response = $this->createFromRequest();
                break;
            case 'PUT':
                $response = $this->updateFromRequest($this->userId);
                break;
            case 'DELETE':
                $response = $this->delete($this->userId);
                break;
            default:
                $response = $this->notFoundResponse();
                break;
        }

        header($response['status_code_header']);
        if ($response['body']) {
            echo $response['body'];
        }
    }


    # GET
    private function getAll()
    {
        $result = $this->EscolaGateway->findAll();

        // retorna todos os resultados #200 - OK response
        return $this->responseResult->okResponse( json_encode( $result ) ); 
    }


    # busca pessoa específica, de acordo com o id
    # GET
    private function getById($id)
    {
        $result = $this->EscolaGateway->find($id);

        // Caso identificador não seja encontrado no banco de dados
        if (! $result) {
            $message = json_encode([
                'message' => 'Registro não encontrado.'
            ]);

            # 404 - Não encontrado
            return $this->responseResult->notFoundResponse($message);
        }
        
        # OK response
        return $this->responseResult->okResponse( json_encode( $result ) ); 
    }


    # POST
    private function createFromRequest()
    { 
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        
        // Executa método de validação de campos
        if (! $this->validateEscola($input)) {
            $message = json_encode([
                'message' => "Exitem campos obrigatórios que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse($message);
        }

        // Insere no banco de dados
        $this->EscolaGateway->insert($input);

        // retorna sucesso ao criar novo registro no banco de dados
        $message = json_encode([
            "message" => "Escola cadastrada com sucesso!"
        ]);
        return $this->responseResult->okResponseCreated($message);
    }


    // action responsável por alterar o registro do usuário
    # PUT
    private function updateFromRequest($id)
    {
        // Recupera todos os dados informados como "raw", no body da chamada "Rest", e adiciona na variável input como array.
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        if($id !== $input['id']){
            $message = json_encode([
                'message' => 'Registro não confere.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }

        // Busca pessoa no banco de dados
        $result = $this->EscolaGateway->find($id);

        // caso não seja encontrado, retorna mensagem.
        if (! $result) {
            $message = json_encode([
                'message' => 'Registro não encontrado.'
            ]);
            return $this->responseResult->notFoundResponse( $message );
        }

        // Executa método de validação de campos
        if (! $this->validateEscola($input)) {
            $message = json_encode([
                'message' => "Exitem campos obrigatórios para alterar esta pessoa que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse( $message );
        }

        // altera registro no banco de dados
        $this->EscolaGateway->update($id, $input);
        
        // retorna sucesso e registros alterados
        $response = json_encode([
            'message' => 'Registro de Pessoa alterado com sucesso.',
            "result" => $result
        ]);
        return $this->responseResult->okResponse( $response );
    }

    # DELETE
    private function delete($id)
    {
        $result = $this->EscolaGateway->find($id);
        if (! $result) {
            $message = json_encode([
                'message' => 'Impossível excluir registro. Pessoa não encontrada.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }

        $this->EscolaGateway->delete($id);
        
        // retorna mensagem de sucesso ap excluir registro.
        $response = json_encode([
            'message' => 'Registro de Pessoa excluído com sucesso.'
        ]);
        return $this->responseResult->okResponse( $response );
    }


    private function validateEscola($input)
    {
        if (! isset($input['nome'])) {
            return false;
        }
        if (! isset($input['situacao'])) {
            return false;
        }
        return true;
    }

}