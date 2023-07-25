<?php

namespace App\Repository;

use Exception;
use App\Models\User;
use App\Models\Role;
use App\Models\LogActivity;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class RoleRepository
{
    function getData($status, $n, $page)
    {
        $data = Role::orderBy('id', 'asc');

        // $role = DB::table('roles')->paginate(5);

        if(request('search')){
            $keyword = request('search');
            $data->where([
                ['status', $status],
                ['name', 'LIKE', "%$keyword%"],
            ])->orWhere([
                ['status', $status],
                ['id', 'LIKE', "%$keyword%"],
            ]);
        }

        if ($page) {
            $data = $data->paginate($n, ['*'], 'page', $page);
        } else {
            $data = $data->get();
        }
        return $data;
    }

    function getCode()
    {
        $number = Role::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,2);
            $sum = (int)$slice + 1;
            $new_number = 'RU' . sprintf("%03d", $sum);
        } else {
            $new_number = 'RU' . sprintf("%03d", 1);
        }
        return $new_number;
    }

    function getSingleData($id)
    {
        $data = Role::find($id);
        return $data;
    }

    function add()
    {
        $data = Role::create([
            'id' => request('code'),
            'name' => request('name'),
            'status' => request('status'),
        ]);

    }

    function edit($id)
    {
        $data = Role::find($id)->update([
            'name' => request('name'),
            'status' => request('status')
        ]);
    }

    function delete($id)
    {
        $data = Role::find($id)->delete();
    }

}
