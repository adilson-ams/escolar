<?php

require "../bootstrap.php";

use Src\Controller\PersonController;
use Src\Controller\EscolaController;
use Src\Controller\TurmaController;
use Src\Controller\AlunoController;
use Src\Controller\UsuarioController;


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
    $userId = $uri[2];
}
 
$requestMethod = $_SERVER["REQUEST_METHOD"];
 

// function getBearerToken() {
//     $headers = $_SERVER['HTTP_AUTHORIZATION']; 
//     // HEADER: Get the access token from the header
//     if (!empty($headers)) {
//         if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
//             return $matches[1];
//         }
//     }
//     return null;
// }
 


/*
exit;
echo "Header:\n" . $header . "\n";
echo "Payload:\n" . $payload . "\n";

if ($tokenExpired) {
    echo "Token has expired.\n";
} else {
    echo "Token has not expired yet.\n";
}

if ($signatureValid) {
    echo "The signature is valid.\n";
} else {
    echo "The signature is NOT valid\n";
}
*/
    

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


    $jwtString =  getBearerToken();
    $jwtVerifier = new JwtVerifier();

    $jwt = $jwtVerifier->verify($jwtString);

    print_r( $jwt );
    exit;

    /*
    try {

        switch(true) {
            case array_key_exists('HTTP_AUTHORIZATION', $_SERVER) :
                $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
                break;
            case array_key_exists('Authorization', $_SERVER) :
                $authHeader = $_SERVER['Authorization'];
                break;
            default :
                $authHeader = null;
                break;
        }
$authHeader = $_SERVER['HTTP_AUTHORIZATION']; 
        preg_match('/Bearer\s(\S+)/', $authHeader, $matches);
        if(!isset($matches[1])) {
            throw new \Exception('No Bearer Token');
        }


        $jwtVerifier = (new \Okta\JwtVerifier\JwtVerifierBuilder())
            ->setIssuer(getenv('OKTAISSUER'))
            ->setAudience('api://default')
            ->setClientId(getenv('OKTACLIENTID'))
            ->build();
        return $jwtVerifier->verify($matches[1]);

    } catch (\Exception $e) {
        return false;
    }
    */

  
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
    
}else if( $uri[1] === 'usuario' ){

    $controller = new UsuarioController($dbConnection, $requestMethod, $userId);
    $controller->processRequest();
    
} else{
    header("HTTP/1.1 404 Not Found");
    exit();
}



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