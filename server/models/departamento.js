const mongoose = require('mongoose');
let Schema = mongoose.Schema;
//let departamentoSchema = new Schema({
let departamentoSchema = new Schema({
    id_jefede_area:{
        type:Schema.Types.ObjectId,
        ref:"empleado",
        requiere:true
    },
    nombre:{
        type: String,
        requiere:[true,'El nombre es necesario']
    }, 
    numero_empleados:{
        type: Number,
        requiere: true
    },
    extencion_telefono:{
        type: Number,
        unique: true
    },
    activo:{
        type: Boolean,
        default:true
    }
   
});
 

module.exports = mongoose.model('Departamento', departamentoSchema);