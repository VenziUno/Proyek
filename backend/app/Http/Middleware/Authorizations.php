<?php

namespace App\Http\Middleware;

use App\Models\Authorization;
use App\Models\AuthorizationTypes;
use App\Models\Menu;
use App\Models\SubMenu;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class Authorizations
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $req = $request->route()->getName();
        $exp = explode('_', $req);
        if (count($exp) == 4) {
            $menu = Menu::where('route_name', $exp[0])->first();
            $submenu = SubMenu::where('route_name', $exp[1])->first();
            $tipe = AuthorizationTypes::where('name', $exp[2])->first();
            $user = Auth::user();
            if ($user) {
                $roles_id = $user->role_id;
            }
            $authorization = Authorization::where('role_id', $roles_id)->with(['menu', 'subMenu', 'authorizationType', 'role'])
                ->where('menu_id', $menu->id)
                ->where('sub_menu_id', $submenu->id)
                ->where('authorization_type_id', $tipe['id'])
                ->first();
            if ($authorization === null) {
                if ($request->ajax() == true) {
                    return response()->json('You need authorization from the Master', 401);
                }
                return response()->json("You don't have access", 403);
                abort(403, "You don't have access");
            }
        } else {
            $menu = Menu::where('route_name', $exp[0])->first();
            $tipe = AuthorizationTypes::where('name', $exp[1])->first();
            $user = Auth::user();
            if ($user) {
                $roles_id = $user->role_id;
            }
            $authorization = Authorization::where('role_id', $roles_id)->with(['menu', 'authorizationType', 'role'])
                ->where('menu_id', $menu->id)
                ->where('authorization_type_id', $tipe['id'])
                ->first();
            if ($authorization === null) {
                if ($request->ajax() == true) {
                    return response()->json('You need authorization from the Master', 401);
                }
                return response()->json("You don't have access", 403);
                abort(403, "You don't have access");
            }
        }
        return $next($request);
    }
}
