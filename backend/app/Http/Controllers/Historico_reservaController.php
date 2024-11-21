<?php

namespace App\Http\Controllers;

use App\Models\Historico_reserva;
use Illuminate\Http\Request;

class Historico_reservaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $historico_reservas = Historico_reserva::with(['reserva'])->get();

        return response()->json($historico_reservas);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('historico_reservas.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dados = $request->validate([
            'reserva_id' => 'required|exists:reservas,id',
            'alteracoes' => 'required|string',
            'modificado_em' => 'required|date'
        ]);

        try {
            $historico_reserva = Historico_reserva::create($dados);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao ver o historico da reserva. Por favor, tente novamente.'], 500);
        }

        return response()->json([
            'message' => 'historico da reserva',
            'historico_reserva' => $historico_reserva
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $historico_reserva = Historico_reserva::with(['reserva'])->find($id);

        if (!$historico_reserva) {
            return response()->json(['mensagem' => 'Historico da Reserva não encontrada.'], 404);
        }

        return response()->json($historico_reserva);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {

        $historico_reserva= Historico_reserva::with(['reserva'])->find($id);

        if (!$historico_reserva) {
            return response()->json(['mensagem' => 'Historico da Reserva não encontrada.'], 404);
        }

        return response()->json($historico_reserva);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $historico_reserva = Historico_reserva::find($id);

        $dados = $request->validate([
            'reserva_id' => 'required|exists:reservas,id',
            'alteracoes' => 'required|string',
            'modificado_em' => 'required|date'
        ]);

        try {
            $historico_reserva->update($dados);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao ver o historico da reserva. Por favor, tente novamente.'], 500);
        }

        return response()->json([
            'message' => 'historico da reserva',
            'historico_reserva' => $historico_reserva
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $historico_reserva = Historico_reserva::find($id);

        if (!$historico_reserva) {
            return response()->json(['mensagem' => 'historico da Reserva não encontrada.'], 404);
        }

        $historico_reserva->delete();

        return response()->json(['mensagem' => 'Historico da reserva excluída com sucesso!']);
    }
}
