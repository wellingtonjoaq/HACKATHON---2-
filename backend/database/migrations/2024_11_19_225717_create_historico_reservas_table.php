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
        Schema::create('historico_reservas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('reserva_id'); // Coluna da chave estrangeira

            // Definindo a chave estrangeira
            $table->foreign('reserva_id') // Nome da coluna que será chave estrangeira
                  ->references('id') // Coluna referenciada na tabela 'usuarios'
                  ->on('reservas') // Nome da tabela referenciada
                  ->onDelete('cascade'); // Ação ao excluir o registro na tabela 'usuarios'

            $table->string('alteracoes');
            $table->date('modificado_em');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('historico_reservas');
    }
};
