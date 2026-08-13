// ============================================================
// meusCursos.js - Arquivo único para a página Meus Cursos
// ============================================================

// ============================================================
// 1. CONFIGURAÇÕES E VARIÁVEIS GLOBAIS
// ============================================================

const API_URL = "http://localhost:3001/api/auth";
const API_MEUS_CURSOS = "http://localhost:3001/api/matricula";

let meusCursos = [];
let paginaAtual = 1;
const CURSOS_POR_PAGINA = 6;
let termoBuscaAtual = "";
let statusSelecionado = "todos";
let categoriaAtiva = "Todos";

// ============================================================
// 2. CARREGAR DADOS DO USUÁRIO
// ============================================================

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
        const url = `${API_URL}/${usuarioId}`;
        const response = await fetch(url);
        const texto = await response.text();

        if (!response.ok) {
            throw new Error(`Backend retornou HTTP ${response.status}: ${texto}`);
        }

        const usuario = JSON.parse(texto);
        elementoNome.textContent = usuario.nome + '!';

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        elementoNome.textContent = "Usuário";
    }
}

// ============================================================
// 3. CARREGAR CURSOS DO USUÁRIO
// ============================================================

async function carregarMeusCursos() {
    const usuarioId = localStorage.getItem("usuarioId");

    if (!usuarioId) {
        console.warn("Nenhum usuário encontrado.");
        meusCursos = [];
        return [];
    }

    try {
        const response = await fetch(
            `${API_MEUS_CURSOS}?id_aluno=${encodeURIComponent(usuarioId)}`
        );

        if (!response.ok) {
            throw new Error("Erro ao buscar os cursos do usuário.");
        }

        meusCursos = await response.json();
        return meusCursos;

    } catch (error) {
        console.error("Erro ao carregar meus cursos:", error);
        meusCursos = [];
        return [];
    }
}

// ============================================================
// 4. FILTROS
// ============================================================

// --- Filtro por Status ---

function aplicarFiltroStatus(cursos) {
    if (statusSelecionado === "todos") return cursos;
    
    return cursos.filter(curso => {
        if (statusSelecionado === "concluidos") {
            return curso.status === "concluido";
        } else if (statusSelecionado === "andamento") {
            return curso.status === "ativo";
        }
        return true;
    });
}

function filtrarPorStatus(status) {
    statusSelecionado = status;
    
    const botoesStatus = document.querySelectorAll('.filter-group:first-child button');
    botoesStatus.forEach(botao => {
        const texto = botao.textContent.trim();
        let valor = "todos";
        if (texto === "Concluídos") valor = "concluidos";
        else if (texto === "Em andamento") valor = "andamento";
        
        if (valor === status) {
            botao.classList.add("selected");
        } else {
            botao.classList.remove("selected");
        }
    });
    
    paginaAtual = 1;
    atualizarListagem();
}

// --- Filtro por Categoria ---

function aplicarFiltroCategoria(cursos) {
    if (categoriaAtiva === "Todos") return cursos;
    return cursos.filter(curso => curso.categoria === categoriaAtiva);
}

function filtrarPorCategoria(categoria) {
    categoriaAtiva = categoria;
    
    const botoesCategoria = document.querySelectorAll('.filter-group:last-child button');
    botoesCategoria.forEach(botao => {
        if (botao.textContent.trim() === categoria) {
            botao.classList.add("selected");
        } else {
            botao.classList.remove("selected");
        }
    });
    
    paginaAtual = 1;
    atualizarListagem();
}

// --- Filtro por Busca ---

function buscarPorTermo(cursos, termo) {
    if (!termo || termo.trim() === "") return cursos;
    
    const termoLower = termo.toLowerCase().trim();
    
    return cursos.filter(curso => {
        const titulo = (curso.titulo || "").toLowerCase();
        const descricao = (curso.descricao || "").toLowerCase();
        const categoria = (curso.categoria || "").toLowerCase();
        const autor = (curso.autor || "").toLowerCase();
        
        return titulo.includes(termoLower) || 
               descricao.includes(termoLower) || 
               categoria.includes(termoLower) ||
               autor.includes(termoLower);
    });
}

