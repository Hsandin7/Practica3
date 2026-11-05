import express from "express";
import filmsRoutes from "./routes/films.routes.js"
import { connectAlMonguito } from "./config/database.js";
import { configCollection } from "./controllers/films.controller.js";
import type { FilmT } from "./models/film.model.js";
import type { Collection } from "mongodb";


const app = express();
app.use(express.json());

const startServer = () => {
    connectAlMonguito().then((baseDeDatos) => {
        const filmCollection: Collection<FilmT> = baseDeDatos.collection("peliculones")

        configCollection(filmCollection);
        
        app.use("/films", filmsRoutes);
        
        app.listen(3000, ()=> {
            console.log("Api funcionando en el puerto 3000");
        })
    }).catch(() => {
        console.log("No se ha podido iniciar el servidor.");
    })
}

startServer();