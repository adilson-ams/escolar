<?php

require "../bootstrap.php";

use Src\Controller\PersonController;
// use Src\Controller\EscolasController;
use Src\Controller\TurmaController;
use Src\Controller\AlunoController;
// use Src\Controller\UsuariosController;


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8"); 
header("Access-Control-Max-Age: 3600");  
header("Access-Control-Allow-Methods: HEAD, GET, POST, PUT, PATCH, DELETE, OPTIONS"); 
header("Content-Type: application/json; charset=UTF-8");
$method = $_SERVER['REQUEST_METHOD'];
if ($method == "OPTIONS") {
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method,Access-Control-Request-Headers, Authorization");
    header("HTTP/1.1 200 OK");
    die();
}



$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// the user id is, of course, optional and must be a number:
$userId = null;
if (isset($uri[2])) {
    $userId = $uri[2];
}
 
$requestMethod = $_SERVER["REQUEST_METHOD"];
 
   

$class = ucfirst(strtolower( $routes[$uri[1]] )) . "Controller";    
$namespaceClass = "\\Src\\Controller\\".$class;
$controller = new $namespaceClass($dbConnection, $requestMethod, $userId); 
$controller->processRequest();

 


// everything else results in a 404 Not Found
/*
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
    
}else if( $uri[1] === 'usuarios' ){

    $controller = new UsuariosController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
    
} else{
    header("HTTP/1.1 404 Not Found");
    exit();
}
*/


// https://steampixel.de/en/simple-and-elegant-url-routing-with-php/

 


/*


function getAuthorizationHeader(){
    $headers = null;
    if (isset($_SERVER['Authorization'])) {
        $headers = trim($_SERVER["Authorization"]);
    }
    else if (isset($_SERVER['HTTP_AUTHORIZATION'])) { //Nginx or fast CGI
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        // Server-side fix for bug in old Android versions (a nice side-effect of this fix means we don't care about capitalization for Authorization)
        $requestHeaders = array_combine(array_map('ucwords', array_keys($requestHeaders)), array_values($requestHeaders));
        //print_r($requestHeaders);
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    return $headers;
}

function getBearerToken() {
    $headers = getAuthorizationHeader();
    // HEADER: Get the access token from the header
    if (!empty($headers)) {
        if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
            return $matches[1];
        }
    }
    return null;
}

*/