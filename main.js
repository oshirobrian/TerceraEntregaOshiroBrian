const tbody = document.querySelector("tbody")

//Guardar y Recuperar el Carrito con LocalStorage + JSON
const carrito = []
const guardarCarrito = () => (carrito.length > 0) && localStorage.setItem("CarritoPrendas", JSON.stringify(carrito))
const recuperarCarrito = () => JSON.parse(localStorage.getItem("CarritoPrendas")) || []
carrito.push(...recuperarCarrito())

//Armar la tabla HTML dinámica
//{imagen: '🩱', codigo: 9, tipo: 'Malla enteriza Lafelí', precio: 3122}
const armarTablaHTML = (prenda) => {
    return `<tr>
                <td><h3>${prenda.imagen}</h3></td>
                <td>${prenda.tipo}</td>
                <td>$ ${prenda.precio}</td>
                <td>
                    <button id="${prenda.codigo}" class="button button-outline" title="Agregar al carrito">🛒</button>
                </td>
            </tr>`
}

//Cargar los productos en la tabla HTML

const cargarProductos = (array) => {
    let tablaHTML = ""
    if (array.length > 0) {
        array.forEach((prenda) => tablaHTML += armarTablaHTML(prenda))
    } else {
        tablaHTML = "<h2 class='error-prendas'>Error al cargar productos.</h2>"
    }
    tbody.innerHTML = tablaHTML
}

//Activar el evento CLICK por cada botón dinámico generado
const activarClickBotonesAdd = () => {
    const botonesAdd = document.querySelectorAll("button.button.button-outline")
    botonesAdd.forEach(btn => {
        btn.addEventListener("click", (e) => {
            let resultado = buscarPrenda(e.target.id)
            carrito.push(resultado)
            guardarCarrito()
        })
    })
}

cargarProductos(prendas)
activarClickBotonesAdd()

const buscarPrenda = (codigo) => prendas.find(prenda => prenda.codigo === parseInt(codigo))

function comprar() {
    let codigo = prompt(mensajeInicial)
    if (!parseInt(codigo)) {
        alert("⛔️ Error en el código ingresado.")
        return
    }
    let prendaElegida = buscarPrenda(codigo)
    carrito.push(prendaElegida)
    let respuesta = confirm("¿Deseas llevar otra prenda?")
    if (respuesta) {
        comprar()
    } else {
        finalizarCompra()
    }
}

function verCarrito() {
    if (carrito.length > 0) {
        const shopping = new Compra(carrito)
        alert(`El costo total es de $ ${shopping.obtenerSubtotal()}`)
    } else {
        alert("El carrito está vacío!")
    }
}

const btnVerCarrito = document.querySelector("button#verCarrito")
btnVerCarrito.addEventListener("click", verCarrito)