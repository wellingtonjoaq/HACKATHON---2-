<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Historico_reserva extends Model
{
    use HasFactory;

    protected $fillable = ['reserva_id', 'alteracoes', 'modificado_em'];

    public function reserva()
    {
        return $this->belongsTo(User::class, 'reserva_id');
    }
}
