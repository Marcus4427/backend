const readline = require("readline-sync");
const controlador = require('./controlador.js');

function menu() {
    console.log("1. Adicionar contato");
    console.log("2. Buscar contato");
    console.log("3. Atualizar contato");
    console.log("4. Remover contato");
    console.log("5. Sair");
}

async function escolherOpcao(opcao) {
    switch (opcao) {
        case '1':
            const nome = readline.question("Digite o nome da tarefa: ");
            await controlador.adicionarTarefa(nome);
            break;
        case '2':
            const nomeBuscar = readline.question("Digite o nome da tarefa: ");
            const tarefa = await controlador.buscarTarefa(nomeBuscar);
            if (tarefa) {
                console.log("Tarefa encontrada:", tarefa);
            } else {
                console.log("Tarefa não encontrada");
            }
            break;
        case '3':
            const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
            const concluidaStr = readline.question("Concluida (true/false): ");
            const concluida = concluidaStr.toLowerCase() === 'true';
            await controlador.atualizarTarefa(nomeAtualizar, concluida);
            break;
        case '4':
            const nomeRemover = readline.question("Digite o nome da tarefa: ");
            await controlador.removerTarefa(nomeRemover);
            break;
        case '5':
            process.exit();
            break;
    }
}

async function main() {
    while (true) {
        menu();
        const opcao = readline.question("Escolha uma opção: ");
        await escolherOpcao(opcao);
    }
}

main();
