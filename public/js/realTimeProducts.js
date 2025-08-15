/* const socket = io() */

let formProduct = document.getElementById("form-products")
let title = document.getElementById("title")
let brand = document.getElementById("brand")
let description = document.getElementById("description")
let price = document.getElementById("price")
let thumbnail = document.getElementById("thumbnail")
let category = document.getElementById("category")
let stock = document.getElementById("stock")
let tabla = document.getElementById("tabla")


/* socket.on('sendProducts', (data) => {
    tabla.innerHTML = ''
    data.forEach(el => {
        tabla.innerHTML +=  `<tr>
                                <th>${el.id}</th>
                                <th>${el.title}</th>
                                <th>${el.brand}</th>
                                <th>${el.description}</th>
                                <th>${el.price}</th>
                                <th>${el.category}</th>
                                <th>${el.stock}</th>
                                <th><button class="btn-delete-product" onclick="deleteProduct(${el.id})">Eliminar</button></th>
                            </tr>`
    });
}) */
formProduct.addEventListener("submit", async(e) => {
    e.preventDefault()

    let formData = {
        nombre_producto: title.value.trim(),
        marca_producto: brand.value.trim(),
        descripcion_producto: description.value.trim(),
        precio_producto: parseFloat(price.value),
        img_producto: thumbnail.value.trim(),
        nombre_categoria: category.value.trim(),
        stock_producto: parseInt(stock.value),
    }

    if (isNaN(formData.precio_producto) || formData.precio_producto <= 0) {
        alert('El precio debe ser un número mayor a 0');
        return;
    }

    if (isNaN(formData.stock_producto) || formData.stock_producto < 0) {
        alert('El stock debe ser un número positivo');
        return;
    }

    try {
        const response = await fetch('/realtimeproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error del servidor');
        }
        const data = await response.json();
        console.log('Producto creado:', data);
        formProduct.reset();
    } catch (err) {
        console.error('Error:', err);
        alert('Error al enviar el formulario');
    }
})

/* function deleteProduct(id){
    socket.emit("deleteProduct", id)
}
 */