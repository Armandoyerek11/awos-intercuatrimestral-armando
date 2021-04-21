const mongoose = require('mongoose');
let Schema = mongoose.Schema;

//let empleadoSchema = new Schema({​​
let empleadoSchema = new Schema({
    id_usuario:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Usuario',
        require: true
    },
    id_departamento:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Departamento',
        require: true
    },
    nombre_del_puesto:{
        type:String,
        require:[true,'El nombre del puesto es necesario'],
        unique: true
    },
    anios_servicios:{
        type:Number,
        requiere:[true, 'Este campo es necesario']
    },
    hora_entrada:{
        type: Number,
        requiere: [true,'La hora es necesaria']
    },
    hora_salida:{
        type: Number,
        requiere: [true, 'La hora es necesaria']
    },
    activo:{
        type: Number,
        default: true
    }
    
});

module.exports = mongoose.model('Empleado', empleadoSchema);