import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true,
    trim: true,
    minlength: [3, 'El nombre debe tener al menos 3 caracteres']
  },
    email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
  },
    cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  }
})

export default mongoose.model("User", userSchema)