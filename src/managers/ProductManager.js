/* import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.nextId = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const maxId = Math.max(...this.products.map(p => p.id));
                this.nextId = maxId + 1;
            }
        } catch (error) {
            this.products = [];
            this.saveProducts();
        }
    }

    saveProducts() {
        fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === Number(id));
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return product;
    }

    addProduct(productData) {
        const { title, description, price, status = true, stock, category, thumbnail } = productData;

        if (!title || !description || !price || !stock || !category) {
            throw new Error('Todos los campos son obligatorios excepto thumbnail');
        }

        const id = this.generateId();
        const newProduct = {
            id,
            title,
            description,
            price,
            status,
            stock,
            category,
            thumbnail
        };

        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        if (updatedFields.id) {
            delete updatedFields.id;
        }

        this.products[productIndex] = {
            ...this.products[productIndex],
            ...updatedFields
        };

        this.saveProducts();
        return this.products[productIndex];
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === Number(id));
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
    }

    generateId() {
        return this.nextId++;
    }
} */

import Product from "../models/product.model.js";


export const getProducts = async ({limit, page, sort, category}) => {
    const skip = (page - 1) * limit;
    
    let sortOption = {};
    if (sort === 'asc') sortOption = { precio_producto: 1 };
    if (sort === 'desc') sortOption = { precio_producto: -1 };

    let filter
        
    if (category){
        let categoryOption = category.charAt(0).toUpperCase() + category.slice(1)
        filter = { nombre_categoria: `${categoryOption}` }
    }

    let totalProducts = await Product.countDocuments(filter)

    const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOption)
    .lean()
    
    return({products,totalProducts})
        
}

