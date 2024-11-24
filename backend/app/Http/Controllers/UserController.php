<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::get();
        return response()->json($user);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        return response()->json($user);    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
{
    // Buscar o usuário pelo ID
    $user = User::find($id);

    // Verificar se o usuário existe
    if (!$user) {
        return response()->json(['error' => 'Usuário não encontrado'], 404);
    }

    // Validar os dados recebidos
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => [
            'required',
            'email',
            'unique:users,email,' . $id, // Permitir o mesmo email se pertencer ao próprio usuário
            'max:255',
            function ($attribute, $value, $fail) {
                if (!str_ends_with($value, '@gmail.com')) {
                    $fail('O email deve ser um endereço válido do domínio @gmail.com.');
                }
            },
        ],
        'papel' => 'required|string|max:50',
        'password' => 'nullable|string|min:8', // Senha opcional
    ]);

    // Retornar erros de validação, se existirem
    if ($validator->fails()) {
        return response()->json(['errors' => $validator->errors()], 422);
    }

    // Dados validados
    $validatedData = $validator->validated();

    // Atualizar a senha se enviada
    if (!empty($validatedData['password'])) {
        $validatedData['password'] = Hash::make($validatedData['password']);
    } else {
        unset($validatedData['password']); // Remove a senha para não sobrescrever
    }

    // Atualizar os dados do usuário
    $user->update($validatedData);

    // Retornar o usuário atualizado
    return response()->json([
        'message' => 'Usuário atualizado com sucesso',
        'user' => $user,
    ]);
}





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        $user->delete();

        return response()->json($user);
    }
}
