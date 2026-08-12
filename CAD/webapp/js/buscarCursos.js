const inputBusca = document.querySelector("#search-input");
let termoBusca = "";

function normalizarTexto(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim();
}

function aplicarBusca(cursos) {
    if (!termoBusca) return cursos;
 
    const termoNormalizado = normalizarTexto(termoBusca);
 
    return cursos.filter(curso =>
        normalizarTexto(curso.nome ?? "").includes(termoNormalizado)
    );
}

function buscarCursoPorNome(nome) {
    termoBusca = nome;
    paginaAtual = 1;
    atualizarListagem();
}
 
if (inputBusca) {
    let debounceTimer;
 
    // Busca enquanto o usuário digita (com debounce de 300ms)
    inputBusca.addEventListener("input", (evento) => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            buscarCursoPorNome(evento.target.value);
        }, 300);
    });
 
    // Busca imediata ao pressionar Enter / submeter o formulário
    inputBusca.closest("form")?.addEventListener("submit", (evento) => {
        evento.preventDefault();
        clearTimeout(debounceTimer);
        buscarCursoPorNome(inputBusca.value);
    });
}