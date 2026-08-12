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

const API_CURSOS_URL = `${API_URL}/api/curso`;
const CURSOS_POR_PAGINA = 16;
 
// Chave usada no localStorage para guardar o id do usuário logado.
// Deve ser a mesma chave salva no login.js.
const CHAVE_ID_USUARIO_LOCALSTORAGE = "usuarioId";
 
let todosCursos = [];
let cursosFiltrados = [];
let paginaAtual = 1;
 
const cursosGrid = document.querySelector(".courses-grid");
const paginacaoNav = document.querySelector("#courses-pagination");
 
/**
 * Lê o id do usuário logado a partir do localStorage.
 * Retorna null se não houver usuário logado (ex: visitante).
 */
function obterIdUsuarioLogado() {
    return localStorage.getItem(CHAVE_ID_USUARIO_LOCALSTORAGE);
}
 
/**
 * Busca todos os cursos na API e inicia a primeira renderização.
 * Envia o id_usuario logado (se houver) para que o back-end calcule
 * progresso e status de matrícula de cada curso para esse usuário.
 */
async function buscarTodosCursos() {
    try {
        const idUsuario = obterIdUsuarioLogado();
        const url = idUsuario
            ? `${API_CURSOS_URL}?id_usuario=${encodeURIComponent(idUsuario)}`
            : API_CURSOS_URL;
 
        const resposta = await fetch(url);
 
        if (!resposta.ok) {
            throw new Error(`Erro ${resposta.status} ao buscar cursos`);
        }
 
        todosCursos = await resposta.json();
        atualizarListagem();
    } catch (erro) {
        console.error("Falha ao carregar cursos:", erro);
        if (cursosGrid) {
            cursosGrid.replaceChildren();
            const mensagem = document.createElement("p");
            mensagem.className = "courses-feedback";
            mensagem.textContent = "Não foi possível carregar os cursos. Tente novamente mais tarde.";
            cursosGrid.appendChild(mensagem);
        }
    }
}
 
/**
 * Função central: aplica busca + filtros sobre "todosCursos", guarda o
 * resultado em "cursosFiltrados" e renderiza a página atual.
 * É chamada sempre que a busca ou um filtro mudam (busca e filtros
 * ficam definidos em buscarCursos.js e filtrarCursos.js).
 */
function atualizarListagem() {
    let resultado = [...todosCursos];
 
    if (typeof aplicarBusca === "function") {
        resultado = aplicarBusca(resultado);
    }
 
    if (typeof aplicarFiltroCategoria === "function") {
        resultado = aplicarFiltroCategoria(resultado);
    }
 
    if (typeof aplicarFiltroStatusMatricula === "function") {
        resultado = aplicarFiltroStatusMatricula(resultado);
    }
 
    cursosFiltrados = resultado;
 
    const totalPaginas = Math.max(1, Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA));
    if (paginaAtual > totalPaginas) paginaAtual = totalPaginas;
 
    renderizarCursos();
    renderizarPaginacao();
}
 
/**
 * Renderiza apenas os cursos da página atual (16 por vez).
 */
function renderizarCursos() {
    if (!cursosGrid) return;
 
    cursosGrid.replaceChildren();
 
    if (cursosFiltrados.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "courses-feedback";
        mensagem.textContent = "Nenhum curso encontrado.";
        cursosGrid.appendChild(mensagem);
        return;
    }
 
    const inicio = (paginaAtual - 1) * CURSOS_POR_PAGINA;
    const fim = inicio + CURSOS_POR_PAGINA;
    const cursosDaPagina = cursosFiltrados.slice(inicio, fim);
 
    const fragmento = document.createDocumentFragment();
    cursosDaPagina.forEach(curso => fragmento.appendChild(criarCardCurso(curso)));
    cursosGrid.appendChild(fragmento);
}
 
