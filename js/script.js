let pessoas = [];
let restricoes = [];
let equipesFormadas = [];

const nomePessoa = document.getElementById("nomePessoa");
const btnAdicionar = document.getElementById("btnAdicionar");
const listaPessoas = document.getElementById("listaPessoas");
const contadorPessoas = document.getElementById("contadorPessoas");

const pessoa1 = document.getElementById("pessoa1");
const pessoa2 = document.getElementById("pessoa2");
const btnAdicionarRestricao = document.getElementById("btnAdicionarRestricao");
const btnExcluirTudo = document.getElementById("btnExcluirTudo");
const listaRestricoes = document.getElementById("listaRestricoes");

const modalConfirmacao = document.getElementById("modalConfirmacao");
const mensagemConfirmacao = document.getElementById("mensagemConfirmacao");
const naoPerguntar = document.getElementById("naoPerguntar");

const btnCancelarRemocao = document.getElementById("btnCancelarRemocao");
const btnConfirmarRemocao = document.getElementById("btnConfirmarRemocao");

let indicePessoaParaRemover = null;
let naoPerguntarRemocao = false;

// ADICIONAR PESSOA

btnAdicionar.addEventListener("click", adicionarPessoa);

nomePessoa.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});

function adicionarPessoa() {

    const nome = nomePessoa.value.trim();

    if (nome === "") {
        alert("Digite o nome de uma pessoa!");
        return;
    }

    // Verifica se já existe uma pessoa com esse nome
    const nomeExiste = pessoas.some(function(pessoa) {

        return pessoa.nome.toLowerCase() === nome.toLowerCase();

    });

    if (nomeExiste) {
        alert("Já existe uma pessoa com esse nome!");
        return;
    }

    pessoas.push({
        nome: nome,
        caracteristica1: "nao-definido",
        caracteristica2: "nao-definido"
    });

    nomePessoa.value = "";

    mostrarPessoas();
    atualizarSelects();
    atualizarContador();
    salvarDados();
}

// MOSTRAR PESSOAS

function mostrarPessoas() {

    listaPessoas.innerHTML = "";

    pessoas.forEach((pessoa, indice) => {

        const div = document.createElement("div");

        div.classList.add("pessoa");

        div.innerHTML = `
            <div class="dados-pessoa">
            <span>
                <strong>${indice + 1}.</strong>
                👤 ${pessoa.nome}
            </span>

                <div class="caracteristicas">
                    <select onchange="alterarCaracteristica(${indice}, 'caracteristica1', this.value)">
                        <option value="nao-definido" ${pessoa.caracteristica1 === "nao-definido" ? "selected" : ""}>
                            Conduta: 
                        </option>

                        <option value="na" ${pessoa.caracteristica1 === "na" ? "selected" : ""}>
                            Neutro
                        </option>

                        <option value="boa" ${pessoa.caracteristica1 === "boa" ? "selected" : ""}>
                            Boa Conduta
                        </option>

                        <option value="ma" ${pessoa.caracteristica1 === "ma" ? "selected" : ""}>
                            Má Conduta
                        </option>
                    </select>

                    <select onchange="alterarCaracteristica(${indice}, 'caracteristica2', this.value)">
                        <option value="nao-definido" ${pessoa.caracteristica2 === "nao-definido" ? "selected" : ""}>
                            Aprendizagem: 
                        </option>

                        <option value="na" ${pessoa.caracteristica2 === "na" ? "selected" : ""}>
                            Neutro
                        </option>

                        <option value="habilidade" ${pessoa.caracteristica2 === "habilidade" ? "selected" : ""}>
                            Habilidade para Aprendizado
                        </option>

                        <option value="dificuldade" ${pessoa.caracteristica2 === "dificuldade" ? "selected" : ""}>
                            Dificuldade no Aprendizado
                        </option>
                    </select>
                </div>
            </div>

            <button 
                class="btn-remover"
                onclick="removerPessoa(${indice})">
                Remover
            </button>
        `;

        listaPessoas.appendChild(div);
    });
}

// REMOVER PESSOA

