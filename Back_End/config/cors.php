<?php

// return [
//     'paths' => ['api/*'], // Autorise les requêtes vers toutes les routes API
//     'allowed_methods' => ['*'], // Autorise toutes les méthodes (GET, POST, PUT, DELETE)
//     'allowed_origins' => ['*'], // Autorise toutes les origines (peut être restreint à ['http://localhost:3000'])
//     'allowed_origins_patterns' => [],
//     'allowed_headers' => ['*'], // Autorise tous les en-têtes
//     'exposed_headers' => [],
//     'max_age' => 0,
//     'supports_credentials' => false,
// ];
return [
    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Active CORS sur les routes API
    'allowed_methods' => ['*'],  // Autoriser toutes les méthodes HTTP (GET, POST, etc.)
    // 'allowed_origins' => ['*'],  // Autoriser toutes les origines (⚠️ À restreindre en pro)
    'allowed_origins' => ['http://localhost:3001', 'http://192.168.1.66:3001'],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],  // Autoriser tous les headers
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false, // Mettre true si tu utilises des cookies avec API
];

// return [