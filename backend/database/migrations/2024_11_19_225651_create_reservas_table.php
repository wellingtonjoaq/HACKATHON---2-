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
            $table->unsignedBigInteger('usuario_id'); // Coluna da chave estrangeira

            // Definindo a chave estrangeira
            $table->foreign('usuario_id') // Nome da coluna que será chave estrangeira
                  ->references('id') // Coluna referenciada na tabela 'usuarios'
                  ->on('users') // Nome da tabela referenciada
                  ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'usuarios'

            $table->unsignedBigInteger('ambiente_id'); // Coluna da chave estrangeira

                  // Definindo a chave estrangeira
                  $table->foreign('ambiente_id') // Nome da coluna que será chave estrangeira
                        ->references('id') // Coluna referenciada na tabela 'ambientes'
                        ->on('ambientes') // Nome da tabela referenciada
                        ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'ambientes'

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
