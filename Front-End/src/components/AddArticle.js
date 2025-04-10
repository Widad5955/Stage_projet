import React, { useState, useEffect } from "react";
import axios from "axios";
import '../assest/styles/add.css';
import { Link , useNavigate} from 'react-router-dom';

const AddArticleForm = ({ fetchArticles, setShowAddForm }) => {
  const [formData, setFormData] = useState({
    categorie_produit: "",
    marque_produit: "",
    numero_serie: "",
    inv:"",
    source_produit: "",
    etat_produit: "",
    date_entree: "",
  });

  const [error, setError] = useState("");
const navigate = useNavigate();
  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({
      ...prevData,
      date_entree: today,
    }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categorie_produit || !formData.marque_produit || !formData.etat_produit || !formData.numero_serie) {
        setError("Tous les champs doivent être remplis.");
        return;
    }

    let cleanedData = { ...formData };
    if (cleanedData.inv === "") {
        delete cleanedData.inv;
    }


    try {
      console.log("Données envoyées ");
      const response = await axios.post("http://127.0.0.1:8000/api/articles", cleanedData);
      
        if (response.status === 201) {
            setFormData({
                categorie_produit: "",
                marque_produit: "",
                numero_serie: "",
                inv: "",
                source_produit: "",
                etat_produit: "",
                date_entree: new Date().toISOString().split("T")[0],
            });

            setError("");
            navigate("/articles");
        } else {
            setError("Échec de l'ajout de l'article.");
        }
    }
    catch (error) {

          console.error("Erreur:", error.message);
          setError("Une erreur inconnue est survenue.");
      
  }
  
  
};

  
  

  return (
    <div className="add-article-container">
      <h1>Ajouter un article</h1>
      <form onSubmit={handleSubmit} className="p-3 border rounded">
        {error && <div className="alert alert-danger">{error}</div>} {/* Affichage du message d'erreur */}
        <div className="mb-3">
          <label className="form-label">Numéro de série</label>
          <input
            type="text"
            name="numero_serie"
            value={formData.numero_serie}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Numéro d'inventaire</label>
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
          >
            <option value="">Sélectionner la catégorie de produit</option>
            <option value="pc">PC</option>
            <option value="ecran">Écran</option>
            <option value="clavier">Clavier</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Marque</label>
          <select
            name="marque_produit"
            value={formData.marque_produit}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Sélectionner la marque de produit</option>
            <option value="hp">HP</option>
            <option value="dell">Dell</option>
            <option value="lenovo">Lenovo</option>
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
          />
        </div>

        <div className="mb-3">
          <label className="form-label">État</label>
          <select
            name="etat_produit"
            value={formData.etat_produit}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Sélectionner l'état du produit</option>
            <option value="operationnel">Opérationnel</option>
            <option value="enpanne">En panne</option>
            <option value="reforme">Réformé</option>
            <option value="encours">En cours</option>
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
          />
        </div>

        <button type="submit" className="btn btn-primary">Ajouter l'article</button>
          <Link to={`/articles`} className="btn btn-secondary mt-3">Retour à la liste</Link>
        
      </form>
    </div>
  );
};

export default AddArticleForm;
