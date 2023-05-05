<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::with('buildings')->get();
        return response()->json($rooms);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Room::create([
            'id' => $request->id,
            'name' => $request->name,
            'number_of_floor' => $request->number_of_floor,
            'maximum_people' => $request->maximum_people,
            'building_id' => $request->building_id,
            'status' => $request->status,
        ]);
        return response()->json([
            'status' => 'Success',
            'message' => 'Success Add Room'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room,$id)
    {
        $room = Room::findOrFail($id);
        return response()->json($room,200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Room $room)
    {
        //
    }
}
