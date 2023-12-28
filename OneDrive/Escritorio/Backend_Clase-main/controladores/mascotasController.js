import {mascotas} from "../modelos/mascotasModelo.js";

//Crear un recurso 
const crear = (req,res)=>{
    if(!req.body.nombre){
        res.status(400).json({
            mensaje: "El nombre no puede estar vacio."
        }) ;
        return;
    }
    const dataset={
        nombre: req.body.nombre,
        edad: req.body.edad
    };

    //Usar Sequelize para crear el recurso
    mascotas.create(dataset).then((resultado)=>{
        res.status(200).json({
            tipo: "success",
            mensaje: "Registro creado correctamente"
        })
    }).catch((err)=>{
        res.status(500).json({
            tipo: "error",
            mensaje: `Error al crear el registro ::: ${err}`
        })

    })


};


//Buscar recurso por ID
const buscarId = (req,res)=>{
    const id = req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }

    mascotas.findByPk(id).then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `Registro no encontrado ::: ${err}`
        });
    });

}


//Buscar recurso todos
const buscar = (req, res)=>{
    
    mascotas.findAll().then((resultado)=>{
        res.status(200).json(resultado);    
    }).catch((err)=>{
        res.status(500).json({
            mensaje: `No se encontraron Registros ::: ${err}`
        });
    });

};

//Actualizar un recurso

const actualizar = (req, res) => {
    const id = req.params.id;

    // Verificar si el registro existe antes de intentar actualizar
    mascotas.findByPk(id)
        .then((registroExistente) => {
            if (!registroExistente) {
                return res.status(404).json({
                    mensaje: "Registro no encontrado"
                });
            }

            // El registro existe, ahora procedemos con la actualización
            if (!req.body.nombre && !req.body.edad) {
                return res.status(400).json({
                    mensaje: "No se encontraron datos para actualizar"
                });
            }

            const nombre = req.body.nombre || registroExistente.nombre;
            const edad = req.body.edad || registroExistente.edad;

            mascotas.update({ nombre, edad }, { where: { id } })
                .then(() => {
                    res.status(200).json({
                        tipo: "success",
                        mensaje: "Registro actualizado correctamente"
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        tipo: "error",
                        mensaje: `Error al actualizar registro ::: ${err}`
                    });
                });
        })
        .catch((err) => {
            res.status(500).json({
                mensaje: `Error al verificar la existencia del registro ::: ${err}`
            });
        });
};



const eliminar=(req,res)=>{
    const id= req.params.id;
    if(id == null){
        res.status(203).json({
            mensaje: `El id no puede estar vacio`
        });
        return;
    }
    mascotas.destroy({where:{id}})
    .then((resultado)=>{
        res.status(200).json({
            tipo: "success",
            mensaje: `Registro Eliminado`
        });
    })
    .catch((err)=>{
        res.status(500).json({
            tipo: "error",
            mensaje: `Error al eliminar Registro ::: ${err}`
        });
    })
    

};

export {crear,buscarId,buscar,actualizar,eliminar}  