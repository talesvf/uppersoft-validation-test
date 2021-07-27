//faz os botoes de editar da lista de usuario se destacarem quando o mouse passa por cima
function realca(c){
    document.getElementById(c).style.boxShadow = '0.5px 0.5px 1px 1px'
}

//faz os botoes de editar da lista de usuario voltarem ao normal quando o mouse sai de cima
function limpa(c){
    document.getElementById(c).style.boxShadow = '0px 0px'
}

//verifica se o email está cadastrado e se a senha correspondente esta correta
function verificalogin(){
    var email = document.querySelector("#email");
    var senha = document.querySelector("#senha");
    var formulario = document.querySelector("#fLogin");
    var ok = 0;
    //verifica se a senha possúi o tamanho mínimo
    if(senha.value.length < 6){
        window.alert("Por favor, digite uma senha válida!");
    }
    //verifica se o email é válido
    if(!verificaemail('l')){
        window.alert("Por favor, digite um email válido!");
    }
    else{
        //passa por todos os emails cadastrados na sessionStorage
        for(i = 1;i <= Number(window.sessionStorage.nContas);i++){
            //verifica se algum dos emails cadastrados é igual ao email inserido
            if(window.sessionStorage.getItem("email" + i) == email.value){
                ok++;
                //se o email estiver cadastrado, verifica se a senha está correta
                if(window.sessionStorage.getItem("senha" + i) == senha.value){
                    ok++;
                }
            }
        }
        //alerta que o email nao está cadastrado
        if(ok == 0){
            window.alert("Email não cadastrado!");
        }
        //alerta que a senha está incorreta
        if(ok == 1){
            window.alert("Senha incorreta!");
        }
        //se ambos estiverem corretos, envia o formulário e direciona para a pagina lista-usuarios.html
        if(ok == 2){
            formulario.submit();
            window.location.href = "lista-usuarios.html";
        }
    }
}
//verifica se o email está no padrão de email
function verificaemail(c){
    var email = document.querySelector("#email");
    var usuario = email.value.substring(0, email.value.indexOf("@"));
    var dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);
    //se o email estiver dentro do padrão, faz a divisão sumir
    if ((usuario.length >=1) && (dominio.length >=3) && (usuario.search("@")==-1) && (dominio.search("@")==-1) && (usuario.search(" ")==-1) && (dominio.search(" ")==-1) && (dominio.search(".")!=-1) && (dominio.indexOf(".") >=1)&& (dominio.lastIndexOf(".") < dominio.length - 1)) {
        if(c == 'l'){
            var verifical = document.querySelector("#verifical");
            verifical.style.display = "none";
        }
        if(c == 'c'){
            var verificac = document.querySelector("#verificac");
            verificac.style.display = "none";
        }
        return 1;
    }
    //se o email não estiver dentro do padrão, avisa por meio de uma divisao que aparece embaixo do campo de email
    else{
        if(c == 'l'){
            var verifical = document.querySelector("#verifical");
            verifical.style.display = "block"
            verifical.style.backgroundColor = "#EFF0F3"
            verifical.innerHTML = "O email digitado acima não é valido!"
        }
        if(c == 'c'){
            var verificac = document.querySelector("#verificac");
            verificac.style.display = "block"
            verificac.style.backgroundColor = "#EFF0F3"
            verificac.innerHTML = "O email digitado acima não é valido!"
        }
        return 0;
    }
}
//realiza o cadastro das contas
function verificacadastro(){
    var nome = document.querySelector("#nomecompleto");
    var email = document.querySelector("#email");
    var senha = document.querySelector("#senha");
    var repetsenha = document.querySelector("#repetsenha");
    var formulario = document.querySelector("#fCadastro");
    //verifica se o nome e o email são válidos, se a senha tem o tamanho mínimo e se é igual ao campo de confirmação da senha
    if(nome.value.length > 3 && senha.value.length >= 6 && repetsenha.value == senha.value && verificaemail('c')){
        //se for a primeira conta a ser cadastrada, cria um contador de contas na sessionStorage
        if(window.sessionStorage.nContas == null){
            window.sessionStorage.setItem("nContas", "0");
        }
        //passa por todos os emails cadastrados para verificar se o email inserido ja foi cadastrado
        for(i = 1;i <= Number(window.sessionStorage.nContas);i++){
            var n = 0;
            if(window.sessionStorage.getItem("email" + i) == email.value){
                n = 1;
            }
        }
        //se o email não estiver cadastrado, realiza o cadastro guardando o email e a senha no sessionStorage
        if(n != 1){
            window.sessionStorage.nContas = Number(window.sessionStorage.nContas) + 1;
            window.sessionStorage.setItem("email" + window.sessionStorage.nContas, email.value);
            window.sessionStorage.setItem("senha" + window.sessionStorage.nContas, senha.value);
            formulario.submit();
            window.location.href = "index.html";
        }
        //se o email ja estiver cadastrado manda um alerta avidando
        else{
            window.alert("Email já utilizado!")
        }
    }//avisa se o nome não for válido
    if(nome.value.length <= 3){
        window.alert("Por favor, digite um nome!");
    }
    //avisa se a senha não possuir o tamanho mínimo
    if(senha.value.length < 6){
        window.alert("Por favor, digite uma senha válida!");
    }
    //avisa se as senhas nao coincidirem
    if(senha.value != repetsenha.value){
        window.alert("As senhas não coincidem!");
    }
    //avisa se o formato do email nao for válido
    if(!verificaemail()){
        window.alert("Por favor, digite um email válido!");
    }
}