const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema({
    _id: {
        type: String,
        required: [true, 'El id es necesario']
    },
    usuario: {
        type: Schema.Types.String,
        ref: 'Usuario',
    },
    departamento: {
        type: Schema.Types.String,
        ref: 'Departamento'
    },
    nombre_del_puesto: {
        type: String,
        required: [true, 'El nombre del puesto es necesario']
    },
    anios_servicio: {
        type: Number,
        required: [true, 'Los anios de servicio son necesarios']
    },
    hora_entrada: {
        type: Number,
        required: [true, 'La hora de entrada es necesaria']
    },
    hora_salida: {
        type: Number,
        required: [true, 'La hora de salida es necesaria']
    },
    activo: {
        type: Boolean,
        default: true
    },
})

module.exports = mongoose.model('Empleado', empleadoSchema)