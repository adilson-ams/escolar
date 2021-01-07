<?php
namespace Src\Helpers;
use Carbon\Carbon;
 

class Authenticate {
 
    public function generationToken( $email )
    { 

        // get the local secret key
        $secret = getenv('SECRET');

        // Create the token header
        $header = json_encode([
            'typ' => 'JWT',
            'alg' => 'HS256'
        ]);

        // Create the token payload
        $payload = json_encode([
            'user_id' => 1,
            'role' => $email,
            'exp' => strtotime(date(). ' + 10 days')
        ]);

        // Encode Header
        $base64UrlHeader = base64UrlEncode($header);

        // Encode Payload
        $base64UrlPayload = base64UrlEncode($payload);

        // Create Signature Hash
        $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);

        // Encode Signature to Base64Url String
        $base64UrlSignature = base64UrlEncode($signature);

        // Create JWT
        $jwt = $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;

        return $jwt;
        
        // echo "Your token:\n" . $jwt . "\n";


        /*
        //Application Key
        $key = 'RPYPK-KC86X-GXGQW-4H7RR';

        //Header Token
        $header = [
            'typ' => 'JWT',
            'alg' => 'HS256'
        ];

        //Payload - Content
        $payload = [
            'exp' => date("Y-m-d H:i:s"),
            'uid' => 1,
            'email' => $email,
        ];

        //JSON
        $header = json_encode($header);
        $payload = json_encode($payload);

        //Base 64
        $header = base64_encode($header);
        $payload = base64_encode($payload);

        //Sign
        $sign = hash_hmac('sha256', $header . "." . $payload, $key, true);
        $sign = base64_encode($sign);

        //Token
        $token = $header . '.' . $payload;

        return $token;
        */
    }


    public function Authorization()
    {
        $token = $this->getBearerToken();
        if(!isset($token))
        {
            return array( "status" => false , "message" => "Token não informado. " );
        }
        
        return $this->jwtValidToken( $token );
    }



    private function getBearerToken() {
        $headers = $_SERVER['HTTP_AUTHORIZATION']; 
        // HEADER: Get the access token from the header
        if (!empty($headers)) {
            if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
                return $matches[1];
            }
        }
        return null;
    }


    private function jwtValidToken( $token )
    { 
        try
        {
            // split the token
            $tokenParts = explode('.', $token);
            $header = base64_decode($tokenParts[0]);
            $payload = base64_decode($tokenParts[1]);
            $signatureProvided = $tokenParts[2];
            $secret = getenv('SECRET');
            
            if(!$payload)
            {
                return array( "status" => false , "message" => "Token inválido." );
            }
            
            // check the expiration time - note this will caus
            // print_r();
            // echo json_decode('');
            // exit;

            $expiration = Carbon::createFromTimestamp( json_decode($payload)->exp);
            $tokenExpired = (Carbon::now()->diffInSeconds($expiration, false) < 0);

            // build a signature based on the header and payload using the secret 
            $base64UrlHeader = base64UrlEncode($header);
            $base64UrlPayload = base64UrlEncode($payload);
            $signature = hash_hmac('sha256', $base64UrlHeader . "." . $base64UrlPayload, $secret, true);
            $base64UrlSignature = base64UrlEncode($signature);

            // verify it matches the signature provided in the token
            $signatureValid = ($base64UrlSignature === $signatureProvided);


            if( !$signatureValid ){
                return array( "status" => false , "message" => "Token inválido. " );
            }
 

            return array( "status" => true , "message" => "Token inválido. " );

        } catch (Exception $e) {
            return array( "status" => false , "message" => "Token inválido: " .  $e->getMessage() );
        }
    }
 


}