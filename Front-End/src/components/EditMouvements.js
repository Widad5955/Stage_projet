import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

const EditMouvementForm = ({ fetchMouvements, setShowEditForm }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { mouvement } = location.state || {}; 
  const [formData, setFormData] = useState({
    n_serie: "",
    date_mouvement: "",
    service: "",
    nature: "",
    demande: "",
    quantité: "",
    operation: "",  
  });

  useEffect(() => {
    if (mouvement) {
      setFormData({
        n_serie: mouvement.n_serie,
        date_mouvement: mouvement.date_mouvement,
        service: mouvement.service,
        nature: mouvement.nature || "", 
        demande: mouvement.demande,
        quantité: mouvement.quantité,
        operation: mouvement.operation || "",
      });
    }
  }, [mouvement]);
  
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
      await axios.put(`http://127.0.0.1:8000/api/mouvements/${mouvement.id}`, formData);
      navigate('/mouvements');

    } catch (error) {
      console.error("Erreur lors de la modification du mouvement :", error);     

    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Modifier le Mouvement</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Numéro de série</label>
          <input disabled type="text" name="n_serie" value={formData.n_serie} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Date de Mouvement</label>
          <input type="date" name="date_mouvement" value={formData.date_mouvement} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Service</label>
          <input type="text" name="service" value={formData.service} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Nature</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="nature"
              id="natureDepot"
              value="depot"
              checked={formData.nature === "depot"}
              onChange={handleChange}
              required
            />
            <label className="form-check-label" htmlFor="natureDepot">
              Depot
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="nature"
              id="natureRetraite"
              value="retraite"
              checked={formData.nature === "retraite"}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="natureRetraite">
              Retraite
            </label>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Demande</label>
          <input type="text" name="demande" value={formData.demande} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Quantité</label>
          <input type="number" name="quantité" value={formData.quantité} onChange={handleChange} className="form-control" required />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">Modifier</button>
        </div>
      </form>
      <div>
        <Link to="/mouvements" className="btn btn-secondary mt-3">Retour à la liste</Link>
      </div>
    </div>
  );
};

export default EditMouvementForm;