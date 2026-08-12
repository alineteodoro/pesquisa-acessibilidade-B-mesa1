const API_URL = "http://localhost:3001";

async function carregarUsuario() {
    const usuarioId = localStorage.getItem("usuarioId");

    const elementoNome = document.getElementById("user-name");

    if (!elementoNome) {
        console.error('Elemento "#user-name" não encontrado.');
        return;
    }

    if (!usuarioId) {
        console.warn("Nenhum usuário encontrado na sessão.");
        elementoNome.textContent = "Usuário!";
        return;
    }

    try {
        const url = `${API_URL}/api/auth/${usuarioId}`;

        const response = await fetch(url);

        const texto = await response.text();

        if (!response.ok) {
            throw new Error(
                `Backend retornou HTTP ${response.status}: ${texto}`
            );
        }

        const usuario = JSON.parse(texto);

        elementoNome.textContent = usuario.nome + '!';

    } catch (error) {
        console.error(
            "Erro ao carregar usuário:",
            error
        );

        elementoNome.textContent = "Usuário";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarUsuario();
    const buttonSobre = document.getElementById("tab-sobre")
    const buttonAvaliacoes = document.getElementById("tab-avaliacoes")
    const panelSobre = document.getElementById("panel-sobre")
    const panelAvaliacoes = document.getElementById("panel-avaliacoes")

    if (!buttonSobre || !buttonAvaliacoes || !panelSobre || !panelAvaliacoes) {
        return
    }

    const activateTab = (buttonToActivate, panelToShow, panelToHide) => {
        buttonSobre.setAttribute("aria-selected", buttonSobre === buttonToActivate ? "true" : "false")
        buttonAvaliacoes.setAttribute("aria-selected", buttonAvaliacoes === buttonToActivate ? "true" : "false")

        panelToShow.removeAttribute("hidden")
        panelToHide.setAttribute("hidden", "")

        buttonSobre.removeAttribute("data-animate")
        buttonAvaliacoes.removeAttribute("data-animate")
        buttonToActivate.setAttribute("data-animate", "true")

        window.requestAnimationFrame(() => {
            buttonToActivate.removeAttribute("data-animate")
        })
    }

    buttonAvaliacoes.addEventListener("click", () => {
        activateTab(buttonAvaliacoes, panelAvaliacoes, panelSobre)
    })

    buttonSobre.addEventListener("click", () => {
        activateTab(buttonSobre, panelSobre, panelAvaliacoes)
    })
})

const CHAVE_ID_USUARIO_LOCALSTORAGE = "usuarioId";

document.addEventListener("DOMContentLoaded", () => {
    const idCurso = obterIdCursoDaUrl();

    if (!idCurso) {
        console.error("id do curso não encontrado na URL (ex: videoAula.html?id=123).");
        return;
    }

    carregarDadosDoCurso(idCurso);
    carregarAvaliacoes(idCurso);
    configurarEnvioDeAvaliacao(idCurso);
});

function obterIdCursoDaUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    return id ? Number(id) : null;
}

function obterIdUsuarioLogado() {
    const valor = localStorage.getItem(CHAVE_ID_USUARIO_LOCALSTORAGE);
    return valor ? Number(valor) : null;
}

async function carregarDadosDoCurso(idCurso) {
    try {
        const resposta = await fetch(`${API_BASE_URL}/api/curso/${idCurso}`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao buscar curso`);
        }

        const curso = await resposta.json();

        if (!curso) {
            console.error("Curso não encontrado para o id informado na URL.");
            return;
        }

        preencherTitulo(curso.nome);
        preencherVideo(curso.videoUrl);
        preencherInstrutor(curso.instrutorNome, curso.instrutorFoto);
        preencherResumoAvaliacao(curso.mediaEstrelas, curso.totalAvaliacoes);
        preencherDescricao(curso.descricao);
    } catch (erro) {
        console.error("Falha ao carregar dados do curso:", erro);
    }
}

function preencherTitulo(nome) {
    const titulo = document.querySelector(".main-course-title");
    if (titulo) titulo.textContent = nome ?? "";
}

function preencherVideo(videoUrl) {
    const video = document.querySelector(".custom-video-container video");
    const source = video?.querySelector("source");

    if (!video || !source) return;

    if (videoUrl) {
        source.src = videoUrl;
        video.load();
    } else {
        console.warn("Este curso ainda não tem vídeo cadastrado (nenhum conteudo do tipo 'video' encontrado).");
    }
}

function preencherInstrutor(nome, foto) {
    const avatar = document.querySelector(".instructor-avatar");
    const nomeSpan = document.querySelector(".instructor-name");

    if (avatar) {
        avatar.src = foto || "../assets/User.png";
        avatar.alt = nome ? `Foto de perfil do instrutor ${nome}` : "";
    }

    if (nomeSpan) {
        nomeSpan.textContent = nome ?? "Instrutor não informado";
    }
}

function preencherResumoAvaliacao(mediaEstrelas, totalAvaliacoes) {
    const badge = document.querySelector(".rating-badge");
    if (!badge) return;

    const estrelasSpan = badge.querySelector("span[aria-hidden='true']");
    const contagemSpan = badge.querySelector(".rating-count");

    const mediaFormatada = mediaEstrelas != null ? Number(mediaEstrelas).toFixed(1) : "—";
    const total = totalAvaliacoes ?? 0;

    if (estrelasSpan) estrelasSpan.textContent = `★ ${mediaFormatada}`;
    if (contagemSpan) contagemSpan.textContent = `${total} avaliações`;

    badge.setAttribute(
        "aria-label",
        `Classificação ${mediaFormatada} de 5 estrelas baseada em ${total} avaliações`
    );
}

function preencherDescricao(descricao) {
    const painelSobre = document.getElementById("panel-sobre");
    if (!painelSobre) return;

    painelSobre.querySelectorAll(":scope > p").forEach(paragrafo => paragrafo.remove());

    const novoParagrafo = document.createElement("p");
    novoParagrafo.textContent = descricao ?? "";
    painelSobre.insertBefore(novoParagrafo, painelSobre.firstChild);
}

async function carregarAvaliacoes(idCurso) {
    const lista = document.querySelector(".comments-list");
    if (!lista) return;

    try {
        const resposta = await fetch(`${API_BASE_URL}/api/avaliacao-curso?id_curso=${idCurso}`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao buscar avaliações`);
        }

        const avaliacoes = await resposta.json();
        lista.replaceChildren();

        if (avaliacoes.length === 0) {
            const itemVazio = document.createElement("li");
            itemVazio.className = "comment-item";
            itemVazio.textContent = "Ainda não há avaliações para este curso.";
            lista.appendChild(itemVazio);
            return;
        }

        const fragmento = document.createDocumentFragment();
        avaliacoes.forEach(avaliacao => fragmento.appendChild(criarItemDeAvaliacao(avaliacao)));
        lista.appendChild(fragmento);
    } catch (erro) {
        console.error("Falha ao carregar avaliações:", erro);
    }
}