function removerPessoa(indice) {

    const pessoa = pessoas[indice].nome;

    if (naoPerguntarRemocao) {
        indicePessoaParaRemover = indice;
        confirmarRemocao();
        return;
    }

    indicePessoaParaRemover = indice;

    mensagemConfirmacao.textContent =
        `Tem certeza que quer remover "${pessoa}"?`;

    naoPerguntar.checked = false;

    modalConfirmacao.classList.add("ativo");
}


// ATUALIZAR SELECTS

function atualizarSelects() {

    pessoa1.innerHTML = '<option value="">Pessoa 1</option>';
    pessoa2.innerHTML = '<option value="">Pessoa 2</option>';

    pessoas.forEach((pessoa, indice) => {

        pessoa1.innerHTML += `
            <option value="${indice}">
                ${pessoa.nome}
            </option>
        `;

        pessoa2.innerHTML += `
            <option value="${indice}">
                ${pessoa.nome}
            </option>
        `;
    });
}


// ADICIONAR RESTRIÇÃO

btnAdicionarRestricao.addEventListener("click", adicionarRestricao);

function adicionarRestricao() {

    const indice1 = pessoa1.value;
    const indice2 = pessoa2.value;

    if (indice1 === "" || indice2 === "") {
        alert("Escolha as duas pessoas!");
        return;
    }

    if (indice1 === indice2) {
        alert("Escolha duas pessoas diferentes!");
        return;
    }

    const pessoaA = pessoas[indice1].nome;
    const pessoaB = pessoas[indice2].nome;

    restricoes.push({
        pessoa1: pessoaA,
        pessoa2: pessoaB
    });

    pessoa1.value = "";
    pessoa2.value = "";

    mostrarRestricoes();
}


// MOSTRAR RESTRIÇÕES

function mostrarRestricoes() {

    listaRestricoes.innerHTML = "";

    restricoes.forEach((restricao, indice) => {

        const div = document.createElement("div");

        div.classList.add("item-restricao");

        div.innerHTML = `
            🚫 ${restricao.pessoa1} não pode ficar com ${restricao.pessoa2}

            <button
                class="btn-remover"
                onclick="removerRestricao(${indice})">
                Remover
            </button>
        `;

        listaRestricoes.appendChild(div);
    });
}


// REMOVER RESTRIÇÃO

function removerRestricao(indice) {

    restricoes.splice(indice, 1);

    mostrarRestricoes();
}
// EMBARALHAR EQUIPES

const btnEmbaralhar = document.getElementById("btnEmbaralhar");
const resultado = document.getElementById("resultado");
const quantidadeEquipes = document.getElementById("quantidadeEquipes");

btnCancelarRemocao.addEventListener("click", function() {

    indicePessoaParaRemover = null;

    modalConfirmacao.classList.remove("ativo");

});


btnConfirmarRemocao.addEventListener("click", function() {

    if (naoPerguntar.checked) {
        naoPerguntarRemocao = true;
    }

    confirmarRemocao();

});

function confirmarRemocao() {

    if (indicePessoaParaRemover === null) {
        return;
    }

    const pessoaRemovida = pessoas[indicePessoaParaRemover].nome;

    // Remove a pessoa
    pessoas.splice(indicePessoaParaRemover, 1);

    // Remove as restrições relacionadas à pessoa
    restricoes = restricoes.filter(function(restricao) {

        return (
            restricao.pessoa1 !== pessoaRemovida &&
            restricao.pessoa2 !== pessoaRemovida
        );

    });

    indicePessoaParaRemover = null;

    modalConfirmacao.classList.remove("ativo");

    mostrarPessoas();
    atualizarSelects();
    mostrarRestricoes();
    atualizarContador();
    salvarDados();
}

btnEmbaralhar.addEventListener("click", embaralharEquipes);


