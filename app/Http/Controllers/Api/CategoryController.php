<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\CategoryFilter;
use CodeShopping\Http\Requests\CategoryRequest;
use CodeShopping\Http\Resources\CategoryResource;
use CodeShopping\Models\Category;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        /**
         * @var CategoryFilter $filter
         * @var Builder $filterQuery
         */
        $filter = app(CategoryFilter::class);
        $filterQuery = Category::filtered($filter);
        //$categories = $request->has('all') ? Category::all() : Category::paginate(5);

        $categories = $request->has('all') ? $filterQuery->get() : $filterQuery->paginate(5);
        //Com o CategoryResource podemos trazer a informação que quisermos
        return CategoryResource::collection($categories);
    }

    public function store(CategoryRequest $request)
    {
        $category = Category::create($request->all());
        $category->refresh();
        return new CategoryResource($category);
    }

    public function show(Category $category)
    {
        return new CategoryResource($category);
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $category->fill($request->all());
        $category->save();

        return new CategoryResource($category);
        //return response([],204);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([],204);
    }
}
