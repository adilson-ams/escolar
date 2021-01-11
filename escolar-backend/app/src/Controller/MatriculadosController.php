<?php
namespace Src\Controller;

use Src\TableGateways\MatriculadoGateway;
use Src\Helpers\ResponseResult;

class MatriculadosController {

    private $db;
    private $requestMethod;
    private $userId;

    private $MatriculadoGateway;
    private $responseResult;

    public function __construct($db, $requestMethod, $userId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;

        $this->MatriculadoGateway = new MatriculadoGateway($db);
        $this->responseResult = new ResponseResult();
    }

    public function processRequest()
    { 
        switch ($this->requestMethod) {

            
            # caso seja informado um identificador, é chamada a action que retorna dados da escola por id
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
        $result = $this->MatriculadoGateway->findAll($_GET);

        // retorna todos os resultados #200 - OK response
        return $this->responseResult->okResponse( json_encode( $result ) ); 
    }


    # busca escola específica, de acordo com o id
    # GET
    private function getById($id)
    {
        $result = $this->MatriculadoGateway->find($id);

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
        if (! $this->validateTurma($input)) {
            $message = json_encode([
                'message' => "Exitem campos obrigatórios que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse($message);
        }

        // Insere no banco de dados
        $this->MatriculadoGateway->insert($input);

        // retorna sucesso ao criar novo registro no banco de dados
        $message = json_encode([
            'status' => true,
            "message" => "Turma cadastrada com sucesso!"
        ]);
        return $this->responseResult->okResponseCreated($message);
    }


    // action responsável por alterar o registro do usuário
    # PUT
    private function updateFromRequest($id)
    {
        // Recupera todos os dados informados como "raw", no body da chamada "Rest", e adiciona na variável input como array.
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        if((int) $id !== (int) $input['idturma']){
            $message = json_encode([
                'status' => false,
                'message' => 'Registro não confere.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }


        // Busca Matriculado no banco de dados
        $result = $this->MatriculadoGateway->find($id);

        // caso não seja encontrado, retorna mensagem.
        if (! $result) {
            $message = json_encode([
                'status' => false,
                'message' => 'Registro não encontrado.'
            ]);
            return $this->responseResult->notFoundResponse( $message );
        }

        // Executa método de validação de campos
        if ( !$this->validateTurmaUpdate($input)) {
            $message = json_encode([
                'status' => false,
                'message' => "Exitem campos obrigatórios para alterar esta matricula que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse( $message );
        }

        // altera registro no banco de dados
        $this->MatriculadoGateway->update( $id, $input );
        
        // retorna sucesso e registros alterados
        $response = json_encode([
            'status' => true,
            'message' => 'Registro de Matricula alterada com sucesso.',
            "result" => $result
        ]);
        return $this->responseResult->okResponse( $response );
    }

    # DELETE
    private function delete($id)
    {
        $result = $this->MatriculadoGateway->find($id);
        if (! $result) {
            $message = json_encode([
                'status' => false,
                'message' => 'Impossível excluir registro. Matriucla não encontrada.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }

        $this->MatriculadoGateway->delete($id);
        
        // retorna mensagem de sucesso ap excluir registro.
        $response = json_encode([
            'status' => true,
            'message' => 'Registro de Matricula excluído com sucesso.'
        ]);
        return $this->responseResult->okResponse( $response );
    }


    private function validateTurma($input)
    {
        if (! isset($input['ano'])) {
            return false;
        }
        if (! isset($input['nivel'])) {
            return false;
        }
        if (! isset($input['serie'])) {
            return false;
        }
        if (! isset($input['turno'])) {
            return false;
        }
        if (! isset($input['idescola'])) {
            return false;
        }

        return true;
    }


    private function validateTurmaUpdate($input)
    {
        if (! isset($input['ano'])) {
            return false;
        }
        if (! isset($input['nivel'])) {
            return false;
        }
        if (! isset($input['serie'])) {
            return false;
        }
        if (! isset($input['turno'])) {
            return false;
        } 

        return true;
    }


}