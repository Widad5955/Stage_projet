import React, { useState } from "react";
import axios from "axios";

const DeleteMouvement = ({ articleId , fetchArticles }) => {
  const [showDialog, setShowDialog] = useState(false); // Contrôle de l'affichage de la boîte de dialogue

  const handleDeleteClick = () => {
    setShowDialog(true); // Afficher la boîte de dialogue de confirmation
  };

  const handleDelete = async () => {
    await axios.delete(`http://127.0.0.1:8000/api/articles/${articleId}`);
      // await axios.delete(`http://127.0.0.1:8000/api/mouvements/${mouvementId}`);
      fetchArticles(); // Actualiser la liste des articles après la suppression
      // fetchMouvements(); // Actualiser la liste des mouvements après la suppression
      alert("Mouvement supprimé avec succès");
      setShowDialog(false); // Fermer la boîte de dialogue après la suppression

  };

  const handleCancel = () => {
    setShowDialog(false); // Fermer la boîte de dialogue si l'utilisateur annule
    alert("Suppression annulée");
  };

  return (
    <div>
      <button className="btn btn-danger btn-sm" onClick={handleDeleteClick}>
        Supprimer
      </button>

      {showDialog && (
        <div style={dialogStyle}>
          <div style={dialogContentStyle}>
            <p>Êtes-vous sûr de vouloir supprimer ce mouvement ?</p>
            <button
              className="btn btn-success"
              onClick={handleDelete}
              style={buttonStyle}
            >
              Oui
            </button>
            <button
              className="btn btn-danger"
              onClick={handleCancel}
              style={buttonStyle}
            >
              Non
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Style de la boîte de dialogue
const dialogStyle = {
  position: "fixed",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

// Style du contenu de la boîte de dialogue
const dialogContentStyle = {
  backgroundColor: "white",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
};

// Style des boutons
const buttonStyle = {
  margin: "10px",
};

export default DeleteMouvement;
