var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT 
            u.idUsuario, 
            u.nomeUsuario, 
            u.email, 
            u.fkUsuarioEmpresa AS empresaId, 
            u.tipoUsuario, 
            f.nomeFazenda AS nomeFazenda
        FROM 
            usuario u
        LEFT JOIN 
            fazenda f ON u.fkUsuarioEmpresa = f.fkEmpresaFazenda
        WHERE 
            u.email = '${email}' 
            AND u.senha = '${senha}';
            `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha, cpf, tipoUsuario, idEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);

    var instrucaoSql = `
        INSERT INTO usuario (nomeUsuario, email, senha, cpf, tipoUsuario, fkUsuarioEmpresa) VALUES ('${nome}', '${email}', '${senha}', '${cpf}', '${tipoUsuario}', '${idEmpresa}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    autenticar,
    cadastrar
};