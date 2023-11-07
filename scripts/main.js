/*
Autor: Iván Lorenzo Ruiz
Link Github: https://github.com/Ivanlr96/Gestor-de-Inventario
*/

import { inventory } from "../scripts/inventory.js";
import { insertProduct } from "./insert.js";
import { listProducts } from "./list.js";
// se importan los elementos necesarios

// Se declara un indice para editar para poder usarlo más tarde
let indexToEdit = null;
// las ventana modal está hecha mediante boostrap, para que funcione es necesario esta línea de código
const modal = new bootstrap.Modal(document.getElementById("ventanaModal"));

/* esta es una función global usando window. en vez de const. Se requiere para poder añadir las funciones directamente a la etiqueta de los botones en el archivo list. 
En este tipo de función, no es posible el uso de export directamente como con las otras funciones, por tanto se dejan aquí para que funcionen correctamente */
window.showEditModal = (index) => {
// Se le pasa el index del array como parámetro y se igual al index que creamos para editar //
    indexToEdit = index
    document.getElementById('nombreMod').value = inventory[index].nombre
    document.getElementById('categoriaMod').value = inventory[index].categoria
    document.getElementById('cantidadMod').value = inventory[index].cantidad
    document.getElementById('precioMod').value = inventory[index].precio
    // Usamos el método show de las ventanas modales de Bootstrap para mostrar la ventana modal donde se podrá editar el producto//
    modal.show(); 
} 
// funcion para editar el producto
const editProduct = (e) => {
    e.preventDefault()
    inventory[indexToEdit].nombre = document.getElementById('nombreMod').value
    inventory[indexToEdit].categoria = document.getElementById('categoriaMod').value
    inventory[indexToEdit].cantidad = parseInt(document.getElementById('cantidadMod').value)
    inventory[indexToEdit].precio = parseFloat(document.getElementById('precioMod').value)
    // Mostramos la tabla, una vez editado el producto
    listProducts();
    // Utilizamos el método hide, también de las ventanas modales de Bootstrap para ocultarla cuando terminamos la edición
    modal.hide();
}


// Evento que nos permite usar el buscador. Nota: la búsqueda es conveniente realizarla en minúsculas 
document.addEventListener("keyup", e => {
    if (e.target.matches('#buscador')) {
        document.querySelectorAll('.item').forEach(item => {
            item.textContent.toLocaleLowerCase().includes(e.target.value)
        // Operador ternario que añadirá o quitará la clase filtro que contiene un display none, para que se oculten aquellos elementos que no coincidan con la búsqueda 
                ? item.classList.remove('filtro')
                : item.classList.add('filtro');

        })
        /* en caso de que todos los elementos tengan la clase filtro, significará que no ha encontrado ningún elemento que coincida con la búsqueda
           Por tanto, saltará la alerta con el mensaje , pero también se mostrará la tabla para que no quede vacía al no haber resultados de la búsqueda */ 
        if (document.querySelectorAll('.filtro').length === inventory.length) {
            alert("No hay coincidencias")
            listProducts()
        }
    }
})


// Función global, que al igual que la editar tiene que permaneceer en el main. recibe el index correspondiente como parámetro 
window.deleteProduct = (index) => {

    if (confirm(`¿Seguro que desea borrar ${inventory[index].nombre}?`)) {
        // Borra sólo el elemento que coincide con el elemento del array del que pulsamos el botón borrar
        inventory.splice(index, 1)
        // Una vez eliminado el producto, muestra la tabla de nuevo
        listProducts();
    }
}

// la tabla se mostrará (creandose a partir de los elementos existentes del array) siempre al cargarse la página con este evento
document.addEventListener('DOMContentLoaded', listProducts())
// Esto captura el submit que del formulario, que se producirá al pulsar el botón añadir y ejecutará la función para añadir el producto
document.getElementById('form').addEventListener('submit', insertProduct);
// Funciona igual que la de arriba, pero en este caso lo hará con el formulario correspondiente a la ventana modal y capturará el submit del botón de esta ventana. Ejecuta la función de editar
document.getElementById('formModal').addEventListener('submit', editProduct);
