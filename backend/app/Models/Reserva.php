<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = ['usuario_id', 'espaco_id', 'nome', 'horario_inicio', 'horario_fim', 'status', 'data'];

    // Relacionamentos
    public function usuario()
    {
        return $this->belongsTo(User::class, 'usuario_id');
    }

    public function espaco()
    {
        return $this->belongsTo(Espaco::class, 'espaco_id');
    }
}
