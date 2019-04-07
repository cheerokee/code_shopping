<?php
//header - payload - signature

//header
$header = [
    'alg'   =>  'HS256', //HMAC - SHA 256
    'typ'   =>  'JWT'
];

$header_json = json_encode($header);
$header_base64 = base64_encode($header_json);
echo "Cabeçalho JSON: $header_json";
echo "\n";
echo "Cabeçalho JWT: $header_base64";
echo "\n";

$payload = [
    'first_name'    =>  'Jonas',
    'last_name'     =>  'Martins',
    'email'         =>  'jonasmweb@hotmail.com'
];

$payload_json = json_encode($payload);
$payload_base64 = base64_encode($payload_json);
echo "Payload JSON: $payload_json";
echo "\n";
echo "Payload JWT: $payload_base64";
echo "\n";

$key = '98as7d89s4d9s4s4dd98sa4dsa89d49s8ad4';

$signature = hash_hmac('sha256', "$header_base64.$payload_base64", $key, true);
$signature_base64 = base64_encode($signature);
echo "\n\n";
echo "Signature: $signature";
echo "\n";
echo "Signature JWT: $signature_base64";
echo "\n\n";

$token = "$header_base64.$payload_base64.$signature_base64";
echo "Token: $token";
