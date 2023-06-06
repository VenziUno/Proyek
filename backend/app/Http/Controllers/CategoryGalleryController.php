<?php

namespace App\Http\Controllers;

use App\Models\CategoryGallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class CategoryGalleryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categoryGallery = DB::table('category_galleries')->paginate(5);
        return response()->json($categoryGallery);
    }

    /**
     * Displays usable code
     */
    public function getCode(){
        $number = CategoryGallery::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,2);
            $sum = (int)$slice + 1;
            $new_number = 'CG' . sprintf("%03d", $sum);
        } else {
            $new_number = 'CG' . sprintf("%03d", 1);
        }
        return response()->json([
            'status' => true,
            'message' => 'Success Get Code categoryGallery',
            'code'=> $new_number
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|unique:category_galleries',
            'name' => 'required|unique:category_galleries',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $categoryGallery=CategoryGallery::create([
            'id' => $request->id,
            'name' => $request->name,
        ]);

        if ($categoryGallery) {
            return response()->json([
                'success' => true,
                'message' => 'Success Add Category Gallery',
                'data'    => $categoryGallery,
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
    public function show(CategoryGallery $categoryGallery, $id)
    {
        $categoryGallery = CategoryGallery::findOrFail($id);
        if ($categoryGallery) {
            return response()->json([
                'status'  => 'Success Show Category Gallery',
                'data' => $categoryGallery
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
    public function update(Request $request, CategoryGallery $categoryGallery, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $categoryGallery=CategoryGallery::find($id)->update([
            'name' => $request->name,
        ]);

        if ($categoryGallery) {
            return response()->json([
                'success' => true,
                'message' => "Success Update Category Gallery",
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
    public function destroy(CategoryGallery $categoryGallery , $id)
    {
        $categoryGallery = CategoryGallery::find($id)->delete();
        if ($categoryGallery) {
            return response()->json([
                'status' => true,
                'message' => 'Success Delete Category Gallery'
            ],200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Delete failed, Please try again later.'
        ],409);
    }
}
