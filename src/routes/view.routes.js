import { Router } from "express";
import Product from "../models/product.model.js";
import { getProducts } from "../managers/ProductManager.js";

const router = Router()

router.get("/", async (req, res) => {
    const { limit = 10, page = 1, sort, category } = req.query;

    let {products} = await getProducts({limit,page,sort,category})

    const categories = [
    { value: '', text: '' },
    { value: 'frescos', text: 'Frescos' },
    { value: 'almacén', text: 'Almacén' },
    { value: 'bebidas', text: 'Bebidas' },
    { value: 'congelados', text: 'Congelados' }
  ];

    const sortOptions = [
    { value: '', text: '' },
    { value: 'asc', text: 'Precio (Menor a Mayor)' },
    { value: 'desc', text: 'Precio (Mayor a Menor)' }
  ];

    res.render('home', {products, categories, sortOptions})
});

router.get('/products/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id).lean()        
        res.render('product', {product});
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router