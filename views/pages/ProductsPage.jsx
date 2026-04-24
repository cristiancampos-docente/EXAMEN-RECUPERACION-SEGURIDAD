'use client';

/**
 * ProductsPage - Pagina principal del CRUD de Productos
 */

import React, { useState, useEffect } from "react";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";
import { ProductController } from "../../controllers/ProductController";

function ProductsPage() {
  const [productos, setProductos] = useState([]);
  const [productoEditar, setProductoEditar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    const data = await ProductController.listar();
    setProductos(data);
    setLoading(false);
  };

  const handleSubmit = async (datos) => {
    if (productoEditar) {
      const resultado = await ProductController.actualizar(productoEditar.id, datos);
      if (resultado.success) {
        setMensaje("Producto actualizado correctamente.");
        setProductoEditar(null);
        cargarProductos();
      } else {
        setMensaje("Error: " + resultado.mensaje);
      }
    } else {
      const resultado = await ProductController.crear(datos);
      if (resultado.success) {
        setMensaje("Producto creado correctamente.");
        cargarProductos();
      } else {
        setMensaje("Error: " + resultado.mensaje);
      }
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleEdit = (producto) => {
    setProductoEditar(producto);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Seguro que deseas eliminar este producto?")) return;
    const resultado = await ProductController.eliminar(id);
    if (resultado.success) {
      setMensaje("Producto eliminado.");
      cargarProductos();
    } else {
      setMensaje("Error: " + resultado.mensaje);
    }
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleCancel = () => {
    setProductoEditar(null);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px 16px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          borderBottom: "2px solid #3498db",
          paddingBottom: "16px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, color: "#2c3e50" }}>Gestion de Productos</h1>
        <p style={{ margin: "4px 0 0", color: "#7f8c8d", fontSize: "14px" }}>
          Sistema CRUD — Simulacion de backend REST
        </p>
      </header>

      {mensaje && (
        <div
          style={{
            backgroundColor: mensaje.startsWith("Error") ? "#fdecea" : "#eafaf1",
            color: mensaje.startsWith("Error") ? "#c0392b" : "#1e8449",
            padding: "12px 16px",
            borderRadius: "4px",
            marginBottom: "20px",
            fontSize: "14px",
          }}
        >
          {mensaje}
        </div>
      )}

      <ProductForm
        productoEditar={productoEditar}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />

      <ProductList
        productos={productos}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />
    </div>
  );
}

export default ProductsPage;
