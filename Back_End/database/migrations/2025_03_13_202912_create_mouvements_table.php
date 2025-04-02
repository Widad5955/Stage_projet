<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMouvementsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mouvements', function (Blueprint $table) {
            $table->id();
            $table->string('n_serie'); // Référence à numero_serie de la table articles
            $table->date('date_mouvement');
            $table->string('service');
            $table->string('nature');
            $table->string('demande');
            $table->integer('quantité');
            $table->timestamps();

            // Définir n_serie comme clé étrangère
            $table->foreign('n_serie')->references('numero_serie')->on('articles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mouvements');
    }
}
