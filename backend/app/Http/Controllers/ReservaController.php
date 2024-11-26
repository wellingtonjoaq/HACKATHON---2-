<?php

namespace App\Http\Controllers;

use App\Models\Espaco;
use App\Models\Reserva;
use App\Models\User;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = Reserva::with(['usuario:id,name', 'espaco:id,nome'])->get();

        return response()->json($reservas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $usuarios = User::all();
        $espacos = Espaco::all();

        return response()->json([
            'usuarios' => $usuarios,
            'espacos' => $espacos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $dados = $this->validateRequest($request);

            // Create a new Reserva using the validated data
            $reserva = Reserva::create($dados);

            return response()->json([
                'message' => 'Reserva criada com sucesso!',
                'reserva' => $reserva
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao salvar a reserva. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reserva = Reserva::with(['usuario', 'espaco'])->find($id);

        if (!$reserva) {
            return response()->json(['mensagem' => 'Reserva não encontrada.'], 404);
        }

        return response()->json($reserva);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $reserva = Reserva::with(['usuario:id,name', 'espaco:id,nome'])->find($id);

        if (!$reserva) {
            return response()->json(['mensagem' => 'Reserva não encontrada.'], 404);
        }

        return response()->json($reserva);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json(['mensagem' => 'Reserva não encontrada.'], 404);
        }

        try {
            $dados = $this->validateRequest($request);

            $reserva->update($dados);

            return response()->json([
                'message' => 'Reserva atualizada com sucesso!',
                'reserva' => $reserva
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar a reserva. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $reserva = Reserva::find($id);

        if (!$reserva) {
            return response()->json(['mensagem' => 'Reserva não encontrada.'], 404);
        }

        $reserva->delete();

        return response()->json(['mensagem' => 'Reserva excluída com sucesso!']);
    }

    private function validateRequest(Request $request)
{
    return $request->validate([
        'usuario_id' => 'required|exists:users,id', // Verifica se o ID existe na tabela 'users'
        'espaco_id' => 'required|exists:espacos,id', // Verifica se o ID existe na tabela 'espacos'
        'horario_inicio' => 'required|string',
        'horario_fim' => 'required|string',
        'data' => 'required|date',
        'status' => 'required|string|max:255',
    ], [
        'usuario_id.required' => 'O campo usuário é obrigatório.',
        'usuario_id.exists' => 'O usuário selecionado não existe.',
        'espaco_id.required' => 'O campo espaço é obrigatório.',
        'espaco_id.exists' => 'O espaço selecionado não existe.',
        'horario_inicio.required' => 'O campo horário de início é obrigatório.',
        'horario_inicio.string' => 'O horário de início deve ser um texto válido.',
        'horario_fim.required' => 'O campo horário de término é obrigatório.',
        'horario_fim.string' => 'O horário de término deve ser um texto válido.',
        'data.required' => 'O campo data é obrigatório.',
        'data.date' => 'A data deve estar no formato válido (AAAA-MM-DD).',
        'status.required' => 'O campo status é obrigatório.',
        'status.string' => 'O status deve ser um texto válido.',
        'status.max' => 'O status pode ter no máximo 255 caracteres.',
    ]);
}

}
