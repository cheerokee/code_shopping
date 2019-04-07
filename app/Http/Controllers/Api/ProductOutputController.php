<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Requests\ProductOutputRequest;
use CodeShopping\Http\Resources\ProductOutputResource;
use CodeShopping\Models\ProductOutput;
use Illuminate\Http\Request;

class ProductOutputController extends Controller
{
    public function index()
    {
        //with = Carregamento prematuro, para não haver muita consulta no banco
        //Carregamento retardado, somente na hora que acessa a variavel é que a classe relacionada é carregada
        $outputs = ProductOutput::with('product')->paginate(); //eager loadind | lady loading
        return ProductOutputResource::collection($outputs);
    }

    public function store(ProductOutputRequest $request)
    {
        $output = ProductOutput::create($request->all());

        return new ProductOutputResource($output);
    }

    public function show(ProductOutput $output)
    {
        return new ProductOutputResource($output);
    }
}
