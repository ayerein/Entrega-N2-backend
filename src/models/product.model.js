import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    nombre_producto: { 
        type: String,
        required: true,
        index: true
    },
    marca_producto: { 
        type: String,
        required: true
    },
    descripcion_producto: {
        type: String,
    },
    precio_producto: { 
        type: Number,
        required: true,
        min: [0, 'El precio no puede ser negativo']
    },
    img_producto: { 
        type: String,
        required: true
    },
    nombre_categoria: { 
        type: String,
        required: true,
        index: true
    },
    stock_producto: { 
        type: Number,
        required: true,
        min: [0, 'El stock no puede ser negativo'],
        default: 0
    }
})

export default mongoose.model("Product", productSchema)