function embaralharEquipes() {
    if (pessoas.length === 0) {
        alert("Adicione pelo menos uma pessoa!");
        return;
    }

    const numeroEquipes = Number(quantidadeEquipes.value);

    if (pessoas.length < numeroEquipes) {
        alert("Você precisa ter pelo menos uma pessoa para cada equipe!");
        return;
    }

    let pessoasEmbaralhadas = [...pessoas];

    pessoasEmbaralhadas.sort(() => Math.random() - 0.5);

    let equipes = [];

    for (let i = 0; i < numeroEquipes; i++) {
        equipes.push([]);
    }

    pessoasEmbaralhadas.forEach(pessoa => {
        let melhorEquipe = null;
        let melhorPontuacao = -Infinity;

        equipes.forEach(equipe => {
            const temRestricao = equipe.some(membro => {
                return restricoes.some(restricao => {
                    return (
                        (restricao.pessoa1 === pessoa.nome &&
                        restricao.pessoa2 === membro.nome) ||
                        (restricao.pessoa2 === pessoa.nome &&
                        restricao.pessoa1 === membro.nome)
                    );
                });
            });
            if (temRestricao) {
                return;
            }

            // Nunca deixar uma equipe passar de 7 pessoas
            if (equipe.length >= 7) {
                return;
            }

            // Uma equipe só pode chegar a 7
            // quando todas as equipes já tiverem pelo menos 6
            if (equipe.length === 6) {
                const todasComSeis = equipes.every(
                    outraEquipe => outraEquipe.length >= 6
                );

                if (!todasComSeis) {
                    return;
                }
            }

            // Evita que uma equipe fique muito maior que a menor
            const menorTamanho = Math.min(
                ...equipes.map(outraEquipe => outraEquipe.length)
            );

            if (equipe.length > menorTamanho + 1) {
                return;
            }

            const pontuacao = pontuarEquipe(equipe, pessoa);

            if (pontuacao > melhorPontuacao) {
                melhorPontuacao = pontuacao;
                melhorEquipe = equipe;
            }
        });

        melhorEquipe.push(pessoa);
    });

    equipesFormadas = equipes;
    mostrarEquipes(equipes);
}

// MOSTRAR EQUIPES

function mostrarEquipes(equipes) {

    resultado.innerHTML = "";

    const nomeTurma = document.getElementById("nomeTurma").value.trim();

    if (nomeTurma !== "") {
        const tituloTurma = document.createElement("h2");

        tituloTurma.textContent = `🏫 Turma ${nomeTurma}`;

        tituloTurma.classList.add("titulo-turma");

        resultado.appendChild(tituloTurma);
    }

    equipes.forEach((equipe, indice) => {

        const div = document.createElement("div");

        div.classList.add("equipe");

        let lista = "";

        equipe.forEach(pessoa => {

            lista += `<li>👤 ${pessoa.nome}</li>`;

        });
        div.innerHTML = `
            <h3>Equipe ${indice + 1}</h3>

            <ul>
                ${lista}
            </ul>
        `;
        resultado.appendChild(div);
    });
}

function atualizarContador() {

    const quantidade = pessoas.length;

    contadorPessoas.innerHTML = `
        Pessoas: <strong>${quantidade}</strong>/36
    `;

    contadorPessoas.classList.remove(
        "quase-completo",
        "completo",
        "excedente"
    );

    if (quantidade >= 37) {

        contadorPessoas.classList.add("excedente");

    } else if (quantidade === 36) {

        contadorPessoas.classList.add("completo");

    } else if (quantidade >= 32) {

        contadorPessoas.classList.add("quase-completo");
    }
}
// EXCLUIR TODAS AS PESSOAS

btnExcluirTudo.addEventListener("click", excluirTudo);

function excluirTudo() {

    if (pessoas.length === 0) {
        alert("Não há pessoas para excluir!");
        return;
    }

    const confirmar = confirm(
        "Tem certeza que deseja excluir todas as pessoas?"
    );

    if (!confirmar) {
        return;
    }

    pessoas = [];
    restricoes = [];

    mostrarPessoas();
    atualizarSelects();
    mostrarRestricoes();
    atualizarContador();

    resultado.innerHTML = "";
    document.getElementById("nomeTurma").value = "";
    document.getElementById("descricaoTurma").value = "";
    localStorage.removeItem("dadosEmbaralhador");
}

function alterarCaracteristica(indice, caracteristica, valor) {

    pessoas[indice][caracteristica] = valor;

    salvarDados();
}

function salvarDados() {
    const dados = {
        pessoas: pessoas,
        restricoes: restricoes,
        nomeTurma: document.getElementById("nomeTurma").value,
        descricaoTurma: document.getElementById("descricaoTurma").value
    };

    localStorage.setItem("dadosEmbaralhador", JSON.stringify(dados));
}

