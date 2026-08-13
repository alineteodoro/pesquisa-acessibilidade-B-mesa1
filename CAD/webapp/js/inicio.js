const API_URL = "http://localhost:3001/api/auth";

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

const API_AUTH_URL = `${API_URL}/api/auth`;
const API_MATRICULA_URL = `${API_URL}/api/matricula`;
const API_CURSO_URL = `${API_URL}/api/curso`;

const CHAVE_ID_USUARIO_LOCALSTORAGE = "usuarioId";

/**
 * Obtém o ID do usuário logado do localStorage
 */
function obterIdUsuarioLogado() {
    return localStorage.getItem(CHAVE_ID_USUARIO_LOCALSTORAGE);
}

/**
 * Busca todas as matrículas do usuário logado
 */
async function buscarMatriculasDoUsuario(usuarioId) {
    try {
        const url = `${API_MATRICULA_URL}?id_aluno=${usuarioId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar matrículas`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar matrículas:", error);
        return [];
    }
}

/**
 * Busca todos os cursos da API
 */
async function buscarTodosCursos() {
    try {
        const response = await fetch(`${API_CURSO_URL}`);

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao buscar cursos`);
        }

        return await response.json();
    } catch (error) {
        console.error("Erro ao buscar cursos:", error);
        return [];
    }
}

/**
 * Calcula as estatísticas do usuário com base nas matrículas e cursos
 */
function calcularEstatisticas(matriculas, cursos) {
    // Filtra apenas matrículas ativas
    const matriculasAtivas = matriculas.filter(m => m.status === 'ativo' || m.status === 'cursando');
    const matriculasConcluidas = matriculas.filter(m => m.status === 'concluido' || m.status === 'concluído');

    // Cursos em andamento (matrículas ativas)
    const cursosEmAndamento = matriculasAtivas.length;

    // Cursos concluídos
    const cursosConcluidos = matriculasConcluidas.length;

    // Total de matrículas
    const totalMatriculas = matriculas.length;

    // Horas estudadas (estimativa baseada em 2h por curso em andamento + 20h por curso concluído)
    // Você pode ajustar esses valores conforme sua lógica de negócio
    const horasPorCursoAndamento = 2;
    const horasPorCursoConcluido = 20;
    
    const horasEstimadas = (cursosEmAndamento * horasPorCursoAndamento) + (cursosConcluidos * horasPorCursoConcluido);

    return {
        emAndamento: cursosEmAndamento,
        concluidos: cursosConcluidos,
        total: totalMatriculas,
        horasEstudadas: horasEstimadas
    };
}

/**
 * Obtém os detalhes dos cursos em andamento do usuário
 */
function obterCursosEmAndamento(matriculas, cursos) {
    // Filtra matrículas ativas
    const matriculasAtivas = matriculas.filter(m => m.status === 'ativo' || m.status === 'cursando');
    
    // Pega os IDs dos cursos ativos
    const idsCursosAtivos = matriculasAtivas.map(m => m.id_curso);
    
    // Filtra os cursos que estão ativos
    const cursosAtivos = cursos.filter(curso => idsCursosAtivos.includes(curso.id_curso));
    
    // Pega apenas os 3 primeiros (ou menos)
    return cursosAtivos.slice(0, 3);
}

/**
 * Atualiza os cards de estatísticas na página
 */
function atualizarCardsEstatisticas(estatisticas) {
    const cards = document.querySelectorAll('.cards p');
    
    if (cards.length >= 3) {
        // Em andamento
        cards[0].textContent = estatisticas.emAndamento || 0;
        // Concluídos
        cards[1].textContent = estatisticas.concluidos || 0;
        // Horas estudadas
        cards[2].textContent = `${estatisticas.horasEstudadas || 0}h`;
    }
}

/**
 * Cria um card de curso em andamento
 */
function criarCardCurso(curso, matricula) {
    const link = document.createElement('a');
    link.href = `videoAula.html?id=${curso.id_curso}`;
    link.className = 'course-card';
    link.setAttribute('aria-labelledby', `course-title-${curso.id_curso}`);
    link.setAttribute('aria-describedby', `course-desc-${curso.id_curso} course-progress-${curso.id_curso}`);

    // Imagem
    const img = document.createElement('img');
    img.src = curso.imagem || '../assets/FundoPadrão.png';
    img.alt = `Imagem do curso ${curso.nome}`;
    img.className = 'course-image';
    img.loading = 'lazy';

    // Informações do curso
    const info = document.createElement('div');
    info.className = 'course-info';

    // Título
    const titulo = document.createElement('h2');
    titulo.id = `course-title-${curso.id_curso}`;
    titulo.textContent = curso.nome || 'Curso sem nome';

    // Progresso (se disponível)
    const progresso = document.createElement('progress');
    progresso.id = `course-progress-${curso.id_curso}`;
    progresso.max = 100;
    
    // Calcula progresso baseado em alguma lógica (exemplo: matrícula com progresso)
    const progressoValor = matricula?.progresso || 0;
    progresso.value = progressoValor;
    progresso.textContent = `${progressoValor}%`;

    // Descrição com categoria e instrutor
    const desc = document.createElement('div');
    desc.className = 'course-desc';

    const categoria = document.createElement('p');
    categoria.id = `course-desc-${curso.id_curso}`;
    categoria.textContent = curso.categoria || 'Sem categoria';

    const instrutor = document.createElement('p');
    instrutor.id = `course-autor-${curso.id_curso}`;
    instrutor.textContent = curso.instrutorNome || 'Instrutor não informado';

    desc.appendChild(categoria);
    desc.appendChild(instrutor);

    info.appendChild(titulo);
    info.appendChild(progresso);
    info.appendChild(desc);

    link.appendChild(img);
    link.appendChild(info);

    return link;
}

/**
 * Atualiza a seção "Continue de onde parou" com os cursos em andamento
 */
function atualizarCursosEmAndamento(cursosEmAndamento) {
    // Remove os cards existentes (mantém apenas o título "Continue de onde parou")
    const main = document.querySelector('main');
    const sectionTitle = document.querySelector('.section-title');
    
    // Remove todos os course-card existentes
    const cardsExistentes = main.querySelectorAll('.course-card');
    cardsExistentes.forEach(card => card.remove());

    // Se não houver cursos em andamento, mostra uma mensagem
    if (cursosEmAndamento.length === 0) {
        const mensagem = document.createElement('p');
        mensagem.className = 'no-courses-message';
        mensagem.textContent = 'Você não está matriculado em nenhum curso no momento.';
        mensagem.style.textAlign = 'center';
        mensagem.style.padding = '2rem';
        mensagem.style.color = 'var(--text-secondary)';
        
        // Insere após o título
        if (sectionTitle) {
            sectionTitle.after(mensagem);
        }
        return;
    }

    // Adiciona os novos cards
    cursosEmAndamento.forEach((curso, index) => {
        // Simula uma matrícula com progresso (se não tiver, usa 0)
        const matricula = {
            progresso: Math.floor(Math.random() * 100) // Progresso aleatório para demonstração
        };
        
        const card = criarCardCurso(curso, matricula);
        
        // Insere após o título (ou no final do main)
        if (sectionTitle) {
            sectionTitle.after(card);
        } else {
            main.appendChild(card);
        }
    });
}

/**
 * Configura a funcionalidade de pesquisa que redireciona para meusCursos.html
 */
function configurarPesquisa() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('search-input');
    
    if (!searchForm || !searchInput) {
        console.warn('Formulário de pesquisa não encontrado');
        return;
    }
    
    searchForm.addEventListener('submit', (evento) => {
        evento.preventDefault();
        
        const termoBusca = searchInput.value.trim();
        
        if (!termoBusca) {
            window.location.href = 'meusCursos.html';
            return;
        }
        
        const termoCodificado = encodeURIComponent(termoBusca);
        window.location.href = `meusCursos.html?search=${termoCodificado}`;
    });
    
    // Permitir que o Enter no campo de pesquisa também funcione
    searchInput.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            searchForm.dispatchEvent(new Event('submit'));
        }
    });
}

/**
 * Função principal que carrega todos os dados da página inicial
 */
async function carregarDadosInicio() {
    const usuarioId = obterIdUsuarioLogado();

    if (!usuarioId) {
        console.warn("Usuário não logado. Redirecionando para login...");
        window.location.href = 'login.html';
        return;
    }

    try {
        // Busca matrículas e cursos em paralelo
        const [matriculas, cursos] = await Promise.all([
            buscarMatriculasDoUsuario(usuarioId),
            buscarTodosCursos()
        ]);

        // Calcula estatísticas
        const estatisticas = calcularEstatisticas(matriculas, cursos);

        // Atualiza os cards de estatísticas
        atualizarCardsEstatisticas(estatisticas);

        // Obtém cursos em andamento
        const cursosEmAndamento = obterCursosEmAndamento(matriculas, cursos);

        // Atualiza a seção "Continue de onde parou"
        atualizarCursosEmAndamento(cursosEmAndamento);

    } catch (error) {
        console.error("Erro ao carregar dados da página inicial:", error);
        
        // Mostra mensagem de erro nos cards
        const cards = document.querySelectorAll('.cards p');
        cards.forEach(card => {
            card.textContent = 'Erro';
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", async () => {
    // Carrega o nome do usuário
    await carregarUsuario();
    
    // Configura a pesquisa
    configurarPesquisa();
    
    // Carrega os dados da página inicial
    await carregarDadosInicio();
});