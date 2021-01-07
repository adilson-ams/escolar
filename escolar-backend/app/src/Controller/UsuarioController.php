<?php
namespace Src\Controller;

use Src\TableGateways\UsuarioGateway;
use Src\Helpers\ResponseResult;
use Src\Helpers\Authenticate;

class UsuarioController {

    private $db;
    private $requestMethod;
    private $userId;

    private $UsuarioGateway;
    private $responseResult;
    private $Authenticate;

    public function __construct($db, $requestMethod, $userId)
    {
        $this->db = $db;
        $this->requestMethod = $requestMethod;
        $this->userId = $userId;

        $this->UsuarioGateway = new UsuarioGateway($db);
        $this->responseResult = new ResponseResult();
        $this->Authenticate = new Authenticate();
    }

    public function processRequest()
    { 
        switch ($this->requestMethod) {
 
            # caso seja informado um identificador, é chamada a action que retorna dados da Usuario por id
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
                if( $this->userId === 'login'){
                    $response = $this->login();
                }else{
                    $response = $this->createFromRequest();
                }
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
        // Necessário autênticação
        $auth = $this->Authenticate->Authorization();
        if( !$auth["status"] ) {
            return $this->responseResult->notAuthorization( json_encode( $auth )); 
        }


        $result = $this->UsuarioGateway->findAll();

        // retorna todos os resultados #200 - OK response
        return $this->responseResult->okResponse( json_encode( $result ) ); 
    }


    # busca Usuario específica, de acordo com o id
    # GET
    private function getById($id)
    {
        // Necessário autênticação
        $auth = $this->Authenticate->Authorization();
        if( !$auth["status"] ) {
            return $this->responseResult->notAuthorization( json_encode( $auth )); 
        }

        $result = $this->UsuarioGateway->find($id);

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


    #POST
    private function login()
    {
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);


        $input["senha"] = md5( $input["senha"] );

        $result = $this->UsuarioGateway->login($input);

        if (! $result) {
            $message = json_encode([
                'message' => 'usuário e/ou senha não conferem.'
            ]);

            # 404 - Não encontrado
            return $this->responseResult->notFoundResponse($message);
        }


        $token = $this->Authenticate->generationToken( $input["email"] );
        
        $message = json_encode([
            "token" => $token
        ]); 

        return $this->responseResult->okResponse( $message ); 
    }

    # POST
    private function createFromRequest()
    { 
        // Necessário autênticação
        $auth = $this->Authenticate->Authorization();
        if( !$auth["status"] ) {
            return $this->responseResult->notAuthorization( json_encode( $auth )); 
        }

        $input = (array) json_decode(file_get_contents('php://input'), TRUE);
        
        // Executa método de validação de campos
        if (! $this->validateUsuario($input)) {
            $message = json_encode([
                'message' => "Exitem campos obrigatórios que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse($message);
        }

        $input["senha"] = md5( $input["senha"] );
        
        // Insere no banco de dados
        $this->UsuarioGateway->insert($input);

        // retorna sucesso ao criar novo registro no banco de dados
        $message = json_encode([
            "message" => "Usuario cadastrado com sucesso!"
        ]);
        return $this->responseResult->okResponseCreated($message);
    }


    // action responsável por alterar o registro do usuário
    # PUT
    private function updateFromRequest($id)
    {
        // Necessário autênticação
        $auth = $this->Authenticate->Authorization();
        if( !$auth["status"] ) {
            return $this->responseResult->notAuthorization( json_encode( $auth )); 
        }

        // Recupera todos os dados informados como "raw", no body da chamada "Rest", e adiciona na variável input como array.
        $input = (array) json_decode(file_get_contents('php://input'), TRUE);

        if($id !== $input['id']){
            $message = json_encode([
                'message' => 'Registro não confere.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }

        // Busca Usuario no banco de dados
        $result = $this->UsuarioGateway->find($id);

        // caso não seja encontrado, retorna mensagem.
        if (! $result) {
            $message = json_encode([
                'message' => 'Registro não encontrado.'
            ]);
            return $this->responseResult->notFoundResponse( $message );
        }

        // Executa método de validação de campos
        if (! $this->validateUsuario($input)) {
            $message = json_encode([
                'message' => "Exitem campos obrigatórios para alterar esta Usuario que não foram informados."
            ]);
            return $this->responseResult->unprocessableEntityResponse( $message );
        }

        // altera registro no banco de dados
        $this->UsuarioGateway->update($id, $input);
        
        // retorna sucesso e registros alterados
        $response = json_encode([
            'message' => 'Registro de Usuario alterado com sucesso.',
            "result" => $result
        ]);
        return $this->responseResult->okResponse( $response );
    }

    # DELETE
    private function delete($id)
    {
        // Necessário autênticação
        $auth = $this->Authenticate->Authorization();
        if( !$auth["status"] ) {
            return $this->responseResult->notAuthorization( json_encode( $auth )); 
        }

        $result = $this->UsuarioGateway->find( (int) $id);
        if (! $result) {
            $message = json_encode([
                'message' => 'Impossível excluir registro. Usuario não encontrado.'
            ]);
            return $this->responseResult->notFoundResponse($message);
        }

        $this->UsuarioGateway->delete( (int) $id);
        
        // retorna mensagem de sucesso ap excluir registro.
        $response = json_encode([
            'message' => 'Registro de Usuario excluído com sucesso.'
        ]);
        return $this->responseResult->okResponse( $response );
    }


    private function validateUsuario($input)
    {
        if (! isset($input['senha'])) {
            return false;
        }
        if (! isset($input['email'])) {
            return false;
        }
        return true;
    }

}