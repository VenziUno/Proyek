<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $role = DB::table('roles')->paginate(5);
        return response()->json($role);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function getCode(){
        $number = Role::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,2);
            $sum = (int)$slice + 1;
            $new_number = 'RU' . sprintf("%03d", $sum);
        } else {
            $new_number = 'RU' . sprintf("%03d", 1);
        }
        return response()->json([
            'status' => true,
            'message' => 'Success Get Code Role',
            'code'=> $new_number
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|unique:roles',
            'name' => 'required|unique:roles',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $role=Role::create([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        if ($role) {
            return response()->json([
                'success' => true,
                'message' => 'Success Add Role',
                'data'    => $role,
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Create failed, Please try again later."
        ], 409);
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role, $id)
    {
        $role = Role::findOrFail($id);
        if ($role) {
            return response()->json([
                'status'  => 'Success Show Role',
                'data' => $role
            ],200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Show failed, Please try again later.'
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Role $role, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $role=Role::find($id)->update([
            'name' => $request->name,
        ]);

        if ($role) {
            return response()->json([
                'success' => true,
                'message' => "Success Update Role",
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Update failed. Please try again later."
        ], 409);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role, $id)
    {
        $role = Role::find($id)->delete();
        if ($role) {
            return response()->json([
                'status' => true,
                'message' => 'Success Delete Role'
            ],200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Delete failed, Please try again later.'
        ],200);
    }
}
