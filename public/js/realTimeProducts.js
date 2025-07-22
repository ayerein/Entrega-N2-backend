const socket = io()

let formProduct = document.getElementById("form-products")
let title = document.getElementById("title")
let description = document.getElementById("description")
let price = document.getElementById("price")
let stock = document.getElementById("stock")
let category = document.getElementById("category")
let thumbnail = document.getElementById("thumbnail")
let tabla = document.getElementById("tabla")


socket.on('sendProducts', (data) => {
    tabla.innerHTML = ''
    data.forEach(el => {
        tabla.innerHTML +=  `<tr>
                                <th>${el.id}</th>
                                <th>${el.title}</th>
                                <th>${el.description}</th>
                                <th>${el.price}</th>
                                <th>${el.stock}</th>
                                <th>${el.category}</th>
                                <th><button class="btn-delete-product" onclick="deleteProduct(${el.id})">Eliminar</button></th>
                            </tr>`
    });
})

formProduct.addEventListener("submit", e => {
    e.preventDefault()
    let prod = {
        title: title.value,
        description: description.value,
        price: price.value,
        stock: stock.value,
        category: category.value,
        thumbnail: thumbnail.value,
    }
    socket.emit("newProduct", prod)
    formProduct.reset()
})

function deleteProduct(id){
    socket.emit("deleteProduct", id)
}
