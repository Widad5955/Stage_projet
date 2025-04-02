import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const AddMouvementForm = () => {
  const [formData, setFormData] = useState({
    n_serie: '',
    date_mouvement: '',
    service: '',
    nature: 'depot', // Valeur par défaut pour nature
    demande: '',
    quantité: 1, // Valeur par défaut pour quantité
  });

  const [articles, setArticles] = useState([]); // État pour stocker les articles
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Pour naviguer après l'ajout
  useEffect(() => {
    // Définir la date par défaut
    const currentDate = new Date().toISOString().split('T')[0];
    setFormData((prevData) => ({
      ...prevData,
      date_mouvement: currentDate,
    }));
  
    // Charger les articles depuis l'API
    axios.get('http://192.168.1.66:8000/api/articles')
      .then(response => {
        console.log("Données reçues:", response.data); // Debug
        setArticles(response.data);
      })
      .catch(error => {
        console.error("Erreur API:", error); // Afficher l'erreur exacte
        setError("Erreur lors du chargement des articles");
      });
  
  }, []); // <<< Ajout de la parenthèse fermante et du tableau de dépendances
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://192.168.1.66:8000/api/mouvements', formData);
      navigate('/mouvements'); // Rediriger après l'ajout
    } catch (error) {
      setError('Erreur lors de l\'ajout du mouvement');
    }
  };

  return (
    <div className="container mt-4">
      <h3>Ajouter un Mouvement</h3>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Numéro de série</label>
          <select
            name="n_serie"
            value={formData.n_serie}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Sélectionner un numéro de série</option>
            {articles.map((article) => (
              <option key={article.id} value={article.numero_serie}>
                {article.numero_serie}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Date de Mouvement</label>
          <input
            type="date"
            name="date_mouvement"
            value={formData.date_mouvement}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Service</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Nature</label>
          <div className="form-check">
            <input
              type="radio"
              name="nature"
              value="depot"
              checked={formData.nature === 'depot'}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Dépot</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="nature"
              value="retraite"
              checked={formData.nature === 'retraite'}
              onChange={handleChange}
              className="form-check-input"
            />
            <label className="form-check-label">Retraite</label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Demande</label>
          <input
            type="text"
            name="demande"
            value={formData.demande}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantité</label>
          <input
            type="number"
            name="quantité"
            value={formData.quantité}
            onChange={handleChange}
            className="form-control"
            required
            min="1"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Ajouter
          </button>
        </div>
      </form>
      <div>
        <Link to="/mouvements" className="btn btn-secondary mt-3">Retour à la liste</Link>
      </div>
    </div>
  );
};

export default AddMouvementForm;
