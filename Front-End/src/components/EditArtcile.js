import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const EditArticleForm = ({ fetchArticles, setShowEditForm }) => {
  const location = useLocation();  // Récupérer l'article depuis le state
  const navigate = useNavigate();
  const { article } = location.state || {}; // Vérifier si l'article est dans le state

  const [formData, setFormData] = useState({
    categorie_produit: '',
    marque_produit: '',
    numero_serie: '',
    inv: '',
    source_produit: '',
    etat_produit: '',
    date_entree: '',
  });


  useEffect(() => {
    if (article) {
      setFormData({
        categorie_produit: article.categorie_produit,
        marque_produit: article.marque_produit,
        numero_serie: article.numero_serie,
        source_produit: article.source_produit,
        etat_produit: article.etat_produit,
        date_entree: article.date_entree,
        inv: article.inv || '',  
      });
    }
  }, [article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.numero_serie) {
      console.error("Le numero_serie est requis");
      return;
    }

    try {
      // Mettre à jour l'article avec les nouvelles données (formData)
      const response = await axios.put(
        `http://127.0.0.1:8000/api/articles/${formData.numero_serie}`, // Utilisation de formData pour envoyer les données
        formData // Envoi des données mises à jour
      );
      console.log('Article modifié avec succès:');
      navigate('/articles');
    } catch (error) {
      console.error('Erreur lors de la modification de l\'article:');
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Modifier l'Article</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label className="form-label" >Numéro de série</label>
          <input
            type="text"
            name="numero_serie"
            value={formData.numero_serie}
            onChange={handleChange}
            className="form-control"
            required
            disabled  
          />
        </div>
        
        <div className="mb-3">
          <label className="form-label">Numéro d'Inventaire (INV)</label>
          <input
            type="text"
            name="inv"
            value={formData.inv}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <select
            name="categorie_produit"
            value={formData.categorie_produit}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="PC">PC</option>
            <option value="Écran">Écran</option>
            <option value="Clavier">Clavier</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Marque</label>
          <select
            name="marque_produit"
            value={formData.marque_produit}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="HP">HP</option>
            <option value="Dell">Dell</option>
            <option value="Lenovo">Lenovo</option>
          </select>
        </div>



        <div className="mb-3">
          <label className="form-label">Source</label>
          <input
            type="text"
            name="source_produit"
            value={formData.source_produit}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">État</label>
          <select
            name="etat_produit"
            value={formData.etat_produit}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="Opérationnel">Opérationnel</option>
            <option value="En panne">En panne</option>
            <option value="Réformé">Réformé</option>
            <option value="En cours">En cours</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date d'entrée</label>
          <input
            type="date"
            name="date_entree"
            value={formData.date_entree}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Modifier
          </button>
        </div>
      </form>

      <div>
        <Link to={`/articles`} className="btn btn-secondary mt-3">Retour à la liste</Link>
      </div>
    </div>
  );
};

export default EditArticleForm;
