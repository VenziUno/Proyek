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
            // 'category_galleri_id' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $file = $request->file('file');
        $filename = time() . '_' . $file->getClientOriginalName();
        $path = public_path('storage/images/' . $filename);
        $file->move(public_path('storage/images/'), $filename);

        $pictureGallery = PictureGallery::create([
            'file' => $filename,
            'title' => $request->title,
            'desc' => $request->desc,
            'category_galleries_id' => $request->category_galleries_id,
        ]);

        if ($pictureGallery) {
            return response()->json([
                'success' => true,
                'message' => 'Success Add Category Gallery',
                'data'    => $pictureGallery,
                'path' => $path
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
    public function show(PictureGallery $pictureGallery)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, PictureGallery $pictureGallery)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PictureGallery $pictureGallery)
    {
        //
    }
}
