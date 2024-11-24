<?php

namespace App\Http\Controllers;

use App\Models\Espaco;
use Illuminate\Http\Request;

class EspacoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $espacos = Espaco::all();

        // Transformar `recursosInstalados` de string para array antes de retornar
        foreach ($espacos as $espaco) {
            $espaco->recursosInstalados = explode(',', $espaco->recursosInstalados);
        }

        return response()->json($espacos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $dados = $this->validateRequest($request);

            // Transformar array de recursos em string antes de salvar no banco
            $dados['recursosInstalados'] = implode(',', $dados['recursosInstalados']);

            $espaco = Espaco::create($dados);

            return response()->json([
                'message' => 'Espaço criado com sucesso!',
                'Espaco' => $espaco
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao salvar o espaço. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $espaco = Espaco::find($id);

        if ($espaco) {
            // Transformar `recursosInstalados` de string para array antes de retornar
            $espaco->recursosInstalados = explode(',', $espaco->recursosInstalados);
        }

        return response()->json($espaco);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $espaco = Espaco::find($id);

        if (!$espaco) {
            return response()->json(['message' => 'Espaço não encontrado.'], 404);
        }

        try {
            $dados = $this->validateRequest($request);

            // Transformar array de recursos em string antes de atualizar no banco
            $dados['recursosInstalados'] = implode(',', $dados['recursosInstalados']);

            $espaco->update($dados);

            return response()->json([
                'message' => 'Espaço atualizado com sucesso!',
                'Espaco' => $espaco
            ], 200);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'message' => 'Erro de validação',
                'errors' => $e->errors(),
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro ao atualizar o espaço. Por favor, tente novamente.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $espaco = Espaco::find($id);

        if (!$espaco) {
            return response()->json(['message' => 'Espaço não encontrado.'], 404);
        }

        $espaco->delete();

        return response()->json(['message' => 'Espaço removido com sucesso!'], 200);
    }

    /**
     * Validar os dados recebidos.
     */
    private function validateRequest(Request $request)
    {
        return $request->validate([
            'nome' => 'required|string|max:255',
            'localidade' => 'required|string|max:255',
            'capacidade' => 'required|string|max:100',
            'recursosInstalados' => 'required|array',
            'recursosInstalados.*' => 'string|max:100',
            'disponibilidadeInicio' => 'required|string|max:100',
            'disponibilidadeFim' => 'required|string|max:100',
        ], [
            'nome.required' => 'O campo nome é obrigatório.',
            'localidade.required' => 'O campo local é obrigatório.',
            'capacidade.required' => 'O campo capacidade é obrigatório.',
            'recursosInstalados.required' => 'O campo recursos é obrigatório.',
            'recursosInstalados.array' => 'Os recursos devem ser enviados como um array.',
            'recursosInstalados.*.string' => 'Cada recurso deve ser uma string.',
            'recursosInstalados.*.max' => 'Cada recurso deve ter no máximo 100 caracteres.',
            'disponibilidadeInicio.required' => 'O campo disponibilidade é obrigatório.',
            'disponibilidadeFim.required' => 'O campo disponibilidade é obrigatório.',
        ]);
    }
}
