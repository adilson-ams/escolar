<?php
require "../bootstrap.php";
use Src\Controller\PersonController;
use Src\Controller\EscolaController;
use Src\Controller\TurmaController;
use Src\Controller\AlunoController;


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// the user id is, of course, optional and must be a number:
$userId = null;
if (isset($uri[2])) {
    $userId = (int) $uri[2];
}


$requestMethod = $_SERVER["REQUEST_METHOD"];

// everything else results in a 404 Not Found
if ( $uri[1] === 'person' )
{
    // pass the request method and user ID to the PersonController and process the HTTP request:
    $controller = new PersonController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();

}else if( $uri[1] === 'escola' ){

    $controller = new EscolaController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
    

}else if( $uri[1] === 'turma' ){

    $controller = new TurmaController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
    
}else if( $uri[1] === 'aluno' ){

    $controller = new AlunoController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
    
} else{
    header("HTTP/1.1 404 Not Found");
    exit();
}

