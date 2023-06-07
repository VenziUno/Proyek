<?php

namespace App\Http\Controllers;

use App\Models\PictureGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Spatie\Flysystem\Filesystem;

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
            $file = $request->file('file');
            $path = $file->store('folder_name', 'dropbox');
            $url = Storage::disk('dropbox')->url($path); // Menyimpan URL file

            $pictureGallery = PictureGallery::create([
                'file' => $url, // Menyimpan URL file ke dalam kolom 'file'
                'title' => $request->title,
                'desc' => $request->desc,
                'category_galleries_id' => $request->category_galleries_id,
            ]);

            if ($pictureGallery) {
                return response()->json([
                    'success' => true,
                    'message' => 'Success Add Category Gallery',
                    'data'    => $pictureGallery,
                    'path' => $url // Mengirim URL file sebagai respons
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
