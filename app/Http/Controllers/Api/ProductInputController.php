<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductInputRequest;
use CodeShopping\Http\Resources\ProductInputResource;
use CodeShopping\Models\ProductInput;
use Illuminate\Http\Request;

class ProductInputController extends Controller
{
    public function index()
    {
        //with = Carregamento prematuro, para não haver muita consulta no banco
        //Carregamento retardado, somente na hora que acessa a variavel é que a classe relacionada é carregada
        $inputs = ProductInput::with('product')->paginate(); //eager loadind | lady loading
        return ProductInputResource::collection($inputs);
    }

    public function store(ProductInputRequest $request)
    {
        $input = ProductInput::create($request->all());

        return new ProductInputResource($input);
    }

    public function show(ProductInput $input)
    {
        return new ProductInputResource($input);
    }
}
