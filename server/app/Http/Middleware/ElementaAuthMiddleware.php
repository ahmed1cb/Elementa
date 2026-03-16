<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;
use \App\Services\Response;
class ElementaAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {

        $authHeader = $request->header('Authorization');

        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            return Response::json([], 'Unauthorized', 401);
        }

        $token = explode(' ', $authHeader)[1] ?? null;

        $accessToken = PersonalAccessToken::findToken($token);


        if (!$accessToken) {
            return Response::json([], 'Invalid Token', 401);

        }
        $user = $accessToken->tokenable;

        if (!$user) {
            return Response::json([], 'Invalid Token', 401);

        }
        $user->withAccessToken($accessToken);


        $request->setUserResolver(fn() => $user);

        return $next($request);
    }
}
