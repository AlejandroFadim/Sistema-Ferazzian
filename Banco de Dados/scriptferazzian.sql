-- Active: 1713288107577@@127.0.0.1@3306@ferazzian
create database ferazzian;
use ferazzian;
     
CREATE TABLE empresa (
  idEmpresa INT PRIMARY KEY AUTO_INCREMENT,
  nomeEmpresa VARCHAR(45),
  cep CHAR(9),
  cnpj CHAR(18),
  numero VARCHAR(45),
  telefone CHAR(12));

INSERT INTO empresa VALUES
(default, 'Fazenda Bela Vista','12345-678','26.186.289/0001-79','122', '11961713435'),
(default, 'Fazenda Vista Verde','87654-321','26.186.289/0001-78','143','11962719090'),
(default, 'Fazenda Santa Rita','54321-876','26.186.289/0001-77','333','11966723334');

CREATE TABLE usuario (
  idUsuario INT UNIQUE auto_increment,
  nomeUsuario VARCHAR(45),
  email VARCHAR(30),
  senha VARCHAR(45),
  cpf CHAR(11),
  tipoUsuario VARCHAR(45),
  fkUsuarioEmpresa INT, 
  PRIMARY KEY (idUsuario, fkUsuarioEmpresa),
  FOREIGN KEY (fkUsuarioEmpresa)
  REFERENCES empresa(idEmpresa));
  

INSERT INTO usuario (nomeUsuario, email, senha, cpf, fkUsuarioEmpresa) VALUES
('ANTONIO','antonio@belavista.com','76hf238rB', '46464798833',1),
('RENAN','renan@vistaverde.com','sdh586T', '46464795522', 2),
('PEDRO','pedro@santarita.com','Hrfer3412', '46464782266',3);

INSERT INTO usuario (nomeUsuario, email, senha, cpf, fkUsuarioEmpresa) VALUES
('JOÃO','jpmorenoce@gmail.com','190406', '40790791846',3);

CREATE TABLE fazenda (
  idFazenda INT PRIMARY KEY AUTO_INCREMENT,
  nomeEmpresa VARCHAR(45),
  tipoSoja VARCHAR(45),
  tamHectare INT,
  fkEmpresaFazenda INT, CONSTRAINT fkEmpFazenda FOREIGN KEY (fkEmpresaFazenda) REFERENCES empresa(idEmpresa));


INSERT INTO fazenda VALUES
(null,'A','Soja Orgânica', 2, 1),
(null,'B','Soja Convencional', 4, 2),
(null,'C','Soja Orgânica', 50, 3);

CREATE TABLE parametros (
	idParametro INT AUTO_INCREMENT,
    tempMaxima DECIMAL,
    tempMinima DECIMAL,
    umidMinima DECIMAL,
    fkParametroFazenda INT,
    PRIMARY KEY (idParametro, fkParametroFazenda), FOREIGN KEY (fkParametroFazenda) REFERENCES fazenda(idFazenda)
);

insert into parametros values
(null, 28, 18, 80, 1),
(null, 30, 20, 70, 2),
(null, 26, 22, 90, 3);


CREATE TABLE sensor (
  idSensor INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  fkSensorFazenda INT, CONSTRAINT fkSensorFzd FOREIGN KEY (fkSensorFazenda) REFERENCES fazenda(idFazenda));

INSERT INTO sensor VALUES
(1,'DHT11-A1',1),
(2,'DHT11-A2',2),
(3,'DHT11-A3',3);

CREATE TABLE dadosSensor (
  idDadosSensor INT PRIMARY KEY AUTO_INCREMENT,
  sensorTemp DECIMAL,
  sensorUmid DECIMAL,
  horaColeta DATETIME default current_timestamp,
  fkSensorDados INT, CONSTRAINT fkDadosSensor FOREIGN KEY (fkSensorDados) REFERENCES sensor(idSensor));

SELECT * FROM empresa;
SELECT * FROM usuario;
SELECT * FROM fazenda;
SELECT * FROM sensor;
SELECT * FROM dadosSensor;

insert into dadosSensor values
(null, 17, 64, default, 1),
(null, 39, 85, default, 2),
(null, 24, 91, default, 3);
select * from dadosSensor;

SELECT tempMaxima, tempMinima, umidMinima, sensorTemp, sensorUmid, DATE_FORMAT(horaColeta,'%H:%i:%s') as horaColeta
     FROM dadosSensor join sensor on fkSensorDados = idSensor join fazenda on fkSensorFazenda = idFazenda join parametros on fkParametroFazenda = idFazenda WHERE idSensor = 1 limit 7;
-- EXIBINDO O NOME DA EMPRESA, TIPO DE SOJA, DATAS DO PLANTIO E COLHEITA, NOME DO SENSOR, TEMPERATURAS E UMIDADES REGISTRADAS, E A HORA DESSE REGISTRO

SELECT empresa.nomeEmpresa AS Empresa,
	fazenda.tipoSoja AS 'Tipo de Soja',
    sensor.nome AS Sensor,
    dadosSensor.sensorTemp AS Temperatura,
    dadosSensor.sensorUmid AS Umidade,
    dadosSensor.horaColeta AS 'Hora do Registro'
FROM fazenda 
JOIN empresa 
ON fazenda.fkEmpresaFazenda = empresa.idEmpresa
JOIN sensor 
ON sensor.fkSensorFazenda = fazenda.idFazenda
JOIN  dadosSensor 
ON dadosSensor.fkSensorDados = sensor.idSensor
WHERE idEmpresa = 1;



select empresa.nomeEmpresa as NomeEmpresa,
fazenda.tipoSoja as TipoSoja
from empresa join fazenda on fazenda.fkEmpresaFazenda = empresa.idEmpresa; 

select * from usuario;

select usuario.nomeUsuario as funcionario, empresa.nomeEmpresa as empresa, usuario.email from usuario join empresa on usuario.fkUsuarioEmpresa = empresa.idEmpresa;

SELECT idDadosSensor, sensorTemp, sensorUmid, DATE_FORMAT(horaColeta,'%H:%i:%s') as horaColeta
     FROM dadosSensor WHERE fkSensorDados = 1 LIMIT 7;
     
     SELECT sensorTemp, sensorUmid, DATE_FORMAT(horaColeta,'%H:%i:%s') as horaColeta
     FROM dadosSensor join sensor on fkSensorDados = idSensor WHERE idSensor = 1 and fkSensorFazenda = 1;
     
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
    WHERE idSensor = 3 order by horaColeta desc limit 1;
select * from parametros;
     
     select * from sensor;
     select * from dadosSensor;
     select * from fazenda;