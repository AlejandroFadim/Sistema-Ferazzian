function calcular() {
    div1.style.display = `flex`;
    var Faturamento = Number(input_faturamento.value); // faturamento por cada hectare
    var NumHec = Number(input_num.value); // número de hectares
    var PerdaHec = Number(input_perda.value); // perdas por cada hectare

    if (PerdaHec == '') {
        PerdaHec = Number(90);
        input_perda.placeholder = `Em média, 90%`;
    }

    var perda = (PerdaHec * Faturamento) / 100; // encontra a porcentagem da perda dentro do faturamento
    var perda20 = perda - (perda * 0.20); // diminuição da perda em 10%
    var total = Faturamento * NumHec; // faturamento com todos o hectares
    var preju = total * (PerdaHec / 100);
    var total2 = total - preju; // faturamento total com as perdas antes
    var retorno = preju * 0.20; // retorno de 10% do que foi perdido
    var final = total2 + retorno; // faturamento total com as perdas depois

    if (NumHec < 100) { // é necessário ter no mínimo 100 hectares
        div1.innerHTML = '';
        div1.style.display = `none`;
        alert("O numero minimo de Hectares é 100");
    } else {
        div1.innerHTML = `
            <span class="H2">Simulando:</span>
            <span>Ao não utilizar nossos processos de monitoramento, você tem uma perda de <span class="perda">R$${perda.toFixed(2).replaceAll('.', ',')}</span> por hectare pela Ferrugem Asiática.
            <br>
            Já com o nosso monitoramento, você perde <span class="ganho">R$${perda20.toFixed(2).replaceAll('.', ',')}</span> por hectare, elevando os lucros de <span class="perda">R$${total2.toFixed(2).replaceAll('.', ',')}</span> para <span class="ganho">R$${final.toFixed(2).replaceAll('.', ',')}</span>
            <br><br>
            <span class="H2">Como Funciona?</span>
            <br><br>
            Com nossos serviços de monitoramento da temperatura e umidade de sua plantação, há uma diminuição percentual de 20% na perda pela Ferrugem Asiática, o que pode triplicar o lucro.</span>
            `
    }
}