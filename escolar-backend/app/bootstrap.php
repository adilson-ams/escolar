<?php
require 'vendor/autoload.php';
use Dotenv\Dotenv;

use Src\System\DatabaseConnector;

$dotenv = new DotEnv(__DIR__);
$dotenv->load();

$dbConnection = (new DatabaseConnector())->getConnection();


// Routes

$routes["usuarios"] = 'Usuarios';
$routes["escolas"] = 'Escolas';
$routes["alunos"] = 'Alunos';
$routes["turmas"] = 'Turmas';
$routes["matriculados"] = 'Matriculados';


function base64UrlEncode($text)
{
    return str_replace(
        ['+', '/', '='],
        ['-', '_', ''],
        base64_encode($text)
    );
}