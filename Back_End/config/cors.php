<?php

return [
    'paths' => ['api/*'], // Autorise les requêtes vers toutes les routes API
    'allowed_methods' => ['*'], // Autorise toutes les méthodes (GET, POST, PUT, DELETE)
    'allowed_origins' => ['*'], // Autorise toutes les origines (peut être restreint à ['http://localhost:3000'])
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Autorise tous les en-têtes
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => false,
];
