const API_URL = "http://localhost:3001";
const API_BASE_URL = API_URL;

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

const ICONE_ESTRELA_VAZIA = `<svg viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.74157 5.32632L10.0974 0.938158C10.3371 0.615351 10.6217 0.378289 10.9513 0.226974C11.2809 0.0756579 11.6255 0 11.985 0C12.3446 0 12.6891 0.0756579 13.0187 0.226974C13.3483 0.378289 13.633 0.615351 13.8727 0.938158L17.2285 5.32632L22.3221 7.05132C22.8414 7.21272 23.2509 7.51031 23.5506 7.94408C23.8502 8.37785 24 8.85702 24 9.38158C24 9.62368 23.965 9.86579 23.8951 10.1079C23.8252 10.35 23.7104 10.582 23.5506 10.8039L20.2547 15.525L20.3745 20.4882C20.3945 21.1943 20.1648 21.7895 19.6854 22.2737C19.206 22.7579 18.6467 23 18.0075 23C17.9675 23 17.7478 22.9697 17.3483 22.9092L11.985 21.3961L6.62172 22.9092C6.52185 22.9496 6.41199 22.9748 6.29213 22.9849C6.17228 22.995 6.06242 23 5.96255 23C5.32335 23 4.76404 22.7579 4.28464 22.2737C3.80524 21.7895 3.57553 21.1943 3.59551 20.4882L3.71536 15.4947L0.449438 10.8039C0.289638 10.582 0.174782 10.35 0.104869 10.1079C0.0349563 9.86579 0 9.62368 0 9.38158C0 8.87719 0.144819 8.40811 0.434457 7.97434C0.724095 7.54057 1.12859 7.23289 1.64794 7.05132L6.74157 5.32632Z" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>`;

const ICONE_ESTRELA_PREENCHIDA = `<svg viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M6.74157 5.32632L10.0974 0.938158C10.3371 0.615351 10.6217 0.378289 10.9513 0.226974C11.2809 0.0756579 11.6255 0 11.985 0C12.3446 0 12.6891 0.0756579 13.0187 0.226974C13.3483 0.378289 13.633 0.615351 13.8727 0.938158L17.2285 5.32632L22.3221 7.05132C22.8414 7.21272 23.2509 7.51031 23.5506 7.94408C23.8502 8.37785 24 8.85702 24 9.38158C24 9.62368 23.965 9.86579 23.8951 10.1079C23.8252 10.35 23.7104 10.582 23.5506 10.8039L20.2547 15.525L20.3745 20.4882C20.3945 21.1943 20.1648 21.7895 19.6854 22.2737C19.206 22.7579 18.6467 23 18.0075 23C17.9675 23 17.7478 22.9697 17.3483 22.9092L11.985 21.3961L6.62172 22.9092C6.52185 22.9496 6.41198 22.9748 6.29213 22.9849C6.17228 22.995 6.06242 23 5.96255 23C5.32335 23 4.76404 22.7579 4.28464 22.2737C3.80524 21.7895 3.57553 21.1943 3.59551 20.4882L3.71536 15.4947L0.449438 10.8039C0.289638 10.582 0.174782 10.35 0.104869 10.1079C0.0349563 9.86579 0 9.62368 0 9.38158C0 8.87719 0.144819 8.40811 0.434457 7.97434C0.724095 7.54057 1.12859 7.23289 1.64794 7.05132L6.74157 5.32632Z" fill="currentColor"/></svg>`;

const TOTAL_ESTRELAS = 5;
let notaSelecionada = 0;

function criarArrayDeEstrelas(quantidade) {
    return Array.from({ length: TOTAL_ESTRELAS }, (_, indice) => indice < quantidade);
}

function converterArrayEmNota(arrayEstrelas) {
    return arrayEstrelas.filter(Boolean).length;
}

function renderizarEstrelas(quantidade) {
    const arrayEstrelas = criarArrayDeEstrelas(quantidade);
    const botoes = document.querySelectorAll("#star-rating .star-btn");

    botoes.forEach((botao, indice) => {
        const preenchida = arrayEstrelas[indice];
        botao.classList.toggle("filled", preenchida);
        botao.setAttribute("aria-pressed", preenchida ? "true" : "false");
        botao.innerHTML = preenchida ? ICONE_ESTRELA_PREENCHIDA : ICONE_ESTRELA_VAZIA;
    });

    const resultado = document.getElementById("rating-result");
    if (resultado) {
        resultado.textContent = quantidade > 0 ? `${quantidade} de 5 estrelas` : "";
    }
}

