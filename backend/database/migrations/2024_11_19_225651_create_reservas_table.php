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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();

            // Coluna da chave estrangeira para 'usuario_id', permitindo valores nulos
            $table->unsignedBigInteger('usuario_id')->nullable();

            // Definindo a chave estrangeira para 'usuario_id'
            $table->foreign('usuario_id')
                  ->references('id') // Coluna referenciada na tabela 'users'
                  ->on('users') // Nome da tabela referenciada
                  ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'users'

            // Coluna da chave estrangeira para 'espaco_id', permitindo valores nulos
            $table->unsignedBigInteger('espaco_id')->nullable();

            // Definindo a chave estrangeira para 'espaco_id'
            $table->foreign('espaco_id')
                  ->references('id') // Coluna referenciada na tabela 'espacos'
                  ->on('espacos') // Nome da tabela referenciada
                  ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'espacos'

            $table->string('horario_inicio');
            $table->string('horario_fim');
            $table->date('data');
            $table->string('status');

            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