function pontuarEquipe(equipe, pessoa) {
    let pontuacao = 0;
    equipe.forEach(membro => {
        // Equilibrar Boa/Má Conduta
        if (
            pessoa.caracteristica1 !== "nao-definido" &&
            membro.caracteristica1 !== "nao-definido"
        ) {
            if (pessoa.caracteristica1 !== membro.caracteristica1) {
                pontuacao += 2;
            } else {
                pontuacao -= 2;
            }
        }

        // Equilibrar Dificuldade/Habilidade
        if (
            pessoa.caracteristica2 !== "nao-definido" &&
            membro.caracteristica2 !== "nao-definido"
        ) {
            if (pessoa.caracteristica2 !== membro.caracteristica2) {
                pontuacao += 2;
            } else {
                pontuacao -= 2;
            }
        }
    });
    if (equipe.length < 6) {
        pontuacao += (6 - equipe.length) * 10;
    }

    if (equipe.length >= 6) {
        pontuacao -= (equipe.length - 5) * 10;
    }
    return pontuacao;
}

function exportarEquip() {
    if (pessoas.length === 0) {
        alert("Adicione pelo menos uma pessoa antes de exportar!");
        return;
    }

    const nomeTurma = document.getElementById("nomeTurma").value.trim();
    const descricaoTurma = document.getElementById("descricaoTurma").value.trim();

    let nomeArquivo = nomeTurma || "Minha Turma";

    if (!nomeArquivo.toLowerCase().endsWith(".eqps")) {
        nomeArquivo += ".eqps";
    }

    const dados = {
        versao: 1,
        nomeTurma: nomeTurma,
        descricaoTurma: descricaoTurma,
        quantidadeEquipes: document.getElementById("quantidadeEquipes").value,
        pessoas: pessoas,
        restricoes: restricoes
    };

    const conteudo = JSON.stringify(dados, null, 2);

    const arquivo = new Blob([conteudo], {
        type: "application/json"
    });

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");
    link.href = url;
    link.download = nomeArquivo;

    link.click();

    URL.revokeObjectURL(url);
}

document.getElementById("btnExportarEquip").addEventListener("click", exportarEquip);

function carregarDados() {
    const dadosSalvos = localStorage.getItem("dadosEmbaralhador");

    if (!dadosSalvos) {
        return;
    }

    const dados = JSON.parse(dadosSalvos);

    pessoas = dados.pessoas || [];
    restricoes = dados.restricoes || [];

    document.getElementById("nomeTurma").value = dados.nomeTurma || "";
    document.getElementById("descricaoTurma").value = dados.descricaoTurma || "";

    mostrarPessoas();
    atualizarSelects();
    atualizarContador();
    mostrarRestricoes();
}
document.getElementById("btnImportarEquip").addEventListener("click", function() {
    document.getElementById("inputImportarEquip").click();
});

