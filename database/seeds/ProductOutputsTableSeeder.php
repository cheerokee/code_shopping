<?php

use Illuminate\Database\Seeder;

class ProductOutputsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $products = \CodeShopping\Models\Product::all();
        factory(\CodeShopping\Models\ProductOutput::class,200)
            ->make()
            ->each(function ($output) use($products){
                $product = $products->random();

                $output->product_id = $products->random()->id;
                $output->save();
            });
    }
}
