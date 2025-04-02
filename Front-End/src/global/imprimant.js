import React, { useState, useEffect } from "react";
import "../assest/styles/imprimante.css";

const BulletinAffectation = () => {
  const [addedArticles, setAddedArticles] = useState([]);
  const [isPrinted, setIsPrinted] = useState(false);
  const [objet, setObjet] = useState("");
  const [annexe, setAnnexe] = useState("");
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    const storedArticles = localStorage.getItem("selectedArticles");
    if (storedArticles) {
      setAddedArticles(JSON.parse(storedArticles));
    }

    const storedChoix = localStorage.getItem("choixImpression");
    if (storedChoix) {
      setAnnexe(storedChoix); // Afficher Annexe / Division / Service selon le choix
    }
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedArticles = [...addedArticles];
    updatedArticles[index][field] = parseInt(value, 10) || 1; // Empêche NaN et valeurs invalides
    setAddedArticles(updatedArticles);
    localStorage.setItem("selectedArticles", JSON.stringify(updatedArticles)); // Sauvegarde automatique
  };

  const handlePrint = () => {
    window.print();
    setIsPrinted(true);
  };

  return (
    <div className="document-container">
      <div className="document-header">
        <p className="paragraph-left-center">
          ROYAUME DU MAROC<br />
          MINISTÈRE DE L'INTÉRIEUR <br />
          WILAYA DE LA RÉGION DU GRAND CASABLANCA <br />
          PRÉFECTURE DE CASABLANCA <br />
          PRÉFECTURE D'ARRONDISSEMENTS SIDI BERNOUSSI <br />
          SECRÉTARIAT GÉNÉRAL <br />
          D.S.C. I.D.S
        </p>
        <p className="date-right">Casablanca, le {today}</p>
      </div>

      <h2 className="title">Bulletin de Passage d'affectation</h2>

      <p className="paragraph"><strong>Je soussigné M. :</strong> ...................................................</p>
      <p className="paragraph">
        Certifie avoir reçu de la division des systèmes d’information et de télécommunication et de digitalisation des services le matériel suivant <strong>A TITRE DE PRÊT</strong> :
      </p>

      <div className="print-object-section">
        <strong>{annexe} :</strong> {/* Affiche "Annexe administrative :", "Division :" ou "Service :" */}
        <input type="text" className="paragraph" />
        <input type="text" value={objet} onChange={(e) => setObjet(e.target.value)} className="input-field" placeholder="Décrire l'objet ..." />
      </div>

      {addedArticles.length > 0 && (
        <table className="articles-table">
          <thead>
            <tr>
              <th>Désignation</th>
              <th>Quantité</th>
              <th>Numéro d'inventaire</th>
            </tr>
          </thead>
          <tbody>
            {addedArticles.map((article, index) => (
              <tr key={index}>
                <td>{article.categorie_produit} : {article.marque_produit} <br /> S/N : {article.numero_serie}</td>
                <td>
                  <input 
                    type="number"
                    min="1"
                    value={article.quantity || 1}
                    onChange={(e) => handleInputChange(index, "quantity", e.target.value)}
                  />
                </td>
                <td>
                  <input 
                    type="text"
                    value={article.inv || ""}
                    onChange={(e) => handleInputChange(index, "inv", e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="signature-section">Signature</p>

      {!isPrinted && (
        <div className="print-button-container">
          <button onClick={handlePrint} className="print-button">
            Imprimer 
          </button>
        </div>
      )}
    </div>
  );
};

export default BulletinAffectation;