// ============================================================
// 5. RENDERIZAÇÃO
// ============================================================

function criarCardCurso(curso) {
    const card = document.createElement("a");
    card.className = "course-card";
    card.href = `videoAula.html?id=${curso.id}`;
    card.setAttribute("aria-labelledby", `course-title-${curso.id}`);
    card.setAttribute("aria-describedby", `course-desc-${curso.id} course-progress-${curso.id}`);
    
    const imagem = document.createElement("img");
    imagem.src = curso.imagem || "../assets/FundoPadrão.png";
    imagem.alt = `Imagem do curso ${curso.titulo}`;
    imagem.className = "course-image";
    
    const infoDiv = document.createElement("div");
    infoDiv.className = "course-info";
    
    const titulo = document.createElement("h2");
    titulo.id = `course-title-${curso.id}`;
    titulo.textContent = curso.titulo || "Curso sem título";
    
    const progresso = document.createElement("progress");
    progresso.id = `course-progress-${curso.id}`;
    progresso.value = curso.progresso || 0;
    progresso.max = 100;
    progresso.textContent = `${curso.progresso || 0}%`;
    
    const descDiv = document.createElement("div");
    descDiv.className = "course-desc";
    
    const desc = document.createElement("p");
    desc.id = `course-desc-${curso.id}`;
    desc.textContent = curso.categoria || "Geral";
    
    const autor = document.createElement("p");
    autor.id = `course-autor-${curso.id}`;
    autor.textContent = curso.autor || "Autor desconhecido";
    
    descDiv.appendChild(desc);
    descDiv.appendChild(autor);
    infoDiv.appendChild(titulo);
    infoDiv.appendChild(progresso);
    infoDiv.appendChild(descDiv);
    card.appendChild(imagem);
    card.appendChild(infoDiv);
    
    return card;
}

function criarMensagemVazia() {
    const container = document.createElement("div");
    container.className = "mensagem-vazia";
    
    // Ícone SVG (sem innerHTML)
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "80");
    svg.setAttribute("height", "80");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "2");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.className = "mensagem-icone";
    svg.setAttribute("aria-hidden", "true");
    
    const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path1.setAttribute("d", "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z");
    const path2 = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path2.setAttribute("d", "M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z");
    
    svg.appendChild(path1);
    svg.appendChild(path2);
    
    // Título
    const titulo = document.createElement("h2");
    titulo.className = "mensagem-titulo";
    titulo.textContent = "Nenhum curso matriculado";
    
    // Descrição
    const descricao = document.createElement("p");
    descricao.className = "mensagem-descricao";
    descricao.textContent = "Você ainda não está matriculado em nenhum curso. Explore nossos cursos e comece sua jornada de aprendizado!";
    
    // Botão para explorar cursos
    const botao = document.createElement("a");
    botao.className = "mensagem-botao";
    botao.href = "cursos.html";
    botao.textContent = "Explorar cursos";
    
    // Monta a estrutura
    container.appendChild(svg);
    container.appendChild(titulo);
    container.appendChild(descricao);
    container.appendChild(botao);
    
    return container;
}

function limparListagem() {
    const main = document.querySelector("main");
    if (!main) return;
    
    const cards = main.querySelectorAll(".course-card");
    cards.forEach(card => card.remove());
    
    const mensagem = main.querySelector(".mensagem-vazia");
    if (mensagem) mensagem.remove();
}

