import fs from 'fs';

export default class CartManager {
    constructor(path) {
        this.path = path;
        this.carts = [];
        this.nextId = 1;
        this.loadCarts();
    }

    loadCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
            this.saveCarts();
        }
    }

    saveCarts() {
        fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2));
    }

    createCart() {
        const id = this.generateId();
        const newCart = {
            id,
            products: []
        };
        this.carts.push(newCart);
        this.saveCarts();
        return newCart;
    }

    getCartById(id) {
        const cart = this.carts.find(c => c.id === Number(id));
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        return cart;
    }

    addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        const existingProduct = cart.products.find(p => p.product === productId);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.products.push({
                product: productId,
                quantity: 1
            });
        }

        this.saveCarts();
        return cart;
    }

    generateId() {
        return this.nextId++;
    }
}