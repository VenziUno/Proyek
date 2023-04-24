<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Todo::latest()->get());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Todo::create([
            'title' => $request->title,
            'is_done' => $request->is_done,
        ]);
        return response()->json([
                'message' => 'Todo updated successfully',
            ],
            200
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Todo $todo)
    {
        return response()->json($todo, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $todo->update($request->only(['title', 'is_done']));
        return response()->json([
            'message' => 'Todo updated successfully',
            'todo' => $todo
            ],
            200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return response()->json([
            'message' => 'Todo deleted successfully'
            ],
            200
        );
    }
}
