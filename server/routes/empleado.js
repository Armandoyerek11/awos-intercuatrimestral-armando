const express = require('express');
const _ = require('underscore');
const app = express();
const Empleado = require('../models/empleado');

app.get('/empleado', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Empleado.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('departamento')
    .exec((err, empleados) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los empleados',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Empleados listados con exito',
            conteo: empleados.length,
            empleados
        });
    });
});

app.post('/empleado', (req, res) =>{
    let body = req.body;
    let emp = new Empleado({
        _id: req.body._id,
        id_usuario: req.body.id_usuario,
        id_departamento: req.body.id_departamento,
        nombre_del_puesto: req.body.nombre_del_puesto,
        anios_servicio: req.body.anios_servicio,
        hora_entrada: req.body.hora_entrada,
        hora_salida: req.body.hora_salida,
        activo: req.body.activo,
    });

    emp.save((err, empDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un empleado',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Empleado insertado con exito',
            empDB
        });
    });
});

app.put('/empleado', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['usuario','hora_entrada','hora_salida']);

    Empleado.findByIdAndUpdate(id, body, 
        { new:true, 
        runValidators: true, 
        context: 'query' },
        (err, empDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Empleado actualizado con exito',
            empleados: empDB
        });
    });
  });

  app.delete('/empleado', function (req, res) {
    let id = req.params.id;

    Empleado.deleteOne({ id: id }, (err, empleadoBorrado) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al intentar de eliminar el empleado',
               err
           });
       }

       res.json({
           ok: true,
           msg: 'Empleado eliminado con exito',
           empleadoBorrado
       });
    });
});

module.exports = app;