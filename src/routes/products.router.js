import { Router } from 'express';
import {getProducts} from '../managers/ProductManager.js';
import Product from '../models/product.model.js';

const router = Router();

router.get('/', async (req, res) => {
    const { limit = 10, page = 1, sort, category } = req.query;


    let {products,totalProducts} = await getProducts({limit,page,sort,category})
    
    
    
    let totalPages = Math.ceil(totalProducts / limit);

    const buildLink = (pageNum) => {
        const newQuery = { ...req.query, page: pageNum };
        const queryString = new URLSearchParams(newQuery).toString();
        return `${req.protocol}://${req.get('host')}${req.originalUrl.split('?')[0]}?${queryString}`;
    };

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;

    const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage: hasPrevPage ? page - 1 : null,
            nextPage: hasNextPage ? Number(page) + 1 : null,
            page,
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? buildLink(page - 1) : null,
            nextLink: hasNextPage ? buildLink(Number(page) + 1) : null
        };
    
        res.json(response);
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.json(product);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const productUpdated = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
        );
        
        if (!productUpdated) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json(productUpdated);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const productoEliminado = await Product.findByIdAndDelete(id);

        if (!productoEliminado) {
        return res.status(404).json({ error: 'Producto no encontrado' });
        }
        
        res.json({ 
        message: 'Producto eliminado correctamente',
        producto: productoEliminado 
        });
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

export default router;