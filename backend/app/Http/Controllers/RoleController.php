<?php

namespace App\Http\Controllers;

use App\Repository\RoleRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RoleController extends Controller
{
    private $role;

    function __construct()
    {
        $this->role = new RoleRepository;
    }

    function getRole(Request $request)
    {
        $page = $request->page;
        $data = $this->role->getData(1,5,$page);

        if (count($data) == 0) {
            return response([
                'status' => false,
                'message' => "No Data"
            ]);
        } else {
            return response([
                'status' => true,
                'data' => $data,
                'message' => "All Data Active Role"
            ]);
        }
    }

    function getRoleCode()
    {
        $data = $this->role->getCode();
        return response([
            'status' => true,
            'code' => $data,
        ]);
    }

    function getSingleRole(Request $request, $id)
    {
        $data = $this->role->getSingleData($id);
        if ($data == null) {
            return response([
                'status' => false,
                 'message' => "No Data"
            ]);
        } else {
            return response([
                'status' => true,
                'data' => $data,
                'message' => "Single Role"
            ]);
        }
    }

    function addRole(Request $request){
        DB::beginTransaction();
        try {
            $data = $this->role->add();
            DB::commit();
            $message = [
                'status' => true,
                'data' => $data,
                'message' => "Success Add Role"
            ];
        } catch (\Exception $exception) {
            DB::rollback();
            $message = [
                'status' => false,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($message);
    }

    function editRole(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $this->role->edit($id);
            DB::commit();
            $message = [
                'status' => true,
                'message' => "Success Edit Role"
            ];
        } catch (\Exception $exception) {
            DB::rollback();
            $message = [
                'status' => false,
                'error' => $exception->getMessage()
            ];
        }
        return response()->json($message);
    }

    function deleteRole($id)
    {
        DB::beginTransaction();
        try {
            $this->role->delete($id);
            DB::commit();
            $message = [
                'status' => true,
                'message' => "Success Delete Role"
            ];
        } catch (\Exception $exception) {
            DB::rollback();
            $message = [
                'status' => false,
                'error' => "Something Wrong"
            ];
        }
        return response()->json($message);
    }
}
