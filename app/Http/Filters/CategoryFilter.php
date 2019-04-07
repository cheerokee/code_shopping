<?php


namespace CodeShopping\Http\Filters;


use Mnabialek\LaravelEloquentFilter\Filters\SimpleQueryFilter;

class CategoryFilter extends SimpleQueryFilter
{
    protected $simpleFilters = ['search','interval'];

    protected $simpleSorts = ['id', 'name', 'created_at'];

    protected function applySearch($value)
    {
        $this->query
            ->where('name', 'LIKE', "%$value%");
    }

    //Não funcional
    protected function applyInterval($value){//2019-03-31|2019-04-05
        $dates = explode('|',$value);
        $date_start = $dates[0];
        $date_finish = $dates[1];

        $this->query
            ->where('created_at', '>= ', "DATE('$date_start')")
            ->orWhere('created_at', '<= ', "DATE('$date_finish')");
    }
}
