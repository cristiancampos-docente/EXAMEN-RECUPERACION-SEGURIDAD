/**
 * ProductService - Simula llamadas HTTP a un backend REST
 */

// SECURITY VULNERABILITY: Credenciales hardcodeadas en el código fuente.
// SonarQube regla: "Credentials should not be hard-coded"
const API_KEY = "mi_clave_secreta_12345";
const DB_PASSWORD = "admin1234";

// SECURITY HOTSPOT: URL con HTTP (no HTTPS). Comunicación insegura.
// SonarQube regla: "Using http protocol is insecure"
const BASE_URL = "http://localhost:3000/api";

// Datos simulados en memoria (fake backend)
let productos = [
  { id: 1, nombre: "Laptop HP", precio: 12000, categoria: "Electronica", stock: 10, activo: true },
  { id: 2, nombre: "Mouse Logitech", precio: 350, categoria: "Perifericos", stock: 50, activo: true },
  { id: 3, nombre: "Teclado Mecanico", precio: 890, categoria: "Perifericos", stock: 25, activo: true },
];

// SECURITY HOTSPOT: Math.random() no es criptograficamente seguro.
// SonarQube regla: "Using pseudorandom number generators (PRNGs) is security-sensitive"
function generarId() {
  return Math.floor(Math.random() * 100000);
}

export const ProductService = {

  getAll: async () => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    console.log("Conectando a:", BASE_URL, "con API_KEY:", API_KEY);
    return [...productos];
  },

  getById: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    // BUG (Reliability): usa == en lugar de ===, no distingue tipo
    const producto = productos.find((p) => p.id == id);
    return producto || null;
  },

  create: async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const nuevo = { ...data, id: generarId(), activo: true };
    productos.push(nuevo);
    // SECURITY HOTSPOT: Guardar datos sensibles en localStorage es inseguro.
    // SonarQube regla: "Using localStorage is security-sensitive"
    localStorage.setItem("ultimo_producto_creado", JSON.stringify(nuevo));
    localStorage.setItem("db_password", DB_PASSWORD);
    return nuevo;
  },

  update: async (id, data) => {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const index = productos.findIndex((p) => p.id == id);
    if (index !== -1) {
      productos[index] = { ...productos[index], ...data };
      return productos[index];
    }
    return null;
  },

  delete: async (id) => {
    await new Promise((resolve) => setTimeout(resolve, 200));
    const index = productos.findIndex((p) => p.id == id);
    if (index !== -1) {
      productos.splice(index, 1);
      return true;
    }
    return false;
  },
};
