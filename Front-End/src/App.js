import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';  // 🟢 Assurez-vous que le chemin est correct
import ArticleManager from './global/produit';
import BulletinAffectation from './global/imprimant';
import MouvementArticle from './global/mouvements';
import EditArticleForm from './components/EditArtcile';
import AddArticleForm from "./components/AddArticle";
import EditMouvementForm from './components/EditMouvements';
import AddMouvementForm from "./components/AddMouvements"; // Importer le composant AddArticleForm


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/articles" element={<ArticleManager />} />
            <Route path="/editArticle" element={<EditArticleForm />} />
            <Route path="/addArticle" element={<AddArticleForm />} />

            <Route path="/addMouvements" element={<AddMouvementForm />} />


            <Route path="/editMouvements" element={<EditMouvementForm />} />

            <Route path="/mouvements" element={<MouvementArticle/>} />
            <Route path="/imprimer" element={<BulletinAffectation />} />
            <Route path="/" element={<ArticleManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
