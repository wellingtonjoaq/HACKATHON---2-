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
        Schema::create('notificacaos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('usuario_id'); // Coluna da chave estrangeira

            // Definindo a chave estrangeira
            $table->foreign('usuario_id') // Nome da coluna que será chave estrangeira
                  ->references('id') // Coluna referenciada na tabela 'usuarios'
                  ->on('users') // Nome da tabela referenciada
                  ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'usuarios'

            $table->string('mensagem');
            $table->string('tipo');
            $table->date('criado_em');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notificacaos');
    }
};
