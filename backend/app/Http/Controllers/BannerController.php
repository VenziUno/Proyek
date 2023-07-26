<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use App\Repository\BannerRepository;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BannerController extends Controller
{

    private $banner;

    function __construct()
    {
        $this->banner = new BannerRepository;
    }

    /**
     *
     */

    function getBanner(Request $request)
    {
        $page = $request->page;
        $data = $this->banner->getData(1, 5, $page);

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

    /**
     *
     */

    function getRoleCode()
    {
        $data = $this->banner->getCode();
        return response([
            'status' => true,
            'code' => $data,
        ]);
    }

    /**
     *
     */

    public function uploadImage(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|mimes:jpeg,jpg,png|max:5120',
        ], [
            'file.mimes' => 'Harus berformat jpeg, jpg, atau png.',
            'file.max' => 'Ukuran file maksimal adalah 5 MB.',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $image  = $request->file('file');
        $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());
        return [
            'status' => true,
            'messages' => 'Success Upload Photo',
            'data' => $result,
        ];
    }

    /**
     *
     */

    function addRole(Request $request)
    {
        DB::beginTransaction();
        try {
            $uploadedImage = $this->uploadImage($request);
            $path = $uploadedImage['data'];

            $data = $this->banner->add($path);
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

    /**
     *
     */

    function editRole(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $this->banner->edit($id);
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

    /**
     *
     */

    function deleteRole($id)
    {
        DB::beginTransaction();
        try {
            $this->banner->delete($id);
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
