<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    /**
     * Create a new user instance after a valid registration.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function create(Request $request)
{
    // Validação dos dados recebidos
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            'unique:users,email',
            'max:255',
            function ($attribute, $value, $fail) {
                if (!str_ends_with($value, '@gmail.com')) {
                    $fail('O email deve ser um endereço válido do domínio @gmail.com.');
                }
            },
        ],
        'papel' => 'required|string|max:50',
        'password' => 'required|string|min:8', // Confirmado
    ]);

    // Retornar erros de validação, se existirem
    if ($validator->fails()) {
        return response()->json([
            'errors' => $validator->errors()
        ], 422);
    }

    // Criar usuário com dados validados
    $validatedData = $validator->validated();

    $user = User::create([
        'name' => $validatedData['name'],
        'email' => $validatedData['email'],
        'papel' => $validatedData['papel'], // Certifica que o campo "papel" é usado corretamente
        'password' => Hash::make($validatedData['password']),
    ]);

    // Retornar o usuário criado
    return response()->json([
        'message' => 'Usuário criado com sucesso',
        'user' => $user,
    ], 201);
}

}
