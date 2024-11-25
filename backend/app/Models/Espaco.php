<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Espaco extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome',
        'localidade',
        'capacidade',
        'recursosInstalados',
    ];

    // Mutator: Salva o array como JSON
    public function setRecursosInstaladosAttribute($value)
    {
        $this->attributes['recursosInstalados'] = json_encode($value);
    }

    // Accessor: Recupera o JSON como array
    public function getRecursosInstaladosAttribute($value)
    {
        return json_decode($value, true);
    }
}
