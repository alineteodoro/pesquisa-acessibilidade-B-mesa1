const API_MEUS_CURSOS =
    "http://localhost:3001/api/matricula";


let meusCursos = [];


/* =========================================================
   BUSCAR CURSOS DO USUÁRIO
   ========================================================= */

async function carregarMeusCursos() {

    const usuarioId =
        localStorage.getItem("usuarioId");


    if (!usuarioId) {

        console.warn(
            "Nenhum usuário encontrado."
        );

        return [];
    }


    try {

        const response = await fetch(
            `${API_MEUS_CURSOS}?id_aluno=${encodeURIComponent(usuarioId)}`
        );


        if (!response.ok) {
            throw new Error(
                "Erro ao buscar os cursos do usuário."
            );
        }


        meusCursos =
            await response.json();


        return meusCursos;


    } catch (error) {

        console.error(
            "Erro ao carregar meus cursos:",
            error
        );

        return [];
    }
}


/* =========================================================
   CURSOS EM ANDAMENTO
   ========================================================= */

function obterCursosEmAndamento() {

    return meusCursos.filter(
        curso =>
            curso.status === "ativo"
    );
}


/* =========================================================
   CURSOS CONCLUÍDOS
   ========================================================= */

function obterCursosConcluidos() {

    return meusCursos.filter(
        curso =>
            curso.status === "concluido"
    );
}


/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await carregarMeusCursos();

        /*
         * Avisa outros scripts que os cursos
         * do usuário foram carregados.
         */

        document.dispatchEvent(
            new CustomEvent(
                "meusCursos:carregados",
                {
                    detail: {
                        cursos: meusCursos
                    }
                }
            )
        );
    }
);


/* =========================================================
   DISPONIBILIZAR FUNÇÕES
   ========================================================= */

window.MeusCursos = {

    carregar: carregarMeusCursos,

    todos: () => meusCursos,

    emAndamento: obterCursosEmAndamento,

    concluidos: obterCursosConcluidos
};