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

const CHAVE_ID_USUARIO_LOCALSTORAGE = "usuarioId";

/**
 * Obtém o ID do usuário logado do localStorage
 */
function obterIdUsuarioLogado() {
    return localStorage.getItem(CHAVE_ID_USUARIO_LOCALSTORAGE);
}

/**
 * Carrega os dados do usuário e preenche o formulário
 */
async function carregarDadosUsuario() {
    const usuarioId = obterIdUsuarioLogado();

    const elementoNome = document.getElementById("user-name");
    const nomeCompleto = document.getElementById("nome-completo");
    const emailPessoal = document.getElementById("email-pessoal");
    const dataNascimento = document.getElementById("data-nascimento");
    const emailNascimento = document.getElementById("email-nascimento");
    const userEmail = document.querySelector(".user-email");
    const userName = document.querySelector(".user-nome");
    const userDate = document.querySelector(".user-date");

    if (!elementoNome) {
        console.error('Elemento "#user-name" não encontrado.');
        return;
    }

    if (!usuarioId) {
        console.warn("Nenhum usuário encontrado na sessão.");
        elementoNome.textContent = "Usuário!";
        // Redireciona para login se não estiver logado
        window.location.href = "login.html";
        return;
    }

    try {
        const url = `${API_URL}/${usuarioId}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Backend retornou HTTP ${response.status}`);
        }

        const usuario = await response.json();

        // Preenche o nome no menu
        elementoNome.textContent = usuario.nome + '!';

        // Preenche os campos do formulário
        if (nomeCompleto) nomeCompleto.value = usuario.nome || '';
        if (emailPessoal) emailPessoal.value = usuario.email || '';
        
        // Preenche o header do perfil
        if (userName) userName.textContent = usuario.nome || 'Usuário';
        if (userEmail) userEmail.textContent = usuario.email || '';
        
        // Formata a data de nascimento se existir
        if (usuario.data_nascimento) {
            const dataFormatada = formatarData(usuario.data_nascimento);
            if (dataNascimento) dataNascimento.value = dataFormatada;
            if (userDate) {
                const dataExibicao = formatarDataExibicao(usuario.data_nascimento);
                userDate.textContent = `📅 ${dataExibicao}`;
            }
        }

        // Preenche o email no campo de data de nascimento (mesmo email)
        if (emailNascimento) emailNascimento.value = usuario.email || '';

    } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        elementoNome.textContent = "Usuário";
        
        // Mostra mensagem de erro para o usuário
        alert("Não foi possível carregar os dados do perfil. Tente novamente.");
    }
}

/**
 * Formata data para o formato DD/MM/AAAA
 */
function formatarData(data) {
    if (!data) return '';
    
    try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        
        return `${dia}/${mes}/${ano}`;
    } catch {
        return data;
    }
}

/**
 * Formata data para exibição legível
 */
function formatarDataExibicao(data) {
    if (!data) return 'Data não informada';
    
    try {
        const date = new Date(data);
        if (isNaN(date.getTime())) return data;
        
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    } catch {
        return data;
    }
}

/**
 * Atualiza os dados do usuário
 */
async function atualizarDadosUsuario(event) {
    event.preventDefault();
    
    const usuarioId = obterIdUsuarioLogado();
    if (!usuarioId) {
        alert("Você precisa estar logado para atualizar seus dados.");
        return;
    }

    const nomeCompleto = document.getElementById("nome-completo");
    const emailPessoal = document.getElementById("email-pessoal");

    try {
        const response = await fetch(`${API_URL}/${usuarioId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nome: nomeCompleto.value.trim(),
                email: emailPessoal.value.trim()
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao atualizar dados`);
        }

        const usuarioAtualizado = await response.json();
        
        // Atualiza os elementos da interface
        document.getElementById("user-name").textContent = usuarioAtualizado.nome + '!';
        document.querySelector(".user-name").textContent = usuarioAtualizado.nome;
        document.querySelector(".user-email").textContent = usuarioAtualizado.email;

        alert("Dados atualizados com sucesso!");

    } catch (error) {
        console.error("Erro ao atualizar dados:", error);
        alert("Não foi possível atualizar seus dados. Tente novamente.");
    }
}

/**
 * Atualiza a senha do usuário
 */
async function atualizarSenha(event) {
    event.preventDefault();
    
    const usuarioId = obterIdUsuarioLogado();
    if (!usuarioId) {
        alert("Você precisa estar logado para alterar sua senha.");
        return;
    }

    const senhaAtual = document.getElementById("senha-atual");
    const novaSenha = document.getElementById("nova-senha");

    // Validação básica
    if (!senhaAtual.value || !novaSenha.value) {
        alert("Preencha todos os campos de senha.");
        return;
    }

    if (novaSenha.value.length < 6) {
        alert("A nova senha deve ter pelo menos 6 caracteres.");
        return;
    }

    try {
        // Primeiro, verifica se a senha atual está correta (faz login)
        const email = document.getElementById("email-pessoal").value;
        
        const loginResponse = await fetch(`${API_URL}/logarConta`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                senha: senhaAtual.value
            })
        });

        if (!loginResponse.ok) {
            alert("Senha atual incorreta.");
            return;
        }

        // Se a senha atual estiver correta, atualiza para a nova
        const response = await fetch(`${API_URL}/${usuarioId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                senha: novaSenha.value
            })
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao atualizar senha`);
        }

        alert("Senha atualizada com sucesso!");
        
        // Limpa os campos de senha
        senhaAtual.value = '';
        novaSenha.value = '';

    } catch (error) {
        console.error("Erro ao atualizar senha:", error);
        alert("Não foi possível atualizar sua senha. Tente novamente.");
    }
}

