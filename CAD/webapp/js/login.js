const API_URL = "http://localhost:3001/api/auth";

const btnCadastrar = document.getElementById("toggleButton");
const authContainer = document.querySelector(".auth");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const bluePanelDesc = document.getElementById("bluePanelDesc");

const loginForm = document.querySelector(".login-form");
const registerForm = document.querySelector(".register-form");


/* =========================================================
   ALTERNAR ENTRE LOGIN E CADASTRO
   ========================================================= */

if (
    btnCadastrar &&
    authContainer &&
    loginPanel &&
    registerPanel &&
    bluePanelDesc
) {
    btnCadastrar.addEventListener("click", () => {
        authContainer.classList.toggle("register");

        const isRegisterActive =
            authContainer.classList.contains("register");

        loginPanel.inert = isRegisterActive;
        registerPanel.inert = !isRegisterActive;

        btnCadastrar.textContent =
            isRegisterActive ? "Entrar" : "Cadastre-se";

        bluePanelDesc.textContent = isRegisterActive
            ? "Insira seus dados para criar sua conta"
            : "Entre na sua conta para acessar seus cursos e vídeoaulas";
    });
}


/* =========================================================
   LOGIN
   ========================================================= */

if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const email =
            document.getElementById("login-email").value.trim();

        const senha =
            document.getElementById("password").value;

        try {
            const response = await fetch(`${API_URL}/logarConta`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email: email,
                    senha_hash: senha
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Não foi possível realizar o login.");
                return;
            }

            /*
             * Guarda as informações necessárias para
             * identificar o usuário no restante do front.
             */
            localStorage.setItem("usuarioId", data.id);
            localStorage.setItem(
                "isInstrutor",
                data.is_instrutor
            );

            alert("Login realizado com sucesso!");

            window.location.href = "inicio.html";

        } catch (error) {
            console.error("Erro ao realizar login:", error);

            alert(
                "Não foi possível conectar ao servidor. " +
                "Verifique se o backend está funcionando."
            );
        }
    });
}


/* =========================================================
   CADASTRO
   ========================================================= */

if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const nome =
            document.getElementById("register-name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const dataNascimento =
            document.getElementById("birthdate").value;

        const senha =
            document.getElementById("register-password").value;

        const confirmarSenha =
            document.getElementById("confirm-password").value;


        /* ---------------------------------------------
           VALIDAÇÃO DA SENHA
           --------------------------------------------- */

        if (senha !== confirmarSenha) {
            alert("As senhas não são iguais.");
            return;
        }


        /* ---------------------------------------------
           CONVERTE YYYY-MM-DD → DD-MM-YYYY
           --------------------------------------------- */

        const partesData = dataNascimento.split("-");

        const dataFormatada =
            `${partesData[2]}-${partesData[1]}-${partesData[0]}`;


        try {
            const response = await fetch(`${API_URL}/criarConta`, {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha_hash: senha,
                    dt_nascimento: dataFormatada,
                    ativo: true,
                    is_instrutor: false
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                    "Não foi possível criar a conta."
                );

                return;
            }

            alert("Conta criada com sucesso!");

            localStorage.setItem("usuarioId", data.id);

            window.location.href = "inicio.html";

        } catch (error) {
            console.error("Erro ao criar conta:", error);

            alert(
                "Não foi possível conectar ao servidor. " +
                "Verifique se o backend está funcionando."
            );
        }
    });
}
