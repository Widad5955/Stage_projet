import React from "react";

const SearchBarMouv = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="mb-3">
      <input
        type="text"
        placeholder="Recherche ..."
        className="form-control"
        value={searchQuery}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBarMouv;
