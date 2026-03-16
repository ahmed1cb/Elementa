<?php

namespace App\Services;



class Response{

    public static function  json(array $data , string $message , int $status){

        return response()->json([
            'data'=> $data,
            'status' => $status > 200 ? 'Fail' : 'Success',
            'message' => $message
        ] , $status);


    }

}