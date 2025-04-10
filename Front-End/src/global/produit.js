import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import SearchBar from "../components/SearchBar";
import "../assest/styles/produit.css";

const ArticleManager = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticles, setSelectedArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const articlesPerPage = 7; // Nombre d'articles par page
  const navigate = useNavigate();

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Erreur lors du chargement des articles :", error);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(0); 
  };

  const handleCheckboxChange = (article) => {
    setSelectedArticles((prevSelected) => {
      const isAlreadySelected = prevSelected.find(a => a.numero_serie === article.numero_serie);
      return isAlreadySelected
        ? prevSelected.filter(a => a.numero_serie !== article.numero_serie)
        : [...prevSelected, article];
    });
  };


  const handlePrintSelected = () => {
  if (selectedArticles.length === 0) {
    alert("Veuillez sélectionner au moins un article à imprimer.");
    return;
  }

  const choix = prompt("Veuillez choisir : Annexe, Division ou Service");
  
  if (!choix || !["Annexe","annexe", "Division", "division","Service", "service"].includes(choix)) {
    alert("Choix invalide. Veuillez sélectionner 'Annexe', 'Division' ou 'Service'.");
    return;
  }

  localStorage.setItem("selectedArticles", JSON.stringify(selectedArticles));
  localStorage.setItem("choixImpression", choix); 
  navigate("/imprimer");
};


  const filteredArticles = articles.filter((article) =>
    String(article.numero_serie).toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.categorie_produit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.inv.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.marque_produit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.source_produit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.etat_produit.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.date_entree.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Trier les articles par date (du plus récent au plus ancien)
  const sortedArticles = filteredArticles.sort((a, b) => new Date(b.date_entree) - new Date(a.date_entree));

  // Pagination
  const pageCount = Math.ceil(sortedArticles.length / articlesPerPage);
  const offset = currentPage * articlesPerPage;
  const currentArticles = sortedArticles.slice(offset, offset + articlesPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div className="container mt-4">
      <h2>Gestion des Articles</h2>
      <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
      <Link to={`/addArticle`} className="btn btn-primary mb-3">Ajouter un article</Link>
      <button className="btn btn-success mb-3 ml-2" onClick={handlePrintSelected} disabled={selectedArticles.length === 0}>
        Imprimer les articles sélectionnés
      </button>

      <table className="table table-bordered table-striped mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Sélection</th>
            <th>Catégorie</th>
            <th>Marque</th>
            <th>N° Série</th>
            <th>inv</th>
            <th>Source</th>
            <th>État</th>
            <th>Date Entrée</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentArticles.map((article, index) => (
            <tr key={article.numero_serie || index}>
              <td>
                <input 
                  type="checkbox" 
                  checked={selectedArticles.some(a => a.numero_serie === article.numero_serie)} 
                  onChange={() => handleCheckboxChange(article)} 
                />
              </td>
              <td>{article.categorie_produit}</td>
              <td>{article.marque_produit}</td>
              <td>{article.numero_serie}</td>
              <td>{article.inv}</td>
              <td>{article.source_produit}</td>
              <td>{article.etat_produit}</td>
              <td>{article.date_entree}</td>
              <td>
                <Link to={`/editArticle`} state={{ article }} className="btn btn-warning btn-sm">
                  Modifier
                </Link>
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
    </div>
  );
};

export default ArticleManager;
