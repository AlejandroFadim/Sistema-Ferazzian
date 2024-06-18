function cadastrar() { // Validações de todas as entradas de dados
  var nomeVar = input_nome_cadastro.value;
  var emailVar = input_email_cadastro.value;
  var senhaVar = input_senha_cadastro.value;
  var confirmacaoSenhaVar = input_confirmar_senha_cadastro.value;
  var cpfVar = input_cpf.value;
  var tipoUsuarioVar = input_selecionar_tipo_cadastro.value;

  var nome_up = nomeVar.toUpperCase();
  console.log(nome_up);

  const idEmpresa = Number(sessionStorage.getItem("ID_EMPRESA"))

  var tamanho_email = emailVar.length;
  var arroba = emailVar.indexOf('@'); 
  var ponto = emailVar.indexOf('.'); 
  var tamanho_senha = senhaVar.length;
  var tamanho_cpf = cpfVar.length;

  if (nomeVar == "" || emailVar == "" || senhaVar == "" || confirmacaoSenhaVar == "" || cpfVar == "") {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "CAMPO EM BRANCO",
    });
  } else if (arroba < 0 || ponto < 0) {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "O campo 'email' está inválido",
    });
  } else if (tamanho_email < 5) {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "O campo 'email' está inválido",
    });
  } else if (tamanho_senha < 8) {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "Senha muito fraca. Necessário no mínimo 8 caracteres",
    });
  } else if (senhaVar != confirmacaoSenhaVar) {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "Falha ao autenticar senha",
    });
  } else if (tamanho_cpf < 11) {
    input_cpf.value = ``; 
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "O campo 'CPF' está inválido.",
    });
  } else if (tipoUsuarioVar == "#") {
    Swal.fire({
      icon: "error",
      title: "Erro...",
      background: "#1D1D1D",
      color: "#FFF",
      text: "Selecione o tipo do usuário",
    });
  } else {
    nomeVar.value = ``; 
    emailVar.value = ``; 
    senhaVar.value = ``; 
    confirmacaoSenhaVar.value = ``; 
    cpfVar.value = ``; 
    Swal.fire({
      icon: "success",
      title: "Sucesso!",
      background: "#1D1D1D",
      color: "#FFF",
      text: "CADASTRO REALIZADO COM SUCESSO",
    });
    fetch(`/usuarios/cadastrar/${idEmpresa}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        senhaServer: senhaVar,
        cpfServer: cpfVar,
        tipoServer: tipoUsuarioVar
      })
      
    }).then(function (resposta) {
      console.log(resposta)
    });
  }

  }



function sumirMensagem() {
  cardErro.style.display = "none";
}