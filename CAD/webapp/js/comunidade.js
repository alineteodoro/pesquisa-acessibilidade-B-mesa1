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
            window.location.href = 'cursos.html';
            return;
        }
        
        const termoCodificado = encodeURIComponent(termoBusca);
        
        window.location.href = `cursos.html?search=${termoCodificado}`;
    });
    
    searchInput.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') {
            evento.preventDefault();
            searchForm.dispatchEvent(new Event('submit'));
        }
    });
}


document.addEventListener("DOMContentLoaded", () => {
  carregarUsuario();
  configurarPesquisa();
  const voteButtons = document.querySelectorAll(".btn-vote");

  voteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".card-content") || button.closest(".card-actions");
      if (!card) return;

      const currentlyPressed = button.getAttribute("aria-pressed") === "true";
      const siblingButtons = card.querySelectorAll(".btn-vote");

      siblingButtons.forEach((sibling) => {
        sibling.setAttribute("aria-pressed", "false");
      });

      if (!currentlyPressed) {
        button.setAttribute("aria-pressed", "true");
      }
    });
  });
});
