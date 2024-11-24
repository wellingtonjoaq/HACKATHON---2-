<?php

namespace App\Http\Controllers;

use App\Models\Ambiente;
use Illuminate\Http\Request;

class AmbienteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ambientes = Ambiente::get();

        return response()->json($ambientes);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $ambiente = new Ambiente();

        return response()->json($ambiente);

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
{
    try {
        $dados = $this->validateRequest($request);

        $ambiente = Ambiente::create($dados);

        return response()->json([
            'message' => 'Ambiente criado com sucesso!',
            'ambiente' => $ambiente
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {
        return response()->json([
            'message' => 'Erro de validação',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erro ao salvar o ambiente. Por favor, tente novamente.',
            'error' => $e->getMessage(),
        ], 500);
    }
}


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ambiente = Ambiente::find($id);

        return response()->json($ambiente);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $ambiente = Ambiente::find($id);

        if (!$ambiente) {
            return response()->json(['mensagem' => 'Ambiente não encontrada.'], 404);
        }

        return response()->json($ambiente);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ambiente = Ambiente::find($id);

        try {
            $dados = $this->validateRequest($request);

            $ambiente->update($dados);

            return response()->json([
                'message' => 'Ambiente atualizado com sucesso!',
                'ambiente' => $ambiente
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar o ambiente. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ambiente = Ambiente::find($id);

        $ambiente->delete();

        return response()->json([
            'message' => 'Ambiente removido com sucesso!'
        ], 200);
    }

    private function validateRequest(Request $request)
    {
        return $request->validate([
            'nome' => 'required|string|max:255',
            'local' => 'required|string|max:255',
            'capacidade' => 'required|string|max:100',
            'recursos' => 'required|string|max:500',
            'descricao' => 'required|string|max:1000',
        ], [
            'nome.required' => 'O campo nome é obrigatório.',
            'local.required' => 'O campo local é obrigatório.',
            'capacidade.required' => 'O campo capacidade é obrigatório.',
            'recursos.required' => 'O campo recursos é obrigatório.',
            'descricao.required' => 'O campo descrição é obrigatório.',
            'nome.max' => 'O nome deve ter no máximo 255 caracteres.',
            'local.max' => 'O local deve ter no máximo 255 caracteres.',
            'capacidade.max' => 'A capacidade deve ter no máximo 100 caracteres.',
            'recursos.max' => 'Os recursos devem ter no máximo 500 caracteres.',
            'descricao.max' => 'A descrição deve ter no máximo 1000 caracteres.',
        ]);
    }
}
