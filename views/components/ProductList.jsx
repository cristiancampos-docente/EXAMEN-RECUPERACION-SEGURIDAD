'use client';

/**
 * ProductList - Lista todos los productos
 */

import React from "react";
import ProductCard from "./ProductCard";

// DUPLICACION: Este bloque renderCategoryBadge es casi identico
// al que existe en ProductCard.jsx — SonarQube lo detecta como duplicacion.
function renderCategoryBadge(categoria) {
  const colores = {
    Electronica: "#4a90e2",
    Perifericos: "#7ed321",
    Accesorios: "#f5a623",
    Muebles: "#9b59b6",
  };
  const color = colores[categoria] || "#aaaaaa";
  return (
    <span
      style={{
        backgroundColor: color,
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "12px",
        fontSize: "12px",
        fontWeight: "bold",
      }}
    >
      {categoria}
    </span>
  );
}

function ProductList({ productos, onEdit, onDelete, loading }) {
  if (loading) {
    return <p style={{ textAlign: "center", color: "#888" }}>Cargando productos...</p>;
  }

  if (productos.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "#999" }}>
        <p>No hay productos registrados.</p>
        <p>Agrega el primero!</p>
      </div>
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <h2 style={{ margin: 0 }}>Productos ({productos.length})</h2>
        {/* DUPLICACION: mismo badge renderizado aqui y en ProductCard */}
        <div style={{ display: "flex", gap: "8px" }}>
          {["Electronica", "Perifericos", "Accesorios"].map((cat) => (
            <span key={cat}>{renderCategoryBadge(cat)}</span>
          ))}
        </div>
      </div>

      <div>
        {productos.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
