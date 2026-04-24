/**
 * ProductModel - Define la estructura de un Producto
 */

// BUG (Reliability): La función crea un objeto pero no valida
// que los campos requeridos existan antes de asignarlos.
// Si se llama sin argumentos, todos los campos serán undefined.
export function createProduct(id, nombre, precio, categoria, stock) {
  return {
    id: id,
    nombre: nombre,
    precio: precio,
    categoria: categoria,
    stock: stock,
    activo: true,
  };
}

// CODE SMELL (Maintainability): Magic numbers sin constante nombrada.
// Los valores 5000 y 0 no tienen significado claro para quien lee el código.
export function isPrecioValido(precio) {
  if (precio > 5000) {
    return false;
  }
  if (precio < 0) {
    return false;
  }
  return true;
}

// CODE SMELL (Maintainability): Bloque de código comentado (dead code).
// SonarQube detecta esto como "Sections of code should not be commented out"
//
// export function calcularDescuento(producto, porcentaje) {
//   let descuento = producto.precio * (porcentaje / 100);
//   let precioFinal = producto.precio - descuento;
//   console.log("Precio final con descuento: " + precioFinal);
//   return precioFinal;
// }
//
// export function aplicarImpuesto(producto) {
//   let impuesto = producto.precio * 0.16;
//   let precioConImpuesto = producto.precio + impuesto;
//   producto.precio = precioConImpuesto;
//   return producto;
// }
