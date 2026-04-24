'use client';

/**
 * ProductCard - Tarjeta individual para mostrar un producto
 */

import React from "react";

// DUPLICACION: Este bloque renderCategoryBadge es casi identico
// al que existe en ProductList.jsx — viola DRY y SonarQube lo detecta.
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

function ProductCard({ producto, onEdit, onDelete }) {
  // SECURITY VULNERABILITY: dangerouslySetInnerHTML con contenido
  // no sanitizado proveniente del usuario.
  // SonarQube regla: "Disabling React's built-in escaping is security-sensitive"
  const nombreHTML = { __html: producto.nombre };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.08)",
      }}
    >
      <h3 dangerouslySetInnerHTML={nombreHTML} style={{ marginTop: 0 }} />

      <div style={{ marginBottom: "8px" }}>
        {renderCategoryBadge(producto.categoria)}
      </div>

      <p style={{ margin: "4px 0" }}>
        <strong>Precio:</strong> ${producto.precio}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Stock:</strong> {producto.stock} unidades
      </p>

      <div style={{ marginTop: "12px", display: "flex", gap: "8px" }}>
        <button
          onClick={() => onEdit(producto)}
          style={{
            padding: "6px 14px",
            backgroundColor: "#f0a500",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(producto.id)}
          style={{
            padding: "6px 14px",
            backgroundColor: "#e74c3c",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
