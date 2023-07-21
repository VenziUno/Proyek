<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use CloudinaryLabs\CloudinaryLaravel\Facades\Cloudinary;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $banner = DB::table('banners')->paginate(5);
        return response()->json($banner);
    }

    /**
     *
     */

    public function getCode()
    {
        $number = Banner::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id, 1);
            $sum = (int)$slice + 1;
            $new_number = 'B' . sprintf("%03d", $sum);
        } else {
            $new_number = 'B' . sprintf("%03d", 1);
        }
        return response()->json([
            'status' => true,
            'message' => 'Success Get Code Role',
            'code' => $new_number
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'file' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->hasFile('file')) {
            $image  = $request->file('file');
            $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

            $banner = Banner::create([
                'id' => $request->id,
                'name' => $request->name,
                'file' => $result, // Menyimpan URL file ke dalam kolom 'file'
                'description' => $request->description,
                'status' => $request->status,
            ]);

            if ($banner) {
                return response()->json([
                    'success' => true,
                    'message' => 'Success Add Picture Gallery',
                    'data'    => $banner,
                ], 201);
            }
        }

        return response()->json([
            'success' => false,
            'message' => 'Failed to upload file or create gallery',
        ], 400);
    }

    /**
     * Display the specified resource.
     */
    public function show(Banner $banner, $id)
    {
        $banner = Banner::findOrFail($id);
        if ($banner) {
            return response()->json([
                'status'  => 'Success Show Role',
                'data' => $banner
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Show failed, Please try again later.'
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Banner $banner, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'file' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->hasFile('file')) {
            $banner = Banner::find($id);
            $urlParts = explode('/', $banner->file);
            $publicId = end($urlParts);
            $deleted = CloudinaryStorage::delete($publicId);
            if ($deleted) {
                $image  = $request->file('file');
                $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

                $banner->update([
                    'name' => $request->name,
                    'file' => $result, // Menyimpan URL file ke dalam kolom 'file'
                    'description' => $request->description,
                    'status' => $request->status,
                ]);

                if ($banner) {
                    return response()->json([
                        'success' => true,
                        'message' => 'Success Add Picture Gallery',
                        'data'    => $banner,
                    ], 201);
                }
            } else {
                return response()->json([
                    'success' => false,
                    'message' => 'Failed to delete the file.',
                ], 400);
            }
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Banner $banner, $id)
    {
        $banner = Banner::find($id);
        $urlParts = explode('/', $banner->file);
        $publicId = end($urlParts);
        $deleted = CloudinaryStorage::delete($publicId);
        if ($deleted) {
            $banner->delete();
            if ($banner) {
                return response()->json([
                    'status' => true,
                    'message' => 'Success Delete Role',
                ], 200);
            }
        }else {
            return response()->json([
                'status' => false,
                'message' => 'Delete failed, Please try again later.'
            ], 200);
        }
    }
}