function configurarSeletorDeEstrelas() {
    const container = document.getElementById("star-rating");
    if (!container) return;

    const botoes = container.querySelectorAll(".star-btn");

    botoes.forEach((botao) => {
        const valor = Number(botao.dataset.value);

        botao.addEventListener("click", () => {
            notaSelecionada = valor;
            renderizarEstrelas(notaSelecionada);
        });

        botao.addEventListener("mouseenter", () => renderizarEstrelas(valor));
    });

    container.addEventListener("mouseleave", () => renderizarEstrelas(notaSelecionada));

    renderizarEstrelas(0);
}

function obterEstrelasSelecionadas() {
    return notaSelecionada > 0 ? notaSelecionada : null;
}

document.addEventListener("DOMContentLoaded", () => {
    const idCurso = obterIdCursoDaUrl();

    if (!idCurso) {
        console.error("id do curso não encontrado na URL (ex: videoAula.html?id=123).");
        return;
    }

    carregarDadosDoCurso(idCurso);
    carregarAvaliacoes(idCurso);
    configurarSeletorDeEstrelas();
    configurarEnvioDeAvaliacao(idCurso);
    carregarCursosRelacionados(idCurso);
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
        const resposta = await fetch(`${API_URL}/api/curso/${idCurso}`);
        const response = await fetch(`${API_URL}/api/curso/instrutor/${idCurso}`);
        const instrutor = await response.json();

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao buscar curso`);
        }

        const curso = await resposta.json();

        if (!curso) {
            console.error("Curso não encontrado para o id informado na URL.");
            return;
        }

        preencherTitulo(curso.nome);
        preencherInstrutor(instrutor.nome);
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
        const resposta = await fetch(`${API_URL}/api/avaliacao-curso?id_curso=${idCurso}`);

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
                headers: {
                    "Content-Type": "application/json"
                },
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
            notaSelecionada = 0;
            renderizarEstrelas(0);
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

async function carregarCursosRelacionados(idCursoAtual) {
    const lista = document.querySelector(".related-list");
    if (!lista) return;

    const idAtual = Number(idCursoAtual);

    try {
        const resposta = await fetch(`${API_URL}/api/curso`);

        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao buscar cursos`);
        }

        const cursos = await resposta.json();
        const relacionados = cursos.filter(curso => Number(curso.id_curso) !== idAtual);

        lista.replaceChildren();

        if (relacionados.length === 0) {
            const itemVazio = document.createElement("li");
            itemVazio.textContent = "Nenhum outro curso disponível no momento.";
            lista.appendChild(itemVazio);
            return;
        }

        const fragmento = document.createDocumentFragment();
        relacionados.forEach(curso => fragmento.appendChild(criarCardRelacionado(curso)));
        lista.appendChild(fragmento);
    } catch (erro) {
        console.error("Falha ao carregar cursos relacionados:", erro);
    }
}

function criarCardRelacionado(curso) {
    const item = document.createElement("li");

    const link = document.createElement("a");
    link.href = `videoAula.html?id=${encodeURIComponent(curso.id_curso)}`;
    link.className = "related-card";

    const thumb = document.createElement("img");
    thumb.src = curso.imagem || "../assets/FundoPadrão.png";
    thumb.alt = "";
    thumb.className = "related-thumb";
    thumb.setAttribute("aria-hidden", "true");

    const detalhes = document.createElement("div");
    detalhes.className = "related-details";

    const titulo = document.createElement("h3");
    titulo.textContent = curso.nome ?? "";

    const categoria = document.createElement("p");
    categoria.className = "course-category";
    categoria.textContent = curso.categoria ?? "";

    detalhes.appendChild(titulo);
    detalhes.appendChild(categoria);

    link.appendChild(thumb);
    link.appendChild(detalhes);
    item.appendChild(link);

    return item;
}