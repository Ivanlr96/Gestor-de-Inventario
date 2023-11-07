import { inventory } from "../scripts/inventory.js";
 
const table = document.getElementById("tabla")
// funcion para calcular el total del inventario
const calcularTotalIventario = () => {
    let precioTotal = 0;
    // bucle que recorre el array para ir sumando el resultado de la operación de cada elemento del array
    inventory.forEach((item) => {
        precioTotal += item.cantidad * item.precio;

    })
    document.getElementById("total").textContent= precioTotal;

}
// función que va creando la tabla y la muestra
export const listProducts = () => {
    // se limpia la tabla
    table.innerHTML = ''
    // se localizan los elementos del array
    inventory.map((item, index) => {
        // se crean las partes de la tabla
        const fila = document.createElement('tr')
    fila.classList.add('item')

    // los botones tienen las funciones en las propias etiquetas para su correcto funcionamiento, reciben index como parámetro para poder borrar el elemento correcto
        const celdas =
            ` 
    <td>${item.nombre}</td>
    <td>${item.categoria}</td>
    <td>${item.cantidad}</td>
    <td>${item.precio}€</td>
    <td>
    <div>
    <button class="btn btn-secondary" id="btnE" onclick="showEditModal(${index})">Editar</button>
    <button class="btn btn-danger" onclick="deleteProduct(${index})">Borrar</button>
    </div>`
        fila.innerHTML = celdas
        table.append(fila)
    })
    // se llama a la función para calcular el total del inventario
   calcularTotalIventario();
}