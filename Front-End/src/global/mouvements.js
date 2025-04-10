import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import SearchBarMouv from "../components/SearchBarMouv";
import EditMouvementForm from "../components/EditMouvements";
import AddMouvementForm from "../components/AddMouvements";
import "../assest/styles/produit.css";
import ReactPaginate from "react-paginate";

const MouvementArticle = () => {
  const [mouvements, setMouvements] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedMouvement, setSelectedMouvement] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 7;

  const fetchMouvements = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/mouvements");
      setMouvements(response.data);
    } catch (err) {
      setError("Erreur lors du chargement des mouvements");
    }
  };

  useEffect(() => {
    fetchMouvements();
    setCurrentPage(0);
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredMouvements = mouvements.filter((mouvement) =>
    mouvement.n_serie.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mouvement.date_mouvement.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mouvement.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mouvement.nature.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mouvement.demande.toLowerCase().includes(searchQuery.toLowerCase()) ||
    String(mouvement.quantité).toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Tri des mouvements par date (du plus récent au plus ancien)
  const sortedMouvements = filteredMouvements.sort(
    (a, b) => new Date(b.date_mouvement) - new Date(a.date_mouvement)
  );
  
  const pageCount = Math.ceil(sortedMouvements.length / articlesPerPage);
  const offset = currentPage * articlesPerPage;
  const currentMouvements = sortedMouvements.slice(offset, offset + articlesPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleBackButtonClick = () => {
    setShowAddForm(false);
    setShowEditForm(false);
  };

  return (
    <div className="container mt-4">
      {!showAddForm && !showEditForm && (
        <>
          <h2>Gestion des Mouvements</h2>
          <SearchBarMouv searchQuery={searchQuery} onSearchChange={handleSearchChange} />
          <Link to="/addMouvements" className="btn btn-primary mb-3">
            Ajouter un Mouvement
          </Link>
        </>
      )}

      {showAddForm && (
        <div>
          <AddMouvementForm fetchMouvements={fetchMouvements} setShowAddForm={setShowAddForm} />
          <button className="btn btn-secondary mt-3" onClick={handleBackButtonClick}>
            Retour à la liste
          </button>
        </div>
      )}

      {showEditForm && selectedMouvement && (
        <div>
          <EditMouvementForm
            mouvement={selectedMouvement}
            fetchMouvements={fetchMouvements}
            setShowEditForm={setShowEditForm}
          />
          <button className="btn btn-secondary mt-3" onClick={handleBackButtonClick}>
            Retour à la liste
          </button>
        </div>
      )}

      {!showAddForm && !showEditForm && (
        <>
          <table className="table table-bordered table-striped mt-3">
            <thead>
              <tr>
                <th>N° Série</th>
                <th>Date Mouvement</th>
                <th>Service</th>
                <th>Nature</th>
                <th>Demande</th>
                <th>Quantité</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentMouvements.map((mouvement) => (
                <tr key={mouvement.id}>
                  <td>{mouvement.n_serie}</td>
                  <td>{mouvement.date_mouvement}</td>
                  <td>{mouvement.service}</td>
                  <td>{mouvement.nature}</td>
                  <td>{mouvement.demande}</td>
                  <td>{mouvement.quantité}</td>
                  <td>
                    <div className="d-flex">
                      <Link to="/editMouvements" state={{ mouvement }} className="btn btn-warning btn-sm">
                        Modifier
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <ReactPaginate
            previousLabel={"Préc"}
            nextLabel={"Suivant"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={7}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
          />
        </>
      )}
    </div>
  );
};

export default MouvementArticle;