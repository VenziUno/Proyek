<?php

namespace App\Repository;

use Exception;
use App\Models\User;
use App\Models\Banner;
use App\Models\LogActivity;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Validator;

class BannerRepository
{
    function getData($status, $n, $page)
    {
        $data = Banner::orderBy('id', 'asc');
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
        $number = Banner::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,1);
            $sum = (int)$slice + 1;
            $new_number = 'B' . sprintf("%03d", $sum);
        } else {
            $new_number = 'B' . sprintf("%03d", 1);
        }
        return $new_number;
    }

    function getSingleData($id)
    {
        $data = Banner::find($id);
        return $data;
    }

    function add($path)
    {
        $validator = Validator::make(request()->all(), [
            'id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            // Jika validasi gagal, Anda bisa menangani respons kesalahan di sini
            return response()->json([
                'status' => false,
                'error' => $validator->errors()
            ]);
        }

        // Jika validasi berhasil, maka simpan data ke database
        $data = Banner::create([
            'id' => request('id'),
            'name' => request('name'),
            'description' => request('description'),
            'file' => $path,
            'status' => request('status'),
        ]);

        return $data;
    }

    function edit($id)
    {
        $validator = Validator::make(request()->all(), [
            'name' => 'required',
            'description' => 'required',
            'file' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $data = Banner::find($id)->update([
            'name' => request('name'),
            'description' => request('description'),
            'file' => request('file'),
            'status' => request('status'),
        ]);
    }

    function delete($id)
    {
        $data = Banner::find($id)->delete();
    }

}
