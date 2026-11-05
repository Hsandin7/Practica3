
import { Db, MongoClient } from 'mongodb';
import { error } from 'node:console';

const client = new MongoClient("mongodb+srv://hsandinm:hsandinm@backend.dr2i0k9.mongodb.net/");



export const connectAlMonguito = (): Promise<Db> => {
    return client.connect().then(() => {
        console.log("Te has conectado al Monguito");

        return client.db("Backend");
    }).catch((error) => {
        console.log("Error al conectarse a Monguito");
        
        throw error;
    })
}