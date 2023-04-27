<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => [
                'required',
                'min:8',              // must be at least 8 characters in length
                'regex:/[a-z]/',      // must contain at least one lowercase letter
                'regex:/[A-Z]/',      // must contain at least one uppercase letter
                'regex:/[0-9]/',      // must contain at least one digit
                'regex:/[@$!%*#?&]/', // must contain a special character
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');
        // $remember = $request->input('remember', false);

        if (!$token = auth()->guard('api')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Email atau Password Anda salah'
            ], 401);
        }

        return response()->json([
            'success' => true,
            'user'    => auth()->guard('api')->user(),
            'token'   => $token
        ], 200);
    }

    public function Register(Request $request)
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
                'confirmed',          // must be at confirmed
            ]
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors());
        }

        $user = User::create([
            'name' => $request->input(key: 'name'),
            'email' => $request->input(key: 'email'),
            'password' => Hash::make($request->input(key: 'password')),
        ]);

        if ($user) {
            return response()->json([
                'success' => true,
                'message' => "Registration successful",
                'user'    => $user,
            ], 201);
        }

        return response()->json([
            'success' => false,
            "message" => "Registration failed. Please try again later."
        ], 409);
    }

    public function user()
    {
        return 'Authenticated user';
    }

    public function logout()
    {
        $cookie = Cookie::forget('jwt');

        return response()->json([
            'success' => true,
            'message' => 'Logout Berhasil!',
        ])->withCookie($cookie);
    }
}
