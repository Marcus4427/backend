const conectarDb = require('./database.js');

class Tarefa {
    constructor(nome, concluida) {
        this.nome = nome;
        this.concluida = concluida;
        this.id = null;
    }

    async getDb() {
        if (!this.db) {
            this.db = await conectarDb();
            this.collection = this.db.collection('tarefas');
        }
        return this.db;
    }

    async inserir() {
        await this.getDb();
        const resultado = await this.collection.insertOne({
            nome: this.nome,
            concluida: this.concluida
        });
        this.id = resultado.insertedId;
    }

    async alterar() {
        await this.getDb();
        await this.collection.updateOne(
            { _id: this.id },
            { $set: { nome: this.nome, concluida: this.concluida } }
        );
    }

    async deletar() {
        await this.getDb();
        await this.collection.deleteOne({ nome: this.nome });
    }

    async buscar() {
        await this.getDb();
        const resultado = await this.collection.findOne({ nome: this.nome });
        if (resultado) {
            this.nome = resultado.nome;
            this.concluida = resultado.concluida;
            this.id = resultado._id;
        }
        return resultado;
    }
}

module.exports = Tarefa;
