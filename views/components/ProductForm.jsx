'use client';

/**
 * ProductForm - Formulario para crear o editar un Producto
 */

import React, { useState, useEffect } from "react";

const ESTADO_INICIAL = {
  nombre: "",
  precio: "",
  categoria: "Electronica",
  stock: "",
};

// DUPLICACION: Esta funcion es casi identica a la de ProductController.js
// SonarQube detecta el bloque duplicado entre archivos distintos.
function validarFormulario(nombre, precio, stock) {
  if (!nombre || nombre.trim() === "") {
    return "El nombre es obligatorio";
  }
  if (!precio || isNaN(precio) || precio <= 0) {
    return "El precio debe ser un numero mayor a 0";
  }
  if (stock === undefined || stock === null || stock < 0) {
    return "El stock no puede ser negativo";
  }
  return null;
}

function ProductForm({ productoEditar, onSubmit, onCancel }) {
  const [form, setForm] = useState(ESTADO_INICIAL);
  const [error, setError] = useState("");

  // BUG (Reliability): Dependencia faltante en useEffect.
  // SonarQube / react-hooks/exhaustive-deps detecta que productoEditar
  // se usa dentro del efecto pero no esta en el array de dependencias.
  // Esto causa que el formulario NO se actualice al cambiar el producto a editar.
  useEffect(() => {
    if (productoEditar) {
      setForm({
        nombre: productoEditar.nombre,
        precio: productoEditar.precio,
        categoria: productoEditar.categoria,
        stock: productoEditar.stock,
      });
    } else {
      setForm(ESTADO_INICIAL);
    }
  }, []); // <-- BUG: deberia ser [productoEditar]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errorMsg = validarFormulario(form.nombre, form.precio, form.stock);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }
    setError("");
    onSubmit({
      nombre: form.nombre,
      precio: parseFloat(form.precio),
      categoria: form.categoria,
      stock: parseInt(form.stock, 10),
    });
    setForm(ESTADO_INICIAL);
  };

  const inputStyle = {
    width: "100%",
    padding: "8px 10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "14px",
    boxSizing: "border-box",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "4px",
    fontWeight: "600",
    fontSize: "14px",
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        backgroundColor: "#f9f9f9",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <h2 style={{ marginTop: 0, marginBottom: "20px" }}>
        {productoEditar ? "Editar Producto" : "Nuevo Producto"}
      </h2>

      {error && (
        <div
          style={{
            backgroundColor: "#fdecea",
            color: "#c0392b",
            padding: "10px 14px",
            borderRadius: "4px",
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: "14px" }}>
        <label style={labelStyle}>Nombre del producto</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej. Laptop HP Pavilion"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "14px" }}>
        <label style={labelStyle}>Precio ($)</label>
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Ej. 12000"
          style={inputStyle}
        />
      </div>

      <div style={{ marginBottom: "14px" }}>
        <label style={labelStyle}>Categoria</label>
        <select
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="Electronica">Electronica</option>
          <option value="Perifericos">Perifericos</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Muebles">Muebles</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label style={labelStyle}>Stock (unidades)</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Ej. 25"
          style={inputStyle}
        />
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          type="submit"
          style={{
            padding: "8px 20px",
            backgroundColor: "#27ae60",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          {productoEditar ? "Actualizar" : "Crear Producto"}
        </button>
        {productoEditar && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: "8px 20px",
              backgroundColor: "#95a5a6",
              color: "#fff",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default ProductForm;
