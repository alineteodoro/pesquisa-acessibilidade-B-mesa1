const btnCadastrar = document.getElementById("toggleButton")
const authContainer = document.querySelector(".auth")
const loginPanel = document.getElementById("loginPanel")
const registerPanel = document.getElementById("registerPanel")

if (btnCadastrar && authContainer && loginPanel && registerPanel) {
    btnCadastrar.addEventListener("click", () => {
        authContainer.classList.toggle("register")

        const isRegisterActive = authContainer.classList.contains("register")

        loginPanel.inert = isRegisterActive
        registerPanel.inert = !isRegisterActive

        btnCadastrar.textContent = isRegisterActive ? "Entrar" : "Cadastre-se"
    })
}
