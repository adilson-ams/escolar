<?php
namespace Src\Helpers;
 

class ResponseResult {

    public function __construct()
    {
        
    }

    public function okResponse($result)
    {
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = $result;
        return $response;
    }

    public function okResponseCreated($result)
    {
        $response['status_code_header'] = 'HTTP/1.1 201 Created';
        $response['body'] = $result;
        return $response;
    }

    public function notAuthorization($message = null)
    {
        $response['status_code_header'] = 'HTTP/1.1 401 Not Authorization';
        $response['body'] = $message;
        return $response;
    }

    public function notFoundResponse($message = null)
    {
        $response['status_code_header'] = 'HTTP/1.1 404 Not Found';
        $response['body'] = $message;
        return $response;
    }
    
    private function unprocessableEntityResponse($message = null)
    {
        $response['status_code_header'] = 'HTTP/1.1 422 Unprocessable Entity';
        $response['body'] = $message;
        return $response;
    }


}