function importarEquip(event) {
    const arquivo = event.target.files[0];

    if (!arquivo) {
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(e) {
        const dados = JSON.parse(e.target.result);

        pessoas = dados.pessoas || [];
        restricoes = dados.restricoes || [];

        document.getElementById("nomeTurma").value = dados.nomeTurma || "";
        document.getElementById("descricaoTurma").value = dados.descricaoTurma || "";

        document.getElementById("quantidadeEquipes").value =
            dados.quantidadeEquipes || "6";

        mostrarPessoas();
        atualizarSelects();
        atualizarContador();
        mostrarRestricoes();

        salvarDados();

        alert("Lista importada com sucesso!");
    };

    leitor.readAsText(arquivo);
}

document.getElementById("inputImportarEquip").addEventListener("change", importarEquip);

document.getElementById("btnExportarExcel").addEventListener("click", exportarExcel);

function exportarExcel() {

    if (equipesFormadas.length === 0) {
        alert("Forme as equipes antes de exportar para o Excel!");
        return;
    }

    const nomeTurma = document.getElementById("nomeTurma").value.trim();

    const linhas = [];

    // Espaço inicial
    linhas.push([]);
    linhas.push(["", "", `Turma ${nomeTurma || "Sem nome"}`]);

    const descricaoTurma = document.getElementById("descricaoTurma").value.trim();

    if (descricaoTurma) {
        linhas.push(["", "", descricaoTurma]);
    } else {
        linhas.push([]);
    }

    //linhas.push([]); //Espaço entre o Nome e a Equipe 1

    equipesFormadas.forEach((equipe, indice) => {

        // Título da equipe
        linhas.push(["", "", `Equipe ${indice + 1}`]);

        // Pessoas da equipe
        equipe.forEach(pessoa => {
            linhas.push(["", "", pessoa.nome]);
        });

        // Espaço entre as equipes
        //linhas.push([]);
    });

    const planilha = XLSX.utils.aoa_to_sheet(linhas);

    // Largura da coluna
    planilha["!cols"] = [
        { wch: 16.33},
        { wch: 16.33},
        { wch: 30 }
    ];

    // Cores
    const azulTurma = "1874CD";
    const azulEquipe = "BFDDF3";

    // Título da turma
    planilha["C2"].s = {
        fill: {
            patternType: "solid",
            fgColor: { rgb: azulTurma }
        },
        font: {
            bold: true,
            color: { rgb: "FFFFFF" },
            sz: 14
        },
        alignment: {
            horizontal: "center",
            vertical: "center"
        },
        border: {
            top: { style: "medium", color: { rgb: "000000" } },
            bottom: { style: "medium", color: { rgb: "000000" } },
            left: { style: "medium", color: { rgb: "000000" } },
            right: { style: "medium", color: { rgb: "000000" } }
        }
    };

    let linhaAtual = 4;

    if (descricaoTurma) {
        planilha["C3"].s = {
            fill: {
                patternType: "solid",
                fgColor: { rgb: azulEquipe }
            },
            font: {
                bold: true,
                color: { rgb: "000000" }
            },
            alignment: {
                horizontal: "center",
                vertical: "center"
            },
            border: {
                top: { style: "medium", color: { rgb: "000000" } },
                bottom: { style: "medium", color: { rgb: "000000" } },
                left: { style: "medium", color: { rgb: "000000" } },
                right: { style: "medium", color: { rgb: "000000" } }
            }
        };
    }

    equipesFormadas.forEach((equipe, indice) => {

        // Título da equipe
        planilha[`C${linhaAtual}`].s = {
            fill: {
                patternType: "solid",
                fgColor: { rgb: azulEquipe }
            },
            font: {
                bold: true,
                color: { rgb: "000000" }
            },
            alignment: {
                horizontal: "center",
                vertical: "center"
            },
            border: {
                top: { style: "medium", color: { rgb: "000000" } },
                bottom: { style: "medium", color: { rgb: "000000" } },
                left: { style: "medium", color: { rgb: "000000" } },
                right: { style: "medium", color: { rgb: "000000" } }
            }
        };

        linhaAtual++;

        // Pessoas
        equipe.forEach(() => {

            planilha[`C${linhaAtual}`].s = {
                border: {
                    top: { style: "medium", color: { rgb: "000000" } },
                    bottom: { style: "medium", color: { rgb: "000000" } },
                    left: { style: "medium", color: { rgb: "000000" } },
                    right: { style: "medium", color: { rgb: "000000" } }
                },
                alignment: {
                    vertical: "center"
                }
            };

            linhaAtual++;
        });

        // Pula a linha vazia entre equipes
        //linhaAtual++;
    });

    // Nome do arquivo
    let nomeArquivo = nomeTurma || "Equipes";

    if (!nomeArquivo.toLowerCase().endsWith(".xlsx")) {
        nomeArquivo += ".xlsx";
    }

    const arquivoExcel = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
        arquivoExcel,
        planilha,
        "Equipes"
    );

    XLSX.writeFile(
        arquivoExcel,
        nomeArquivo
    );
}

carregarDados();

document.getElementById("nomeTurma").addEventListener("input", salvarDados);
document.getElementById("descricaoTurma").addEventListener("input", salvarDados);

const btnTema = document.getElementById("btnTema");

btnTema.addEventListener("click", function() {

    document.body.classList.toggle("modo-escuro");

    if (document.body.classList.contains("modo-escuro")) {
        btnTema.textContent = "☀️";
    } else {
        btnTema.textContent = "🌙";
    }

});