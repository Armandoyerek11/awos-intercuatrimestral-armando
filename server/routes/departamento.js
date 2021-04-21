const express = require('express');
const _ = require('underscore');
const app = express();
const Departamento = require('../models/departamento');

app.get('/departamento', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Departamento.find({})
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario')
    .exec((err, departamentos) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al listar los departamentos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Departamentos listados con exito',
            conteo: departamentos.length,
            departamentos
        });
    });
});

app.post('/departamento', (req, res) =>{
    let body = req.body;
    let dep = new Departamento({
        _id: body._id,
        id_jefe_de_area: req.body.id_jefe_de_area,
        nombre: req.body.nombre,
        numero_empleados: req.body.numero_empleados,
        extension_telefonica: req.body.extension_telefonica,
        activo: req.body.activo,
    });

    dep.save((err, depDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un departamento',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Departamento insertado con exito',
            depDB
        });
    });
});

app.put('/departamento', function (req, res) {
    let id = req.params.id
    let body = _.pick(req.body,['nombre','numero_empleados','extension_telefonica']);

    Departamento.findByIdAndUpdate(id, body, 
        { new:true, runValidators: true, 
        context: 'query' }, 
        (err, depDB) =>{
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al actualizar',
                err
            });
        }

        res.json({
            ok:true,
            msg: 'Departamneto actualizado con exito',
            departamentos: depDB
        });
    });
  });

  app.delete('/departamento', function (req, res) {
    let id = req.params.id;

    Departamento.deleteOne({ _id: id }, 
        (err, DepartamentoBorrado) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al intentar de eliminar el departamento',
               err
           });
       }

       res.json({
           ok: true,
           msg: 'Departamento eliminado con exito',
           DepartamentoBorrado
       });
    });
});

    

module.exports = app;