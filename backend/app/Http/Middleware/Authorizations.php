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
        $menu = Menu::where('route_name', $exp[0])->first();
        $submenu = SubMenu::where('route_name', $exp[0])->first();
        $tipe = AuthorizationTypes::where('name', $exp[0])->first();
        $roles_id = Auth::user()->roles_id;
        $authorization = Authorization::where('roles_id', $roles_id)->with(['Menu','SubMenu','AuthorizationType','Role'])
        ->where('menu_id', $menu->id)
        ->where('sub_menu_id', $submenu->id)
        ->where('authorization_type_id', $tipe['id'])
        ->first();
        if($authorization === null) {
            if($request->ajax() == true){
                return response()->json('You need authorization from the Master',401);
            }
           abort(403, "You don't have access");
        }
        return $next($request);
    }
}
