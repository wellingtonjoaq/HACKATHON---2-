<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('espacos', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('localidade');
            $table->string('capacidade');
            $table->text('recursosInstalados'); // Alterado para TEXT, permitindo armazenamento de JSON
            $table->string('disponibilidadeInicio');
            $table->string('disponibilidadeFim');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('espacos');
    }
};
