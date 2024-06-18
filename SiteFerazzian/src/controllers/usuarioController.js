var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);
                    res.json({
                        idUsuario: resultadoAutenticar[0].idUsuario,
                        nomeUsuario: resultadoAutenticar[0].nomeUsuario,
                        email: resultadoAutenticar[0].email,
                        empresaId: resultadoAutenticar[0].empresaId,
                        tipoUsuario:  resultadoAutenticar[0].tipoUsuario,
                        nomeFazenda: resultadoAutenticar[0].nomeFazenda
                    })

                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {

    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var cpf = req.body.cpfServer;
    var tipoUsuario = req.body.tipoServer;
    var idEmpresa = req.params.idEmpresa;

    if (nome == undefined) {
        res.status(400).send("Preencha o campo de nome.");
    } else if (email == undefined) {
        res.status(400).send("Preencha o campo de e-mail.");
    } else if (senha == undefined) {
        res.status(400).send("Preencha o campo de senha.");
    } else {
        usuarioModel.cadastrar(nome, email, senha, cpf, tipoUsuario, idEmpresa)
            .then(
                function (resposta) {
                    res.status(201).send("Usuário cadastrado com sucesso!");
                }
            ).catch(
                function (erro) {
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    autenticar,
    cadastrar
}