import { Router } from 'express';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = new CartManager('./src/data/carts.json');

router.post('/', (req, res) => {
    try {
        const newCart = cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:cid', (req, res) => {
    try {
        const cart = cartManager.getCartById(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/:cid/product/:pid', (req, res) => {
    try {
        const updatedCart = cartManager.addProductToCart(req.params.cid, req.params.pid);
        res.json(updatedCart);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;