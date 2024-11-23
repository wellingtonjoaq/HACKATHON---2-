<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $reservas = Reserva::with(['usuario', 'ambiente'])->get();

        return response()->json($reservas);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('reservas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dados = $request->validate([
            'usuario_id' => 'required|exists:users,id', // Verifica se o ID existe na tabela 'users'
            'ambiente_id' => 'required|exists:ambientes,id', // Verifica se o ID existe na tabela 'ambientes'
            'horario_inicio' => 'required|string',
            'horario_fim' => 'required|date|string',
            'status' => 'required|string|max:255',
        ]);

        try {
            $reserva = Reserva::create($dados);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao registra reserva. Por favor, tente novamente.'], 500);
        }

        return response()->json([
            'message' => 'Reserva realizada com sucesso!',
            'reserva' => $reserva
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $reserva = Reserva::with(['usuario', 'ambiente'])->find($id);

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
        $reserva = Reserva::with(['usuario', 'ambiente'])->find($id);

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

        $dados = $request->validate([
            'usuario_id' => 'required|exists:users,id',
            'ambiente_id' => 'required|exists:ambientes,id',
            'horario_inicio' => 'required|date|before:horario_fim',
            'horario_fim' => 'required|date|after:horario_inicio',
            'status' => 'required|string|max:255',
        ]);

        try {
            $reserva->update($dados);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao registra reserva. Por favor, tente novamente.'], 500);
        }

        return response()->json([
            'message' => 'Reserva realizada com sucesso!',
            'reserva' => $reserva
        ], 201);
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
}
