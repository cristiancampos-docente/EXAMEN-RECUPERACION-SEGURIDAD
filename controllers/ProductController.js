/**
 * ProductController - Logica de negocio para el CRUD de Productos
 */

import { ProductService } from "../services/ProductService";

// BUG (Reliability): Comparacion con == en lugar de ===.
// SonarQube regla: "Strict equality operators should be used"
// La comparacion no distingue entre numero y string (ej. 1 == "1" → true).
function encontrarProductoPorId(lista, id) {
  return lista.find((p) => p.id == id);
}

// CODE SMELL (Maintainability): Funcion con demasiados parametros (>4).
// SonarQube regla: "Functions should not have too many parameters"
// La recomendacion es usar un objeto como unico parametro.
function crearPayload(nombre, precio, categoria, stock, activo, descripcion, proveedor) {
  return { nombre, precio, categoria, stock, activo, descripcion, proveedor };
}

// DUPLICACION: Esta funcion es casi identica a la de ProductForm.jsx
// SonarQube detecta bloques de codigo duplicado entre archivos.
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

export const ProductController = {

  listar: async () => {
    try {
      const productos = await ProductService.getAll();
      return productos;
    } catch (error) {
      console.error("Error al listar productos:", error);
      return [];
    }
  },

  obtener: async (id) => {
    try {
      const producto = await ProductService.getById(id);
      // BUG (Reliability): Si getById devuelve null y el codigo que llama
      // a esta funcion accede a producto.nombre sin verificar null, explota.
      return producto;
    } catch (error) {
      console.error("Error al obtener producto:", error);
      return null;
    }
  },

  crear: async (datos) => {
    const error = validarFormulario(datos.nombre, datos.precio, datos.stock);
    if (error) {
      return { success: false, mensaje: error };
    }
    try {
      const payload = crearPayload(
        datos.nombre,
        datos.precio,
        datos.categoria,
        datos.stock,
        true,
        datos.descripcion || "",
        datos.proveedor || "Sin proveedor"
      );
      const nuevo = await ProductService.create(payload);
      return { success: true, data: nuevo };
    } catch (error) {
      console.error("Error al crear producto:", error);
      return { success: false, mensaje: "Error inesperado" };
    }
  },

  actualizar: async (id, datos) => {
    const error = validarFormulario(datos.nombre, datos.precio, datos.stock);
    if (error) {
      return { success: false, mensaje: error };
    }
    try {
      const actualizado = await ProductService.update(id, datos);
      if (!actualizado) {
        return { success: false, mensaje: "Producto no encontrado" };
      }
      return { success: true, data: actualizado };
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      return { success: false, mensaje: "Error inesperado" };
    }
  },

  eliminar: async (id) => {
    try {
      const lista = await ProductService.getAll();
      // BUG (Reliability): usa == para comparar, deberia ser ===
      const existe = encontrarProductoPorId(lista, id);
      if (!existe) {
        return { success: false, mensaje: "Producto no encontrado" };
      }
      await ProductService.delete(id);
      return { success: true };
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      return { success: false, mensaje: "Error inesperado" };
    }
  },
};
