document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("senha") === null) {
        localStorage.setItem("senha", "");
    }
    const senhaHash = "85ee0fe4f155a9af2657d85054ad63ca";
    const senhaUser = hex_md5(localStorage.getItem("senha"));

    if (senhaUser == senhaHash) {
        criaPaginaBotoes();
    } else {
        iniciaLogin();
    }
});

function iniciaLogin() {
    const body = document.body;

    const titulo = document.createElement("h1");
    titulo.textContent = "Atletas do Botafogo em 2024.1";

    const paragrafo1 = document.createElement("p");
    paragrafo1.textContent =
        "Projeto final da disciplina Desenvolvimento web, no periodo de 2024.1.";

    const containerInfo = document.createElement("div");
    containerInfo.id = "containerInfo";

    const containerMain = document.createElement("div");
    containerMain.id = "containerMain";

    const paragrafo2 = document.createElement("p");
    paragrafo2.textContent = "Efetue login com a senha: SENHA";

    const loginForm = document.createElement("form");
    loginForm.id = "login-form";

    const loginHead = document.createElement("h1");
    loginHead.id = "login-head";
    loginHead.textContent = "Login";

    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "senha";
    passwordInput.placeholder = "Digite sua senha";

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Entrar";

    containerInfo.appendChild(titulo);
    containerInfo.appendChild(paragrafo1);

    loginForm.appendChild(loginHead);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);
    loginForm.appendChild(paragrafo2);

    containerMain.appendChild(containerInfo);
    containerMain.appendChild(loginForm);

    body.appendChild(containerMain);

    loginForm.addEventListener("submit", function (event) {
        const senha = document.getElementById("senha").value;
        localStorage.setItem("senha", senha);
    });
}

let containerJogadores;

function criaPaginaBotoes() {
    const body = document.body;

    body.innerHTML = "";
    body.style.backgroundImage = "none";

    const header = document.createElement("header");

    const titulo = document.createElement("h3");
    titulo.id = "tituloHead";
    titulo.textContent = "Atletas Botafogo 2024-1";

    const botaoSair = document.createElement("button");
    botaoSair.id = "botaoSair";
    botaoSair.textContent = "Sair";

    header.appendChild(titulo);
    header.appendChild(botaoSair);

    const main = document.createElement("main");

    const botao1 = document.createElement("button");
    botao1.id = "masculino";
    botao1.textContent = "Masculino";

    const botao2 = document.createElement("button");
    botao2.id = "feminino";
    botao2.textContent = "Feminino";

    const botao3 = document.createElement("button");
    botao3.id = "elenco";
    botao3.textContent = "Elenco Completo";

    containerJogadores = document.createElement("div");
    containerJogadores.id = "containerJogadores";

    main.appendChild(botao1);
    main.appendChild(botao2);
    main.appendChild(botao3);

    const selecao = document.createElement("select");
    selecao.id = "menuPequeno";

    const optionD = document.createElement("option");
    optionD.value = 0;
    optionD.text = "Selecione o elenco";
    selecao.add(optionD);
    optionD.disabled = true;
    const optionM = document.createElement("option");
    optionM.value = 1;
    optionM.text = "Masculino";
    selecao.add(optionM);
    const optionF = document.createElement("option");
    optionF.value = 2;
    optionF.text = "Feminino";
    selecao.add(optionF);
    const optionE = document.createElement("option");
    optionE.value = 3;
    optionE.text = "Elenco Completo";
    selecao.add(optionE);

    body.appendChild(header);
    body.appendChild(main);
    body.appendChild(selecao);
    body.appendChild(containerJogadores);

    selecao.addEventListener("change", () => {
        const valorSelecionado = selecao.value;
        console.log(valorSelecionado);
        containerJogadores.innerHTML = "";
        if (valorSelecionado == 1) {
            carregarJogadores("masculino");
        } else if (valorSelecionado == 2) {
            carregarJogadores("feminino");
        } else {
            carregarJogadores("all");
        }
    });

    document.getElementById("botaoSair").addEventListener("click", () => {
        sair();
        location.reload();
    });

    document.getElementById("masculino").addEventListener("click", () => {
        containerJogadores.innerHTML = "";
        carregarJogadores("masculino");
    });

    document.getElementById("feminino").addEventListener("click", () => {
        containerJogadores.innerHTML = "";
        carregarJogadores("feminino");
    });

    document.getElementById("elenco").addEventListener("click", () => {
        containerJogadores.innerHTML = "";
        carregarJogadores("all");
    });
}

function sair() {
    localStorage.removeItem("senha");
}

const criarCartao = (entrada) => {
    const container_atleta = document.createElement("article");
    container_atleta.style.backgroundColor = "#777777";
    container_atleta.style.textAlign = "center";

    container_atleta.dataset.id = entrada.id;
    container_atleta.dataset.altura = entrada.altura;
    container_atleta.dataset.nome = entrada.nome;
    container_atleta.dataset.nascimento = entrada.nascimento;
    container_atleta.dataset.imagem = entrada.imagem;
    container_atleta.dataset.descricao = entrada.descricao;

    const escudo = document.createElement("img");
    escudo.src = "botafogo.png";
    escudo.id = "escudo";

    const titulo = document.createElement("h3");
    titulo.innerHTML = entrada.nome;
    const imagem = document.createElement("img");
    imagem.src = entrada.imagem;
    imagem.alt = `foto de ${entrada.nome}`;
    const saibaMais = document.createElement("p");
    saibaMais.id = "saibaMais";
    saibaMais.innerHTML = "CONHEÇA O CRAQUE";

    container_atleta.appendChild(escudo);
    container_atleta.appendChild(titulo);
    container_atleta.appendChild(imagem);
    container_atleta.appendChild(saibaMais);

    container_atleta.onclick = manipularClick;

    containerJogadores.appendChild(container_atleta);
};

const manipularClick = (e) => {
    const artigo = e.target.closest("article");
    window.location = `detalhes.html?id=${artigo.dataset.id}`;
};

const pegaJson = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const carregarJogadores = async (endpoint) => {
    const url = `https://botafogo-atletas.mange.li/2024-1/${endpoint}`;

    const jogadores = await pegaJson(url);
    for (const jogador of jogadores) {
        criarCartao(jogador);
    }
};
