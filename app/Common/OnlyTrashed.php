<?php
/**
 * Created by PhpStorm.
 * User: jonas
 * Date: 20/02/19
 * Time: 21:32
 */

namespace CodeShopping\Common;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait OnlyTrashed
{
    protected function onlyTrashedIfRequested(Request $request, Builder $query)
    {
        if($request->get('trashed') == 1)
        {
            $query = $query->onlyTrashed();
        }

        return $query;
    }
}