/**
 * Função de logout - limpa localStorage e redireciona para login
 */
function fazerLogout() {
    // Limpa todos os dados do localStorage
    localStorage.removeItem(CHAVE_ID_USUARIO_LOCALSTORAGE);
    
    // Limpa quaisquer outros dados que possam estar armazenados
    localStorage.removeItem("usuarioNome");
    localStorage.removeItem("usuarioEmail");
    
    // Redireciona para a página de login
    window.location.href = "login.html";
}

/**
 * Configura os eventos dos formulários
 */
function configurarFormularios() {
    const formPessoais = document.getElementById("form-pessoais");
    if (formPessoais) {
        formPessoais.addEventListener("submit", atualizarDadosUsuario);
    }

    const formSeguranca = document.getElementById("form-seguranca");
    if (formSeguranca) {
        formSeguranca.addEventListener("submit", atualizarSenha);
    }

    // Botão de logout
    const btnLogout = document.querySelector('.btn-perigo-outline[data-action="logout"]');
    if (btnLogout) {
        btnLogout.addEventListener("click", (event) => {
            event.preventDefault();
            // Mostra um diálogo de confirmação antes de fazer logout
            if (confirm("Tem certeza que deseja sair da sua conta?")) {
                fazerLogout();
            }
        });
    } else {
        // Fallback: procura pelo botão que contém o texto "Sair da conta"
        const todosBotoesPerigo = document.querySelectorAll('.btn-perigo-outline');
        todosBotoesPerigo.forEach(botao => {
            if (botao.textContent.trim() === "Sair da conta") {
                botao.addEventListener("click", (event) => {
                    event.preventDefault();
                    if (confirm("Tem certeza que deseja sair da sua conta?")) {
                        fazerLogout();
                    }
                });
            }
        });
    }

    // Botão de excluir conta (apenas visual, a funcionalidade pode ser implementada depois)
    const btnExcluir = document.querySelector('.btn-perigo-outline:first-child');
    if (btnExcluir) {
        btnExcluir.addEventListener("click", () => {
            if (confirm("Tem certeza que deseja excluir sua conta? Esta ação é irreversível!")) {
                excluirConta();
            }
        });
    }
}

/**
 * Exclui a conta do usuário (funcionalidade adicional)
 */
async function excluirConta() {
    const usuarioId = obterIdUsuarioLogado();
    if (!usuarioId) return;

    try {
        const response = await fetch(`${API_URL}/${usuarioId}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error(`Erro ${response.status} ao excluir conta`);
        }

        alert("Conta excluída com sucesso.");
        fazerLogout();

    } catch (error) {
        console.error("Erro ao excluir conta:", error);
        alert("Não foi possível excluir sua conta. Tente novamente.");
    }
}

/**
 * Carrega a foto de perfil do usuário (se existir)
 */
async function carregarFotoPerfil() {
    const usuarioId = obterIdUsuarioLogado();
    if (!usuarioId) return;

    try {
        // Se o backend tiver um endpoint para foto, use-o
        const response = await fetch(`${API_URL}/foto/${usuarioId}`);
        if (response.ok) {
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const avatarImg = document.querySelector(".avatar-img");
            if (avatarImg) {
                avatarImg.src = url;
            }
        }
    } catch (error) {
        console.log("Nenhuma foto de perfil encontrada.");
    }
}

/**
 * Configura o upload de foto de perfil
 */
function configurarUploadFoto() {
    const avatarInput = document.getElementById("avatar-input");
    const avatarImg = document.querySelector(".avatar-img");

    if (avatarInput && avatarImg) {
        avatarInput.addEventListener("change", async (event) => {
            const file = event.target.files[0];
            if (!file) return;

            // Valida o tipo do arquivo
            if (!file.type.startsWith('image/')) {
                alert("Por favor, selecione uma imagem válida.");
                return;
            }

            // Valida o tamanho (máx 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert("A imagem deve ter no máximo 5MB.");
                return;
            }

            try {
                const formData = new FormData();
                formData.append("foto", file);

                const usuarioId = obterIdUsuarioLogado();
                if (!usuarioId) return;

                const response = await fetch(`${API_URL}/foto/${usuarioId}`, {
                    method: "POST",
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Erro ${response.status} ao enviar foto`);
                }

                // Atualiza a foto na interface
                const url = URL.createObjectURL(file);
                avatarImg.src = url;

                alert("Foto de perfil atualizada com sucesso!");

            } catch (error) {
                console.error("Erro ao enviar foto:", error);
                alert("Não foi possível atualizar a foto. Tente novamente.");
            }
        });
    }
}

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", async () => {
    carregarUsuario();
    // Carrega os dados do usuário
    await carregarDadosUsuario();
    
    // Configura os formulários
    configurarFormularios();
    
    // Configura upload de foto
    configurarUploadFoto();
    
    // Carrega a foto de perfil (se disponível)
    carregarFotoPerfil();
});
