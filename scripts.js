function realca(c){
    document.getElementById(c).style.boxShadow = '0.5px 0.5px 1px 1px'
}

function limpa(c){
    document.getElementById(c).style.boxShadow = '0px 0px'
}

function verificalogin(){
    var email = document.querySelector("#email");
    var senha = document.querySelector("#senha");
    var formulario = document.querySelector("#fLogin");
    var ok = 0;
    if(senha.value.length < 6){
        window.alert("Por favor, digite uma senha válida!");
    }
    if(!verificaemail('l')){
        window.alert("Por favor, digite um email válido!");
    }
    else{
        for(i = 1;i <= Number(window.sessionStorage.nContas);i++){
            if(window.sessionStorage.getItem("email" + i) == email.value){
                ok++;
                if(window.sessionStorage.getItem("senha" + i) == senha.value){
                    ok++;
                }
            }
        }
        if(ok == 0){
            window.alert("Email não cadastrado!");
        }
        if(ok == 1){
            window.alert("Senha incorreta!");
        }
        if(ok == 2){
            formulario.submit();
            window.location.href = "lista-usuarios.html";
        }
    }
}

function verificaemail(c){
    var email = document.querySelector("#email");
    var usuario = email.value.substring(0, email.value.indexOf("@"));
    var dominio = email.value.substring(email.value.indexOf("@") + 1, email.value.length);

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

function verificacadastro(){
    var nome = document.querySelector("#nomecompleto");
    var email = document.querySelector("#email");
    var senha = document.querySelector("#senha");
    var repetsenha = document.querySelector("#repetsenha");
    var formulario = document.querySelector("#fCadastro");

    if(nome.value.length > 3 && senha.value.length >= 6 && repetsenha.value == senha.value && verificaemail('c')){
        if(window.sessionStorage.nContas == null){
            window.sessionStorage.setItem("nContas", "0");
        }
        for(i = 1;i <= Number(window.sessionStorage.nContas);i++){
            var n = 0;
            if(window.sessionStorage.getItem("email" + i) == email.value){
                n = 1;
            }
        }
        if(n != 1){
            window.sessionStorage.nContas = Number(window.sessionStorage.nContas) + 1;
            window.sessionStorage.setItem("email" + window.sessionStorage.nContas, email.value);
            window.sessionStorage.setItem("senha" + window.sessionStorage.nContas, senha.value);
            formulario.submit();
            window.location.href = "index.html";
        }
        else{
            window.alert("Email já utilizado!")
        }
    }
    if(nome.value.length <= 3){
        window.alert("Por favor, digite um nome!");
    }
    if(senha.value.length < 6){
        window.alert("Por favor, digite uma senha válida!");
    }
    if(senha.value != repetsenha.value){
        window.alert("As senhas não coincidem!");
    }
    if(!verificaemail()){
        window.alert("Por favor, digite um email válido!");
    }
}