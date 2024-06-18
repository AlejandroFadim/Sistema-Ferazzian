function Login() { // Validação de todas as entradas de dados
    var emailVar = input_email_login.value;
    var senhaVar = input_senha_login.value;

    if (emailVar == "" || senhaVar == "") {
        Swal.fire({
            icon: "error",
            title: "Erro...",
            background: "#1D1D1D",
            color: "#FFF",
            text: "CAMPO EM BRANCO",
          });
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")

        if (resposta.ok) {
            console.log(resposta);
            Swal.fire({
                icon: "success",
                title: "Sucesso!",
                background: "#1D1D1D",
                color: "#FFF",
                text: "LOGIN REALIZADO COM SUCESSO",
                showConfirmButton: false,
              });

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nomeUsuario;
                sessionStorage.ID_USUARIO = json.idUsuario;
                sessionStorage.ID_EMPRESA = json.empresaId;
                sessionStorage.TP_USUARIO = json.tipoUsuario;
                sessionStorage.NOME_FAZENDA = json.nomeFazenda;
                
                setTimeout(function () {

                    window.location = "../Dashboard/dashboard.html";
                }, 1700);

            });

        } else {
            Swal.fire({
                icon: "error",
                title: "Erro...",
                background: "#1D1D1D",
                color: "#FFF",
                text: "Houve um erro ao tentar realizar o login!",
              });
            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}