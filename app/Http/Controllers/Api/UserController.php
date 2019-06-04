<?php

namespace CodeShopping\Http\Controllers\Api;

use CodeShopping\Common\OnlyTrashed;
use CodeShopping\Events\UserCreatedEvent;
use CodeShopping\Http\Resources\UserResource;
use CodeShopping\Http\Requests\UserRequest;
use CodeShopping\Models\User;
use Illuminate\Http\Request;
use CodeShopping\Http\Controllers\Controller;
use CodeShopping\Http\Filters\UserFilter;

class UserController extends Controller
{
    use OnlyTrashed;

    public function index(Request $request)
    {
        $filter = app(UserFilter::class);
        $query = User::query();
        $query = $this->onlyTrashedIfRequested($request, $query);
        $filterQuery = $query->filtered($filter);
        $users = $filter->hasFilterParameter()?
                $filterQuery->get():
                $filterQuery->paginate(10);

        return UserResource::collection($users);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        //disparar - usuário criado - ouvinte - fazer tarefa
        event(new UserCreatedEvent($user));
        return new UserResource($user);
    }

    public function show(User $user)
    {
        return new UserResource($user);
    }

    public function update(UserRequest $request, User $user)
    {
        $user->fill($request->all());
        $user->save();
        return new UserResource($user);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return response()->json([],204);
    }

    public function restore(User $user)
    {
        $user->restore();
        return response()->json([],204);
    }
}
