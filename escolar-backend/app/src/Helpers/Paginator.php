<?php

namespace Src\Helpers; 
 

class Paginator {

    public function __construct($gets)
    {
        $sql = "";

        if($gets['$top']){
            
            $sql .= "LIMITE " . $gets['$top'] ;
        }

        echo $sql;
    }






}