function renderizarCursos() {
    
    const main = document.querySelector("main");
    if (!main) {
        console.error("❌ Elemento main não encontrado!");
        return;
    }
    
    // Limpa a listagem atual
    limparListagem();
    
    // Se não houver cursos, mostra mensagem
    if (meusCursos.length === 0) {
        const mensagemVazia = criarMensagemVazia();
        main.appendChild(mensagemVazia);
        return;
    }
    
    // Aplica os filtros
    let cursosFiltrados = [...meusCursos];
    
    // Filtro por busca
    if (termoBuscaAtual && termoBuscaAtual.trim() !== "") {
        cursosFiltrados = buscarPorTermo(cursosFiltrados, termoBuscaAtual);
    }
    
    // Filtro por status
    cursosFiltrados = aplicarFiltroStatus(cursosFiltrados);
    
    // Filtro por categoria
    cursosFiltrados = aplicarFiltroCategoria(cursosFiltrados);

    
    // Se após os filtros não houver cursos
    if (cursosFiltrados.length === 0) {
        const mensagemVazia = criarMensagemVazia();
        
        // Personaliza a mensagem se foi uma busca
        if (termoBuscaAtual && termoBuscaAtual.trim() !== "") {
            const titulo = mensagemVazia.querySelector(".mensagem-titulo");
            const descricao = mensagemVazia.querySelector(".mensagem-descricao");
            const botao = mensagemVazia.querySelector(".mensagem-botao");
            
            if (titulo) titulo.textContent = "Nenhum curso encontrado";
            if (descricao) descricao.textContent = `Não encontramos cursos com o termo "${termoBuscaAtual}". Tente buscar por outro termo.`;
            if (botao) botao.style.display = "none";
            mensagemVazia.classList.add("busca-vazia");
        }
        
        main.appendChild(mensagemVazia);
        return;
    }
    
    // Paginação
    const inicio = (paginaAtual - 1) * CURSOS_POR_PAGINA;
    const fim = inicio + CURSOS_POR_PAGINA;
    const cursosPaginados = cursosFiltrados.slice(inicio, fim);
    
    // Renderiza os cursos
    cursosPaginados.forEach(curso => {
        const card = criarCardCurso(curso);
        main.appendChild(card);
    });
}

function atualizarListagem() {
    renderizarCursos();
}

// ============================================================
// 6. INICIALIZAÇÃO DE EVENTOS
// ============================================================

function inicializarBusca() {
    const inputBusca = document.getElementById("search-input");
    if (!inputBusca) return;
    
    let timeoutId;
    inputBusca.addEventListener("input", function(e) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(function() {
            termoBuscaAtual = e.target.value;
            paginaAtual = 1;
            atualizarListagem();
        }, 300);
    });
    
    inputBusca.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            termoBuscaAtual = this.value;
            paginaAtual = 1;
            atualizarListagem();
        }
    });
}

function inicializarFiltrosStatus() {
    const botoesStatus = document.querySelectorAll('.filter-group:first-child button');
    
    botoesStatus.forEach(botao => {
        botao.addEventListener("click", function() {
            const texto = this.textContent.trim();
            let status = "todos";
            if (texto === "Concluídos") status = "concluidos";
            else if (texto === "Em andamento") status = "andamento";
            
            filtrarPorStatus(status);
        });
    });
}

function inicializarFiltrosCategoria() {
    const botoesCategoria = document.querySelectorAll('.filter-group:last-child button');
    
    botoesCategoria.forEach(botao => {
        botao.addEventListener("click", function() {
            filtrarPorCategoria(this.textContent.trim());
        });
    });
}

// ============================================================
// 7. INICIALIZAÇÃO PRINCIPAL
// ============================================================

document.addEventListener("DOMContentLoaded", async function() {
    
    // 1. Carrega o usuário
    carregarUsuario();
    
    // 2. Carrega os cursos do usuário
    await carregarMeusCursos();
    
    // 3. Inicializa os filtros
    inicializarFiltrosStatus();
    inicializarFiltrosCategoria();
    
    // 4. Inicializa a busca
    inicializarBusca();
    
    // 5. Renderiza os cursos
    atualizarListagem();
});

// ============================================================
// 8. EXPOR FUNÇÕES GLOBALMENTE (opcional)
// ============================================================

window.atualizarListagem = atualizarListagem;
window.filtrarPorStatus = filtrarPorStatus;
window.filtrarPorCategoria = filtrarPorCategoria;
window.buscarPorTermo = buscarPorTermo;
window.termoBuscaAtual = termoBuscaAtual;
window.paginaAtual = paginaAtual;
window.meusCursos = meusCursos;