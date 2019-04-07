<?php

use Illuminate\Database\Seeder;
use \CodeShopping\Models\Product;

class ProductsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var \Illuminate\Database\Eloquent\Collection $categories
         */
        $categories = \CodeShopping\Models\Category::all();
        factory(Product::class, 30)
            ->create()
            ->each(function (Product $product ) use($categories){
                $categoryId = $categories->random()->id;
                $product->categories()->attach($categoryId);
            }); //Para interagir com cada um dos 30
    }
}