function criarCardCurso(curso) {
    const cursoId = curso.id_curso ?? curso.id;
 
    const artigo = document.createElement("article");
    artigo.className = "course-cards";
    artigo.dataset.id = cursoId;
    if (curso.statusMatricula) artigo.dataset.statusMatricula = curso.statusMatricula;
 
    // --- Thumbnail ---
    const thumbWrapper = document.createElement("div");
    thumbWrapper.className = "card-thumb-wrapper";
 
    const thumbImg = document.createElement("img");
    thumbImg.src = curso.imagem || "../assets/FundoPadrão.png";
    thumbImg.alt = "";
    thumbImg.className = "course-thumb";
    thumbImg.setAttribute("aria-hidden", "true");
 
    thumbWrapper.appendChild(thumbImg);
    artigo.appendChild(thumbWrapper);
 
    // --- Conteúdo ---
    const conteudo = document.createElement("div");
    conteudo.className = "course-content";
 
    // Categoria — a entidade real manda esse campo, mas o template
    // enviado não tinha um lugar pra ele. Adicionei uma tag simples
    // acima do título (estilize via .course-category-tag no CSS).
    if (curso.categoria) {
        const tagCategoria = document.createElement("span");
        tagCategoria.className = "course-category-tag";
        tagCategoria.textContent = curso.categoria;
        conteudo.appendChild(tagCategoria);
    }
 
    // Título
    const titulo = document.createElement("h2");
    titulo.className = "course-title";
 
    const link = document.createElement("a");
    link.href = `videoAula.html?id=${encodeURIComponent(cursoId)}`;
    link.className = "card-link";
    link.textContent = curso.nome ?? "";
 
    titulo.appendChild(link);
    conteudo.appendChild(titulo);
 
    // Progresso — a entidade "curso" atual NÃO tem esse campo (progresso
    // é por matrícula do usuário, não do curso). Só renderiza a barra se
    // curso.progresso vier preenchido (ex: depois de cruzar com a matrícula).
    if (curso.progresso !== undefined && curso.progresso !== null) {
        const progressoContainer = document.createElement("div");
        progressoContainer.className = "progress-container";
 
        const progressoValor = Math.min(100, Math.max(0, Number(curso.progresso) || 0));
        const progressoId = `progress-${cursoId}`;
 
        const label = document.createElement("label");
        label.className = "sr-only";
        label.setAttribute("for", progressoId);
        label.textContent = `Progresso do curso: ${progressoValor}% concluído`;
 
        const progress = document.createElement("progress");
        progress.id = progressoId;
        progress.max = 100;
        progress.value = progressoValor;
        progress.className = "course-progress-bar";
        progress.textContent = `${progressoValor}%`;
 
        progressoContainer.appendChild(label);
        progressoContainer.appendChild(progress);
        conteudo.appendChild(progressoContainer);
    }
 
    // Instrutor — idem: a API atual não manda instrutorNome/instrutorFoto.
    // Só renderiza o rodapé se esses dados existirem.
    if (curso.instrutorNome) {
        const rodape = document.createElement("footer");
        rodape.className = "course-footer";
 
        const authorInfo = document.createElement("div");
        authorInfo.className = "author-info";
 
        const avatar = document.createElement("img");
        avatar.src = curso.instrutorFoto || "../assets/User.png";
        avatar.alt = `Foto do instrutor ${curso.instrutorNome}`;
        avatar.className = "author-avatar";
 
        const nomeInstrutor = document.createElement("span");
        nomeInstrutor.className = "author-name";
        nomeInstrutor.textContent = curso.instrutorNome;
 
        authorInfo.appendChild(avatar);
        authorInfo.appendChild(nomeInstrutor);
        rodape.appendChild(authorInfo);
        conteudo.appendChild(rodape);
    }
 
    artigo.appendChild(conteudo);
 
    return artigo;
}
 
/**
 * Renderiza os botões de paginação com base no total de cursos filtrados.
 */
function renderizarPaginacao() {
    if (!paginacaoNav) return;
 
    paginacaoNav.replaceChildren();
 
    const totalPaginas = Math.ceil(cursosFiltrados.length / CURSOS_POR_PAGINA);
    if (totalPaginas <= 1) return;
 
    const botaoAnterior = document.createElement("button");
    botaoAnterior.type = "button";
    botaoAnterior.textContent = "Anterior";
    botaoAnterior.disabled = paginaAtual === 1;
    botaoAnterior.setAttribute("aria-label", "Página anterior");
    botaoAnterior.addEventListener("click", () => irParaPagina(paginaAtual - 1));
    paginacaoNav.appendChild(botaoAnterior);
 
    for (let numero = 1; numero <= totalPaginas; numero++) {
        const botaoPagina = document.createElement("button");
        botaoPagina.type = "button";
        botaoPagina.textContent = String(numero);
        botaoPagina.setAttribute("aria-label", `Ir para página ${numero}`);
 
        if (numero === paginaAtual) {
            botaoPagina.classList.add("active-page");
            botaoPagina.setAttribute("aria-current", "page");
        }
 
        botaoPagina.addEventListener("click", () => irParaPagina(numero));
        paginacaoNav.appendChild(botaoPagina);
    }
 
    const botaoProximo = document.createElement("button");
    botaoProximo.type = "button";
    botaoProximo.textContent = "Próximo";
    botaoProximo.disabled = paginaAtual === totalPaginas;
    botaoProximo.setAttribute("aria-label", "Próxima página");
    botaoProximo.addEventListener("click", () => irParaPagina(paginaAtual + 1));
    paginacaoNav.appendChild(botaoProximo);
}
 
/**
 * Muda a página atual e re-renderiza (sem recalcular busca/filtros).
 */
function irParaPagina(numeroPagina) {
    paginaAtual = numeroPagina;
    renderizarCursos();
    renderizarPaginacao();
    cursosGrid?.scrollIntoView({ behavior: "smooth", block: "start" });
}

document.addEventListener("DOMContentLoaded", 
    carregarUsuario);

document.addEventListener("DOMContentLoaded", 
    buscarTodosCursos);