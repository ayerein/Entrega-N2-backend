import { Router } from 'express';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = new ProductManager('./src/data/products.json');

router.get('/', (req, res) => {
    try {
        const products = productManager.getProducts();
        res.render('realTimeProducts', {products})
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:pid', (req, res) => {
    try {
        const product = productManager.getProductById(req.params.pid);
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/', (req, res) => {
    try {
        const newProduct = productManager.addProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:pid', (req, res) => {
    try {
        const updatedProduct = productManager.updateProduct(req.params.pid, req.body);
        res.json(updatedProduct);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:pid', (req, res) => {
    try {
        productManager.deleteProduct(req.params.pid);
        res.status(204).end();
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;