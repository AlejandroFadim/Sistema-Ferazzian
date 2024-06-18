var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/buscarUltimasMedidas/:idSensor", function (req, res) {
    medidaController.buscarUltimasMedidas(req, res);
});

router.get("/buscarPorHectare/:cont", function (req, res) {
    medidaController.buscarPorHectare(req, res);
});

module.exports = router;