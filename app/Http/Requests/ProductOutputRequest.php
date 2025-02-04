<?php

namespace CodeShopping\Http\Requests;

use CodeShopping\Models\Product;
use CodeShopping\Rules\HasStock;
use Illuminate\Foundation\Http\FormRequest;

class ProductOutputRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        /**
         * @var Product $product
         */
        $product = Product::findOrFail($this->product_id);
        return [
            'amount'    =>  ['required','integer','min:1',new HasStock($product)],
        ];
    }
}
