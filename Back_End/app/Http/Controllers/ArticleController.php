<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return response()->json(Article::all());

    }

    public function store(Request $request)
    {
        $article = Article::create($request->all());
        return response()->json($article, 201);
    }
    
    public function show(Article $article)
    {
        return response()->json($article);
    }

    public function update(Request $request, $numero_serie)
    {
        // Validation des données
        $validated = $request->validate([
            'numero_serie' => 'required|string|max:255',  // Assurez-vous que le numero_serie est bien validé
            'categorie_produit' => 'required|string|max:255',
            'marque_produit' => 'required|string|max:255',
            'inv' => 'required|string|max:255',
            'source_produit' => 'required|string|max:255',
            'etat_produit' => 'required|string|max:255',
            'date_entree' => 'required|date',
        ]);
    
        // Rechercher l'article par numero_serie
        $article = Article::where('numero_serie', $numero_serie)->first();
    
        if (!$article) {
            return response()->json(['message' => 'Article non trouvé'], 404);
        }
    
        // Mettre à jour les champs avec les nouvelles données
        $article->update($validated);
    
        return response()->json(['message' => 'Article mis à jour avec succès', 'article' => $article]);
    }
    

    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(['message' => 'Article supprimé']);
    }
}
