import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";
 
export const addProduct = async ({cartId,productId,quantity}) => {
    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const existingItemIndex = cart.items.findIndex(item => 
            item.product.toString() === productId.toString()
        );

        if (existingItemIndex >= 0) {
            cart.items[existingItemIndex].quantity += quantity;
            cart.items[existingItemIndex].addedAt = new Date();
        } else {
            cart.items.push({
            product: productId,
            quantity,
            price: product.precio_producto
            });
        }

        const updatedCart = await cart.save();
        console.log(updatedCart);
    } catch (error) {
        console.log({ error: error.message });
    }
}