<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class BuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buildings = DB::table('buildings')->paginate(5);
        return response()->json($buildings);
    }

    /**
     * Display a listing of the resource With Room.
     */
    public function getBuilding()
    {
        $buildings = Building::with('rooms')->get();
        return response()->json($buildings);
    }

    /**
     * Create a new code according to the one in storage
     */
    public function getCode(){
        $number = Building::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,1);
            $sum = (int)$slice + 1;
            $new_number = 'B' . sprintf("%03d", $sum);
        } else {
            $new_number = 'B' . sprintf("%03d", 1);
        }
        return response()->json([
            'status' => true,
            'message' => 'Success Get Code Building',
            'code'=> $new_number
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|unique:buildings',
            'name' => 'required',
            'floor' => 'required',
            'tall' => 'required',
            'long' => 'required',
            'wide' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $building=Building::create([
            'id' => $request->id,
            'name' => $request->name,
            'floor' => $request->floor,
            'tall' => $request->tall,
            'long' => $request->long,
            'wide' => $request->wide,
            'status' => $request->status,
        ]);

        if ($building) {
            return response()->json([
                'success' => true,
                'message' => 'Success Add Building',
                'data'    => $building,
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
    public function show(Building $building, $id)
    {
        $building = Building::findOrFail($id);
        if ($building) {
            return response()->json([
                'status' => true,
                'message'  => 'Success Show Building',
                'data' => $building,
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
    public function update(Request $request, Building $building, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'floor' => 'required',
            'tall' => 'required',
            'long' => 'required',
            'wide' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $building=Building::find($id)->update([
            'name' => $request->name,
            'floor' => $request->floor,
            'tall' => $request->tall,
            'long' => $request->long,
            'wide' => $request->wide,
            'status' => $request->status,
        ]);

        if ($building) {
            return response()->json([
                'success' => true,
                'message' => "Success Update Building",
                'user'    => $building,
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
    public function destroy(Building $building, $id)
    {
        $building = Building::find($id)->delete();
        if ($building) {
            return response()->json([
                'status' => true,
                'message' => 'Success Delete Building'
            ],200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Delete failed, Please try again later.'
        ],200);
    }
}
