<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notificacao; // Certifique-se de que o modelo Notificacao existe

class NotificacaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Retorna todas as notificações
        $notificacoes = Notificacao::all();
        return response()->json($notificacoes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // Como a maioria dos sistemas modernos utiliza front-end separado, geralmente esse método não é necessário.
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validação dos dados recebidos
        $validatedData = $request->validate([
            'usuario_id' => 'required|integer',
            'mensagem' => 'required|string|max:255',
            'tipo' => 'required|string|max:50',
        ]);

        // Criação da nova notificação
        $notificacao = Notificacao::create([
            'usuario_id' => $validatedData['usuario_id'],
            'mensagem' => $validatedData['mensagem'],
            'tipo' => $validatedData['tipo'],
            'criado_em' => now(), // Usando o timestamp atual
        ]);

        return response()->json($notificacao, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // Busca a notificação pelo ID
        $notificacao = Notificacao::find($id);

        if (!$notificacao) {
            return response()->json(['error' => 'Notificação não encontrada'], 404);
        }

        return response()->json($notificacao);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // Como a maioria dos sistemas modernos utiliza front-end separado, geralmente esse método não é necessário.
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Busca a notificação pelo ID
        $notificacao = Notificacao::find($id);

        if (!$notificacao) {
            return response()->json(['error' => 'Notificação não encontrada'], 404);
        }

        // Validação dos dados recebidos
        $validatedData = $request->validate([
            'usuario_id' => 'sometimes|integer',
            'mensagem' => 'sometimes|string|max:255',
            'tipo' => 'sometimes|string|max:50',
        ]);

        // Atualização da notificação
        $notificacao->update($validatedData);

        return response()->json($notificacao);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Busca a notificação pelo ID
        $notificacao = Notificacao::find($id);

        if (!$notificacao) {
            return response()->json(['error' => 'Notificação não encontrada'], 404);
        }

        // Remove a notificação
        $notificacao->delete();

        return response()->json(['message' => 'Notificação removida com sucesso']);
    }
}
