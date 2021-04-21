const express = require('express');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();
 
app.get('/usuario', function (req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 10;

    Usuario.find({ estado: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios) =>{
       if(err) {
           return res.status(400).json({
               ok: false,
               msg: 'Ocurrio un error al momento de consultar',
               err 
           });
       } 

       res.json({
           ok: true,
           msg: 'Lista de usuarios obtenida con exito',
           conteo: usuarios.length,
           usuarios
       });
    });
  })
  
  app.post('/usuario', function (req, res) {
    let body = req.body;
    let usr = new Usuario({
        _id: req.body._id,
        nombre: body.nombre,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        edad: req.body.edad,
        curp: req.body.curp,
        telefono: req.body.telefono,
        mail: req.body.mail,
        
        
    });

    usr.save((err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB
        });
    });
  });
  
  app.put('/usuario', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['nombre','primer_apellido','segundo_apellido','email']);

    Usuario.findByIdAndUpdate(id, body, { new: true, 
        runValidators: true, context: 'query' }, 
        (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario actualizado con exito',
            usuario: usrDB
        });
    });
});
  
  app.delete('/usuario', function (req, res) {
      let id =  req.params.id;

      Usuario.findByIdAndUpdate(id, { activo: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if(err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al intentar de eliminar el usuario',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB
        });
      });
  });

module.exports = app;