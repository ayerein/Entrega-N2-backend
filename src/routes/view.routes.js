import { Router } from "express";
import ProductManager from '../managers/ProductManager.js';

const router = Router()
const productManager = new ProductManager('./src/data/products.json');
const products = productManager.getProducts();


router.get("/", (req, res) => {
    res.render('home', {products})
});

router.get("/realTimeProducts", (req, res) => {
    res.render('realTimeProducts', {products})
});


export default router