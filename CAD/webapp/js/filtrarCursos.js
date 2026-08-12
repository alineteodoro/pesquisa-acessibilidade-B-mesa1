const botoesCategoria = document.querySelectorAll(".filter-group button");
let categoriaAtiva = "Todos";

function aplicarFiltroCategoria(cursos) {
    if (categoriaAtiva === "Todos") return cursos;
    return cursos.filter(curso => curso.categoria === categoriaAtiva);
}

function filtrarPorCategoria(categoria) {
    categoriaAtiva = categoria;
    paginaAtual = 1;
 
    botoesCategoria.forEach(botao => {
        botao.classList.toggle("selected", botao.textContent.trim() === categoria);
    });
 
    atualizarListagem();
}
 
botoesCategoria.forEach(botao => {
    botao.addEventListener("click", () => {
        filtrarPorCategoria(botao.textContent.trim());
    });
});

let statusMatriculaAtivo = "todos";

function aplicarFiltroStatusMatricula(cursos) {
    if (statusMatriculaAtivo === "todos") return cursos;
    return cursos.filter(curso => curso.statusMatricula === statusMatriculaAtivo);
}

function filtrarPorStatusMatricula(status) {
    statusMatriculaAtivo = status;
    paginaAtual = 1;
    atualizarListagem();
}