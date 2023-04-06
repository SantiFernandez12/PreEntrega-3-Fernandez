const tbody = document.querySelector("tbody")
const carrito = [] 

const componentes = [{codigo: 1, producto: 'Mouse Logitech G Series Lightspeed', precio: 16200},
                    {codigo: 2, producto: 'Teclado Redragon K552', precio: 22499},
                    {codigo: 3, producto: 'Auriculares HyperX Cloud 2', precio: 40299},
                    {codigo: 4, producto: 'Monitor Samsung Curvo LCD 23.5', precio: 78450},
                    {codigo: 5, producto: 'Mousepad Logitech G840', precio: 10999 }]

function buscarComponente(codigo) {
    let resultado = componentes.find((componente)=> componente.codigo === parseInt(codigo))
        return resultado
}

function retornoFilaHtml(componente) {
    return `<tr>
                <td>${componente.producto}</td>
                <td>$ ${componente.precio}</td>
                <td><button id="${componente.codigo}">Agregar</button></td>
            </tr>`
}

function cargarComponentes(array) {
    array.forEach(element => {
        tbody.innerHTML += retornoFilaHtml(element)
    })
    activarClickEnBotones()
}
cargarComponentes(componentes)

function activarClickEnBotones() {
    const buttons = document.querySelectorAll("button")
        for (boton of buttons) {
            boton.addEventListener("click", (e)=> {
                agregarCarrito(e.target.id)
            })
        }
}

function agregarCarrito(id) {
    let resultado = componentes.find(componente => componente.codigo === parseInt(id))
        if (resultado !== undefined) {
            carrito.push(resultado)
            console.log("Se agrego el componente", resultado.producto, "al carrito.")
            guardarCarrito(carrito)
        }
}

function guardarCarrito(carrito) {
    if (carrito.length > 0) {
        localStorage.setItem("carritoComponentes", JSON.stringify(carrito))
    }
}

function recuperarCarrito() {
    const carritoRecuperado = JSON.parse(localStorage.getItem("carritoComponentes"))
    if (carritoRecuperado.length > 0) {
        carrito.push(...carritoRecuperado)
    }
    console.table(carritoRecuperado)
}

function finalizarCompra() {
    let totalCarrito = carrito.reduce((acc, prenda)=> acc + prenda.precio, 0)
    alert("El importe del carrito es de: $ " + totalCarrito)
}