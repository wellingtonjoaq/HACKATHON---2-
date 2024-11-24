<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reserva extends Model
{
    use HasFactory;

    protected $fillable = ['usuario_id', 'espaco_id','horario_inicio', 'horario_fim','data', 'status', 'assunto', 'observacao'];

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
