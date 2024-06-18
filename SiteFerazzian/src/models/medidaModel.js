var database = require("../database/config")

function buscarUltimasMedidas(idSensor, limite_linhas) {

    var instrucaoSql = `
    SELECT nomeFazenda,
	tipoSoja, 
    tempMaxima,
    tempMinima,
    umidMinima,
    sensorTemp,
    sensorUmid,
    DATE_FORMAT(horaColeta,'%H:%i:%s') as horaColeta
    FROM dadosSensor
    join sensor on fkSensorDados = idSensor
    join fazenda on fkSensorFazenda = idFazenda
    join parametros on fkParametroFazenda = idFazenda
    WHERE idSensor = ${idSensor} order by idDadosSensor desc limit ${limite_linhas};`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function buscarPorHectare(idSensor) {

    var instrucaoSql = `
    SELECT tempMaxima,
    tempMinima,
    umidMinima,
    sensorTemp,
    sensorUmid,
    DATE_FORMAT(horaColeta,'%H:%i:%s') as horaColeta
    FROM dadosSensor
    join sensor on fkSensorDados = idSensor
    join fazenda on fkSensorFazenda = idFazenda
    join parametros on fkParametroFazenda = idFazenda
    WHERE idSensor = ${idSensor} order by idDadosSensor desc limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscarUltimasMedidas,
    buscarPorHectare
};