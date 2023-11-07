import { inventory } from "../scripts/inventory.js";
import { listProducts } from "./list.js";

// Id para la búsqueda
let currentId = 0;
// Función para añadir productos al inventario, que funciona con el evento del formulario
export const insertProduct = (event) => {
    event.preventDefault()
    // Se recogen los valores de los inputs
    const nombre = document.getElementById('nombre').value
    const categoria = document.getElementById('categoria').value
    const cantidad = parseInt(document.getElementById('cantidad').value)
    const precio = parseFloat(document.getElementById('precio').value)
    // Se crea el elemento del array. se partirá del id 0 y se irá sumando 1 por cada producto añadido
    const newProduct = {

        id: currentId++,
        nombre: nombre,
        categoria: categoria,
        cantidad: cantidad,
        precio: precio,

    };

// se añade el producto al array
    inventory.push(newProduct)
    // se resetea el formulario
    document.getElementById('form').reset();
    // se muestra la tabla después de añadir
    listProducts();

}