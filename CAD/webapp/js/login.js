const btnCadastrar = document.getElementById("toggleButton")
const authContainer = document.querySelector(".auth")
const loginPanel = document.getElementById("loginPanel")
const registerPanel = document.getElementById("registerPanel")
const bluePanelDesc = document.getElementById("bluePanelDesc")

if (btnCadastrar && authContainer && loginPanel && registerPanel && bluePanelDesc) {
    btnCadastrar.addEventListener("click", () => {
        authContainer.classList.toggle("register")

        const isRegisterActive = authContainer.classList.contains("register")

        loginPanel.inert = isRegisterActive
        registerPanel.inert = !isRegisterActive

        btnCadastrar.textContent = isRegisterActive ? "Entrar" : "Cadastre-se"
        bluePanelDesc.textContent = isRegisterActive ? "Insira seu email e senha para ter acesso a todos os seus cursos" : "Entre na sua conta para acessar seus cursos e vídeoaulas"
    })
}
