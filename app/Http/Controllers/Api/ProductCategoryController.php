<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Requests\ProductCategoryRequest;
use CodeShopping\Http\Resources\ProductCategoryResource;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use Illuminate\Database\Eloquent\Collection;
use CodeShopping\Http\Controllers\Controller;

class ProductCategoryController extends Controller
{

    public function index(Product $product)
    {
        return new ProductCategoryResource($product);
    }

    //categories
    //sync em vez de attach
    //product 1 - esteja relacionado - 10 categorias
    // categoria 1 e 3
    public function store(ProductCategoryRequest $request, Product $product)
    {
        $changed =  $product->categories()->sync($request->categories);
        $categoriesAttachedId = $changed['attached'];
        /**
         * @var Collection $categories
         */
        $categories = Category::whereIn('id',$categoriesAttachedId)->get();// WHERE id IN (1,3,5)
        return $categories->count() ? response()->json(new ProductCategoryResource($product),201) : [];
    }

    public function destroy(Product $product, Category $category)
    {
        $product->categories()->detach($category->id);
        return response()->json([],204);
    }
}
