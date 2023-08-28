<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login']]);
    }

    public function index()
    {
        $user = User::with('profile','role')->paginate(5);
        return response()->json($user);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        if (!$token = Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau Password Anda salah'
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'min:2',
                'max:255'
            ],
            'email' => [
                'required',
                'email',
                'unique:users'
            ],
            'password' => [
                'required',
                'min:8',              // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
                // 'confirmed',
            ],
            'role_id' => [
                'required'
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        $profile = $user->profile()->create([
            'photo' => $request->photo,
            'religion' => $request->religion,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'province' => $request->province,
            'city' => $request->city,
            'districts' => $request->districts,
            'portal_code' => $request->portal_code,
            'user_id' => $user->id,
        ]);

        if ($user && $profile) {
            $userWithProfile = User::with('profile')->find($user->id);
            return response()->json([
                'success' => true,
                'message' => "Registration successful",
                'user'    => $userWithProfile,
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Registration failed. Please try again later."
        ], 409);
    }

    public function show(User $user, $id)
    {
        $user = User::with('profile')->findOrFail($id);
        if ($user) {
            return response()->json([
                'status' => true,
                'message'  => 'Success Show Building',
                'data' => $user,
            ], 200);
        }
        return response()->json([
            'status' => false,
            'message' => 'Show failed, Please try again later.'
        ], 200);
    }

    public function update(Request $request, User $user, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => [
                'required',
                'min:2',
                'max:255'
            ],
            'email' => [
                'required',
                'email',
            ],
            'password' => [
                'nullable',
                'min:8',              // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ],
            'role_id' => [
                'required'
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::find($id);

        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $request->role_id,
        ]);

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User not found',
            ], 404);
        }

        $profile = $user->profile;

        if (!$profile) {
            return response()->json([
                'success' => false,
                'message' => 'Profile not found',
            ], 404);
        }

        $profile->update([
            'photo' => $request->photo,
            'religion' => $request->religion,
            'place_of_birth' => $request->place_of_birth,
            'date_of_birth' => $request->date_of_birth,
            'phone_number' => $request->phone_number,
            'address' => $request->address,
            'province' => $request->province,
            'city' => $request->city,
            'districts' => $request->districts,
            'portal_code' => $request->portal_code,
            'user_id' => $user->id,
        ]);

        if ($user) {
            $userWithProfile = User::with('profile')->find($user->id);
            return response()->json([
                'success' => true,
                'message' => "Registration successful",
                'user'    => $userWithProfile,
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Registration failed. Please try again later."
        ], 409);
    }

    public function destory(User $user,$id)
    {
        $user = User::find($id);

        $profile = $user->profile->delete();
        $user->delete();

        if ($user && $profile) {
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

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }
}
