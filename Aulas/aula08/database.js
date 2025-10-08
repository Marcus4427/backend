const { MongoClient } = require("mongodb");
const url = "mongodb+srv://usrTarefas:08112000@cluster0.q2lwm87.mongodb.net/";

const client = new MongoClient(url);

async function conecta(){
    try {
        await client.connect();
        return client.db("agenda");
    } catch(e){
     console.log("Erro ao conectar no MongoDB!",
        e.message
     );
    }
}

module.exports = conecta;
