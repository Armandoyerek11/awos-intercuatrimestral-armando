const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema({
    
    _id: {
        type: String,
        required: [true, 'El id es necesario']
       
    },
    
    id_jefe_de_area: {
        type: String,
        required: [true, 'El id del jefe de area es necesario']
       
    },
    
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
       
    },
    
    numero_empleados: {
        type: Number,
        required: [true, 'El numero de empleados es necesario']
       
    },

    extension_telefonica: {
        type: Number,
        required: [true, 'La extension es necesaria']
       
    },

    activo: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('Departamento', departamentoSchema)