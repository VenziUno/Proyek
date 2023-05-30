<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = DB::table('rooms')->paginate(5);
        return response()->json($rooms);
    }

    /**
     * Display a listing of the resource withroom.
     */
    public function getRoom()
    {
        $room = Room::with('buildings')->get();
        return response()->json($room);
    }

        /**
     * Create a new code according to the one in storage
     */
    public function getCode(){
        $number = Room::orderBy('id', 'desc')->first();
        if ($number) {
            $slice = substr($number->id,1);
            $sum = (int)$slice + 1;
            $new_number = 'R' . sprintf("%03d", $sum);
        } else {
            $new_number = 'R' . sprintf("%03d", 1);
        }
        return response()->json([
            'status' => 'Success',
            'message' => 'Success Get Code Room',
            'code'=> $new_number
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'id' => 'required|unique:rooms',
            'name' => 'required',
            'number_of_floor' => 'required',
            'maximum_people' => 'required',
            'building_id' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::create([
            'id' => $request->id,
            'name' => $request->name,
            'number_of_floor' => $request->number_of_floor,
            'maximum_people' => $request->maximum_people,
            'building_id' => $request->building_id,
            'status' => $request->status,
        ]);
        if ($room) {
            return response()->json([
                'success' => true,
                'message' => 'Success Add Room',
                'user'    => $room,
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Create failed. Please try again later."
        ], 409);
    }

    /**
     * Display the specified resource.
     */
    public function show(Room $room,$id)
    {
        $room = Room::findOrFail($id);
        if ($room) {
            return response()->json($room,200);
        }
        return response()->json([
            'status' => 'Success',
            'message' => 'Show failed, Please try again later.'
        ],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Room $room, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'number_of_floor' => 'required',
            'maximum_people' => 'required',
            'building_id' => 'required',
            'status' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $room = Room::find($id)->update([
            'id' => $request->id,
            'name' => $request->name,
            'number_of_floor' => $request->number_of_floor,
            'maximum_people' => $request->maximum_people,
            'building_id' => $request->building_id,
            'status' => $request->status,
        ]);
        if ($room) {
            return response()->json([
                'success' => true,
                'message' => 'Success Update Building',
                'user'    => $room,
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
    public function destroy(Room $room,$id)
    {
        $room = Room::find($id)->delete();
        if ($room) {
            return response()->json([
                'status' => true,
                'message' => 'Success Delete Building'
            ],200);
        }
        return response()->json([
            'status' => 'Success',
            'message' => 'Delete failed, Please try again later.'
        ],200);
    }
}
