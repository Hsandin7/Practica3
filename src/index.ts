import express from "express";
import tebeoRoutes from "./routes/tebeo.routes.js"
import { connectAlMonguito } from "./config/database.js";
import { configCollection } from "./controllers/tebeo.controller.js";
import type { TebeoT } from "./models/tebeo.model.js";
import type { Collection } from "mongodb";


const app = express();
app.use(express.json());

const startServer = () => {
    connectAlMonguito().then((baseDeDatos) => {
        const tebeoCollection: Collection<TebeoT> = baseDeDatos.collection("tebeos")

        configCollection(tebeoCollection);
        
        app.use("/tebeos", tebeoRoutes);
        
        app.listen(3000, ()=> {
            console.log("Api funcionando en el puerto 3000");
        })
    }).catch(() => {
        console.log("No se ha podido iniciar el servidor.");
    })
}

startServer();