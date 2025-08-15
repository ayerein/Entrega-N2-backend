import mongoose from "mongoose"

const mongo_url = "mongodb+srv://ayerein:WvJTjUA4ufw9QXSr@cluster0.iarwod1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

export const dbConnection = async () => {
    try {
        await mongoose.connect(mongo_url)
        console.log("Base de datos conectada")
    } catch (error) {
        console.log("Error al conectar la base de datos", error)        
    }
}