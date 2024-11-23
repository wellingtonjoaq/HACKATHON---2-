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
        return $ambientes;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('ambientes.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dados = $request->validate([
            'nome' => 'required|string|max:255',
            'tipo' => 'required|string',
            'status' => 'required|string',
            'descricao' => 'required|string',
        ]);

        try {
            $ambiente = Ambiente::create($dados);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Erro ao salvar o ambiente. Por favor, tente novamente.'], 500);
        }

        return response()->json([
            'message' => 'Ambiente criado com sucesso!',
            'ambiente' => $ambiente
        ], 201);

    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $ambiente = Ambiente::find($id);

        return  $ambiente;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $ambiente = Ambiente::find($id);

        return $ambiente;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $ambiente = Ambiente::find($id);

        $dados = $request->validate([
            'nome' => 'required|string|max:255',
            'tipo' => 'required|string',
            'status' => 'required|string',
            'descricao' => 'required|string',
        ]);

        $ambiente->update($dados);

        return redirect('/ambientes');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $ambiente = Ambiente::find($id);

        $ambiente->delete();

        return redirect('/ambiente');
    }
}
