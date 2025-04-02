<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ArticlesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $categories = ['Électronique', 'Mobilier', 'Vêtements', 'Accessoires', 'Automobile'];
        $marques = ['Samsung', 'IKEA', 'Nike', 'Apple', 'Toyota'];
        $sources = ['Import', 'Local', 'Fournisseur', 'Réparation'];
        $etats = ['Neuf', 'Occasion', 'Réparé'];

        $articles = [];

        for ($i = 1; $i <= 30; $i++) {
            $articles[] = [
                'numero_serie' => 'A' . str_pad($i, 3, '0', STR_PAD_LEFT), // Ex: A001, A002, ..., A030
                'categorie_produit' => $categories[array_rand($categories)],
                'marque_produit' => $marques[array_rand($marques)],
                'inv' => 'INV-' . str_pad($i, 3, '0', STR_PAD_LEFT),
                'source_produit' => $sources[array_rand($sources)],
                'etat_produit' => $etats[array_rand($etats)],
                'date_entree' => Carbon::now()->subDays(rand(0, 365))->format('Y-m-d'),
            ];
        }

        DB::table('articles')->insert($articles);
    }
}
