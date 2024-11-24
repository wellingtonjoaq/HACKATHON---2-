<?php

namespace App\Http\Controllers;

use App\Models\Historico_reserva;
use App\Models\Reserva;
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
        $historico_reserva = new Historico_reserva();

        $reservas = Reserva::all();

        return response()->json([
            'historico_reserva' => $historico_reserva,
            'reservas' => $reservas
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $dados = $this->validateRequest($request);

            $Historico_reserva = Historico_reserva::create($dados);

            return response()->json([
                'message' => 'Historico da Reserva criado com sucesso!',
                'Historico_reserva' => $Historico_reserva
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao salvar o Historico reserva. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
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

        try {
            $dados = $this->validateRequest($request);

            $historico_reserva->update($dados);

            return response()->json([
                'message' => 'historico da Reserva atualizado com sucesso!',
                'historico_reserva' => $historico_reserva
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar a Historico reserva. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
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

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'reserva_id' => 'required|exists:reservas,id',
            'alteracoes' => 'required|string',
            'modificado_em' => 'required|date',
        ], [
            'reserva_id.required' => 'O campo reserva é obrigatório.',
            'reserva_id.exists' => 'A reserva selecionada não existe.',
            'alteracoes.required' => 'O campo alterações é obrigatório.',
            'alteracoes.string' => 'O campo alterações deve ser um texto válido.',
            'modificado_em.required' => 'O campo modificado em é obrigatório.',
            'modificado_em.date' => 'O campo modificado em deve estar em um formato de data válido (AAAA-MM-DD).',
        ]);
    }
}
