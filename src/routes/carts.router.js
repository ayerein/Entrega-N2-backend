import { Router } from 'express';
import { addProduct } from '../managers/CartManager.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const router = Router();

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const cart = await Cart.findById(id)
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
})

router.post('/', async (req, res) => {
    try {
        const cart = new Cart({
                sessionToken: req.sessionID,
                items: []
            });
        const savedCart = await cart.save();
        res.status(201).json({
            message: 'Carrito creado exitosamente',
            cart,
            cartId: savedCart._id,
            sessionToken
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.sessionId });
    
        if (!cart) {
            cart = new Cart({ 
                sessionId: req.sessionId,
                items: []
            });
            await cart.save();
        }
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid/:pq', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const quantity = parseInt(req.params.pq)
    
    addProduct({cartId,productId,quantity})
});

router.delete('/:cid', async (req, res) => {
    const cartId = req.params.cid

    try {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { 
                $set: { 
                    items: [],
                    total: 0,
                    updatedAt: new Date() 
                } 
            },
            { new: true }
        );

        res.status(200).json({
            message: "Todos los productos fueron eliminados del carrito",
            cart: updatedCart
        });
    } catch (error) {
        console.error('Error al vaciar carrito:', error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            details: error.message 
        });
    }
})

router.delete('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid

    try {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error("Producto no encontrado");
        }

        const cart = await Cart.findById(cartId);
        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId },
            { 
                $pull: { 
                    items: { product: productId } 
                },
                $set: {
                    updatedAt: new Date()
                }
            },
            { new: true }
        ).populate('items.product');

        res.status(200).json({
            message: "Producto eliminado del carrito",
            cart: updatedCart
        });

    } catch (error) {
        console.error('Error al eliminar producto del carrito:', error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            details: error.message 
        });
    }
})

router.put('/:cid/products/:pid', async (req, res) => {
    const cartId = req.params.cid
    const productId = req.params.pid
    const { quantity } = req.body;

    try {
        const cart = await Cart.findById(cartId);

        if (!cart) {
            throw new Error("Carrito no encontrado");
        }

        const productIndex = cart.items.findIndex(item => 
            item.product.toString() === productId
        );

        if (productIndex === -1) {
            return res.status(404).json({ error: "El producto no existe en este carrito" });
        }

        const updatedCart = await Cart.findOneAndUpdate(
            { 
                _id: cartId,
                "items.product": productId
            },
            { 
                $set: { 
                    "items.$.quantity": quantity,
                    updatedAt: new Date()
                } 
            },
            { new: true }
        ).populate('items.product');

        res.status(200).json({
            message: "Cantidad de producto actualizada",
            cart: updatedCart
        });
    } catch (error) {
        console.error('Error al actualizar cantidad en carrito:', error);
        res.status(500).json({ 
            error: "Error interno del servidor",
            details: error.message 
        });
    }
})

export default router;