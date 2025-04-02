<?php

namespace App\Http\Controllers;

use App\Models\Mouvement;
use Illuminate\Http\Request;

class MouvementController extends Controller
{
    public function index()
    {
        return response()->json(Mouvement::all());
    }

    public function store(Request $request)
    {
        $mouvement = Mouvement::create($request->all());
        return response()->json($mouvement, 201);
    }

    public function show(Mouvement $mouvement)
    {
        return response()->json($mouvement);
    }

    public function update(Request $request, Mouvement $mouvement)
    {
        $mouvement->update($request->all());
        return response()->json($mouvement);
    }

    public function destroy(Mouvement $mouvement)
    {
        $mouvement->delete();
        return response()->json(['message' => 'Mouvement supprimé']);
    }
}
