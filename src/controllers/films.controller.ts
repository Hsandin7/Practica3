// createTebeos -> Falta comprobacion de tipos, status 400

import type { Request, Response } from "express";
import type { ErrorAPI, TebeoT } from "../models/film.model.js";
import { ObjectId, type Collection } from "mongodb";


let tebeosCollection: Collection<TebeoT>;

export const configCollection = (coleccion: Collection<TebeoT>) => {
    tebeosCollection = coleccion
}


const validacionTipos = (req: Request, res: Response): boolean => {
    const error: ErrorAPI = {error: "No has entregado todos los parámetros correctamente"}
    
    const strings = [req.body.titulo, req.body.autor, req.body.editorial]
    
    strings.forEach(elemento => {
        if (typeof elemento !== "string" || elemento === ""){
            res.status(400).json(error)
            return false;
        }
    });

    if (Number.isInteger(req.body.numero) || req.body.numero === "") {
        res.status(400).json(error)
        return false;
    }

    if (typeof req.body.precio !== "number" || req.body.precio === "") {
        res.status(400).json(error)
        return false;
    }

    return true;
}


export const getTebeo = (
    req: Request,
    res: Response
) => {
    tebeosCollection.find().toArray().then((result) => {
        res.json(result);
    }).catch(() => {
        res.status(500).json({
            message: "Ha habido un error al buscar los Tebeos"
        });
    });
};


export const getTebeoWithId = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Id no válido"
        });
        return;
    };

    tebeosCollection.findOne({
        _id: new ObjectId(id)
    }).then((tebeo) => {
        if(!tebeo){
            res.status(404).json({
                message: "No hay un Tebeo con ese id"
            });
            return;
        };
        res.json(tebeo);
    }).catch(() => {
        const error: ErrorAPI = {error: "Error no encontrado"}
        res.status(500).json(error);
    });
};


export const postTebeo = (
    req: Request,
    res: Response
) => {
    
    const newTebeo: TebeoT = {
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    };    

    tebeosCollection.insertOne(newTebeo).then((result) => {
        res.status(201).json({
            _id: result.insertedId,
            ...newTebeo
        });    
    }).catch(() => {
        res.status(500).json({
            message: "Error interno del servidor"
        })    
    });    
}    


export const putTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Id no válido"
        });
        return;
    };


    tebeosCollection.replaceOne({_id: new ObjectId(id)},{
        titulo: req.body.titulo,
        autor: req.body.autor,
        editorial: req.body.editorial,
        numero: req.body.numero,
        fechaPublicacion: req.body.fechaPublicacion,
        precio: req.body.precio,
        leido: req.body.leido
    }).then((tebeo) => {
        if (tebeo.matchedCount === 0){
            res.status(404).json({
                message: "No hay Tebeo con ese id"
            });
            return;
        };

        res.json(tebeo);
    }).catch(() => {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    });
};


export const deleteTebeo = (
    req: Request,
    res: Response
) => {
    const id = String(req.params.id);

    if(!ObjectId.isValid(id)){
        res.status(400).json({
            message: "Identificador incorrecto"
        });
        return;
    };

    tebeosCollection.deleteOne({_id: new ObjectId(id)}).then((tebeo) => {
        if (tebeo.deletedCount === 0){
            res.status(404).json({
                message: "El Tebeo no existe"
            });
            return;
        };
        res.json(tebeo);
    }).catch(() => {
        res.status(500).json({
            message: "Error interno del servidor"
        });
    });
};