<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $primaryKey = 'numero_serie';  // Assurez-vous que 'numero_serie' est bien la clé primaire
    public $incrementing = false; // Indiquer que la clé primaire ne s'auto-incrémente pas
    protected $keyType = 'string'; // Définir le type de la clé primaire (string ici)

    protected $fillable = [
        'numero_serie',
        'categorie_produit',
        'marque_produit',
        'inv',
        'source_produit',
        'etat_produit',
        'date_entree',
    ];
}
