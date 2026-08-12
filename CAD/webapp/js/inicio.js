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

document.addEventListener(
    "DOMContentLoaded",
    carregarUsuario
);