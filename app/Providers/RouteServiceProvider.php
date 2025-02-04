<?php

namespace CodeShopping\Providers;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Models\Category;
use CodeShopping\Models\Product;
use CodeShopping\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Request as RequestFacade;

class RouteServiceProvider extends ServiceProvider
{
    use OnlyTrashed;

    /**
     * This namespace is applied to your controller routes.
     *
     * In addition, it is set as the URL generator's root namespace.
     *
     * @var string
     */
    protected $namespace = 'CodeShopping\Http\Controllers';

    /**
     * Define your route model bindings, pattern filters, etc.
     *
     * @return void
     */
    public function boot()
    {
        //

        parent::boot();

        //Fazendo busca de forma explícita
        Route::bind('category', function($value){

            //Collection
            //Category::whereId($value)->orWhereSlug($value)->get()

            //Register
            //Category::whereId($value)->orWhereSlug($value)->get()->first()
            $collection = Category::whereId($value)->orWhere('slug',$value)->get();
            return $collection->first();
        });

        Route::bind('product', function($value){
            $query = Product::query();

            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequested($request,$query);
            $collection = $query->whereId($value)->orWHere('slug',$value)->get();
            return $collection->first();
        });

        Route::bind('user', function($value){
            $query = User::query();

            $request = app(Request::class);
            $query = $this->onlyTrashedIfRequested($request,$query);
            return $query->find($value);
        });
    }

    /**
     * Define the routes for the application.
     *
     * @return void
     */
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();

        //
    }

    /**
     * Define the "web" routes for the application.
     *
     * These routes all receive session state, CSRF protection, etc.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->namespace)
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * These routes are typically stateless.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->namespace)
             ->group(base_path('routes/api.php'));
    }
}
