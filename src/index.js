// Supports ES6
// import { create, Whatsapp } from 'sulla';
const bot = require("venom-bot");
const { db } = require("../src/models/banco");
const { step } = require("../src/models/stages");

bot.create().then((client) => start(client)).catch((erro)=> erro);

function start(client) {
    try{
        return step[5].obj.execute("Usuário", "rodando desde o início");
    }
    catch(erro){
        console.log("Erro: ", erro)
    }
    
    client.onMessage((message) => {
        let resp = step[getStage(message.from)].obj.execute(
            message.from,
            message.body,
            message.sender.name
        );
        resp.map(element => { client.sendText(message.from, element) });
        /*
        for (let index = 0; index < resp.length; index++) {
            const element = resp[index];
            client.sendText(message.from, element);
        }
        */
    });
}

function getStage(user) {
    if (db[user]) {
        //Se existir esse numero no banco de dados
        return db[user].stage;
    } else {
        //Se for a primeira vez que entra e contato
        db[user] = {
            stage: 0,
            itens: [],
        };
        return db[user].stage;
    }
}
