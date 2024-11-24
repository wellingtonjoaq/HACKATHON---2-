<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    use AuthenticatesUsers;

    protected $redirectTo = '/home';

    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();

            return response()->json([
                'message' => 'Login realizado com sucesso!',
                'user' => $user,
            ], 200);
        }

        return response()->json([
            'message' => 'Credenciais inválidas. Tente novamente.',
        ], 401);
    }

    public function logout(Request $request)
    {
        Auth::logout();

        return response()->json(['message' => 'Logout realizado com sucesso!'], 200);
    }
}

