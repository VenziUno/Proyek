<?php

namespace App\Http\Controllers;

use App\Models\Building;
use Illuminate\Http\Request;

class BuildingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $buildings = Building::with('rooms')->get();
        return response()->json($buildings);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Building::create([
            'id' => $request->id,
            'name' => $request->name,
            'floor' => $request->floor,
            'tall' => $request->tall,
            'long' => $request->long,
            'wide' => $request->wide,
            'status' => $request->status,
        ]);
        return response()->json([
            'status' => 'Success',
            'message' => 'Success Add Building'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Building $building, $id)
    {
        $building = Building::findOrFail($id);
        return response()->json($building,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Building $building)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Building $building)
    {
        //
    }
}
