const mongoose = require ('mongoose')
let Schema = mongoose.Schema;
let usuarioSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'El id es necesario'],
    },
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    primer_apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    segundo_apellido: {
        type: String,
        required: [true, 'El apellido es necesario']
    },
    edad: {
        type: String,
        required: [true, 'La edad es necesaria']
    },
    curp: {
        type: String,
        required: [true, 'La curp es necesaria'],
        unique: true
    },
    telefono: {
        type: String,
        required: [true, 'El telefono es necesario'],     
    },
    mail: {
        type: String,
        required: [true, 'El correo es necesario'],
        unique: true
    },
    activo: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('Usuario', usuarioSchema)