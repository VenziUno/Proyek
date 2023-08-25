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
                'data' => $data,
                'message' => "No Data"
            ]);
        } else {
            return response([
                'status' => true,
                'data' => $data,
                'message' => "All Data Active Banner"
            ]);
        }
    }

    /**
     *
     */

    function getBannerCode()
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

    function getSingleBanner(Request $request, $id)
    {
        $data = $this->banner->getSingleData($id);
        if ($data == null) {
            return response([
                'status' => false,
                'message' => "No Data"
            ]);
        } else {
            return response([
                'status' => true,
                'data' => $data,
                'message' => "Single Banner"
            ]);
        }
    }

    /**
     *
     */

    function addBanner(Request $request)
    {
        DB::beginTransaction();
        try {
            $data = $this->banner->add();
            DB::commit();
            $message = [
                'status' => true,
                'data' => $data,
                'message' => "Success Add Banner"
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

    function editBanner(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $this->banner->edit($id);
            DB::commit();
            $message = [
                'status' => true,
                'message' => "Success Edit Banner"
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

    function deleteBanner($id)
    {
        DB::beginTransaction();
        try {
            $this->banner->delete($id);
            DB::commit();
            $message = [
                'status' => true,
                'message' => "Success Delete Banner"
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
