<?php

namespace App\Http\Controllers;

use App\Models\PictureGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class PictureGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pictureGallery = DB::table('picture_galleries')->paginate(5);
        return response()->json($pictureGallery);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required',
            'title' => 'required',
            'desc' => 'required',
            'category_galleries_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->hasFile('file')) {
            $image  = $request->file('file');
            $result = CloudinaryStorage::upload($image->getRealPath(), $image->getClientOriginalName());

            $pictureGallery = PictureGallery::create([
                'file' => $result, // Menyimpan URL file ke dalam kolom 'file'
                'title' => $request->title,
                'desc' => $request->desc,
                'category_galleries_id' => $request->category_galleries_id,
            ]);

            if ($pictureGallery) {
                return response()->json([
                    'success' => true,
                    'message' => 'Success Add Picture Gallery',
                    'data'    => $pictureGallery,
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
    public function show(PictureGallery $pictureGallery, $id)
    {
        $pictureGallery = PictureGallery::findOrFail($id);
        if ($pictureGallery) {
            return response()->json([
                'status'  => 'Success Show Role',
                'data' => $pictureGallery
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
    public function update(Request $request, PictureGallery $pictureGallery, $id)
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required',
            'title' => 'required',
            'desc' => 'required',
            'category_galleries_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        if ($request->hasFile('file')) {
            $pictureGallery = PictureGallery::findOrFail($id);
            $image  = $request->file('file');
            $result = CloudinaryStorage::replace($pictureGallery->file, $image->getRealPath(), $image->getClientOriginalName());

            $pictureGallery = PictureGallery::find($id)->update([
                'file' => $result, // Menyimpan URL file ke dalam kolom 'file'
                'title' => $request->title,
                'desc' => $request->desc,
                'category_galleries_id' => $request->category_galleries_id,
            ]);

            if ($pictureGallery) {
                return response()->json([
                    'success' => true,
                    'message' => 'Success Update Picture Gallery',
                ], 201);
            }
        }

        return response()->json([
            'success' => false,
            "message" => "Update failed. Please try again later."
        ], 409);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PictureGallery $pictureGallery, $id)
    {
        CloudinaryStorage::delete($pictureGallery->file);
        $pictureGallery->delete();
        $pictureGallery = PictureGallery::find($id)->delete();
        if ($pictureGallery) {
            return response()->json([
                'status' => true,
                'message' => 'Success Delete Picture Gallery'
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Delete failed, Please try again later.'
        ], 200);
    }
}