function criarItemDeAvaliacao(avaliacao) {
    const item = document.createElement("li");
    item.className = "comment-item";

    const avatar = document.createElement("img");
    avatar.src = avaliacao.alunoFoto || "../assets/User.png";
    avatar.alt = avaliacao.alunoNome ? `Foto de ${avaliacao.alunoNome}` : "";
    avatar.className = "comment-avatar";

    const corpo = document.createElement("div");
    corpo.className = "comment-body";

    const cabecalho = document.createElement("div");
    cabecalho.className = "comment-header";

    const nomeSpan = document.createElement("span");
    nomeSpan.className = "comment-author";
    nomeSpan.textContent = avaliacao.alunoNome ?? "";

    const estrelasSpan = document.createElement("span");
    estrelasSpan.className = "comment-rating";
    estrelasSpan.setAttribute("aria-label", `Avaliação ${avaliacao.estrelas} de 5 estrelas`);

    const iconeEstrela = document.createElement("span");
    iconeEstrela.setAttribute("aria-hidden", "true");
    iconeEstrela.textContent = "★";

    estrelasSpan.appendChild(iconeEstrela);
    estrelasSpan.append(` ${avaliacao.estrelas}`);

    cabecalho.appendChild(nomeSpan);
    cabecalho.appendChild(estrelasSpan);

    const textoParagrafo = document.createElement("p");
    textoParagrafo.className = "comment-text";
    textoParagrafo.textContent = avaliacao.comentario ?? "";

    corpo.appendChild(cabecalho);
    corpo.appendChild(textoParagrafo);

    item.appendChild(avatar);
    item.appendChild(corpo);

    return item;
}

function configurarEnvioDeAvaliacao(idCurso) {
    const form = document.querySelector(".comment-form");
    const textarea = document.getElementById("comment-input");

    if (!form || !textarea) return;

    form.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const idUsuario = obterIdUsuarioLogado();
        if (!idUsuario) {
            alert("Você precisa estar logado para avaliar este curso.");
            return;
        }

        const comentario = textarea.value.trim();
        if (!comentario) {
            textarea.focus();
            return;
        }

        const estrelas = obterEstrelasSelecionadas(form);
        if (!estrelas) {
            alert("Selecione uma quantidade de estrelas antes de enviar.");
            return;
        }

        try {
            const idMatricula = await buscarIdMatricula(idUsuario, idCurso);

            if (!idMatricula) {
                alert("Você precisa estar matriculado neste curso para avaliar.");
                return;
            }

            const resposta = await fetch(`${API_BASE_URL}/api/avaliacao-curso`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_matricula: idMatricula,
                    comentario,
                    dt_avaliacao: new Date().toISOString(),
                    nota: estrelas,
                    estrelas: estrelas,
                }),
            });

            if (!resposta.ok) {
                throw new Error(`Erro ${resposta.status} ao enviar avaliação`);
            }

            form.reset();
            await carregarAvaliacoes(idCurso);
            await carregarDadosDoCurso(idCurso);
        } catch (erro) {
            console.error("Falha ao enviar avaliação:", erro);
            alert("Não foi possível enviar sua avaliação. Tente novamente.");
        }
    });
}

function obterEstrelasSelecionadas(form) {
    const selecionado = form.querySelector('input[name="estrelas"]:checked');
    return selecionado ? Number(selecionado.value) : null;
}

async function buscarIdMatricula(idUsuario, idCurso) {
    const resposta = await fetch(
        `${API_BASE_URL}/api/matricula?id_aluno=${idUsuario}&id_curso=${idCurso}`
    );

    if (!resposta.ok) {
        throw new Error(`Erro ${resposta.status} ao buscar matrícula`);
    }

    const matriculas = await resposta.json();
    return matriculas[0]?.id_matricula ?? null;
}