const { db } = require("../models/banco");
const { step } = require("../models/stages");

function execute(user, msg) {
    if (msg === "*") {
        db[user].stage = 0;
        return ["Pedido cancelado com sucesso"];
    }

    if (msg === "#") {
        db[user].stage = 5;

        //step[5].obj.execute("aleks", "vai que vc consegue!");
        return step[5].obj.execute(user, "");
    }
    return [
        "```Digite # para continuar ou * para cancelar```",
        `Confirma endereco de entrega : \n ${msg}`,
    ];
}

module.exports.execute = execute;