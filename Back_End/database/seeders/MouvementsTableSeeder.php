<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MouvementsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('mouvements')->insert([
            [
                'n_serie' => 'A001', // Référence à numero_serie dans articles
                'date_mouvement' => Carbon::now()->format('Y-m-d'),
                'service' => 'Maintenance',
                'nature' => 'Réparation',
                'demande' => 'Casse écran',
                'quantité' => 1,
            ],
            [
                'n_serie' => 'A002', // Référence à numero_serie dans articles
                'date_mouvement' => Carbon::now()->format('Y-m-d'),
                'service' => 'Logistique',
                'nature' => 'Déplacement',
                'demande' => 'Réorganiser stock',
                'quantité' => 5,
            ],
        ]);
    }
}

