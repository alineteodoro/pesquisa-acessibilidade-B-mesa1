document.addEventListener("DOMContentLoaded", () => {
    const buttonSobre = document.getElementById("tab-sobre")
    const buttonAvaliacoes = document.getElementById("tab-avaliacoes")
    const panelSobre = document.getElementById("panel-sobre")
    const panelAvaliacoes = document.getElementById("panel-avaliacoes")

    if (!buttonSobre || !buttonAvaliacoes || !panelSobre || !panelAvaliacoes) {
        return
    }

    const activateTab = (buttonToActivate, panelToShow, panelToHide) => {
        buttonSobre.setAttribute("aria-selected", buttonSobre === buttonToActivate ? "true" : "false")
        buttonAvaliacoes.setAttribute("aria-selected", buttonAvaliacoes === buttonToActivate ? "true" : "false")

        panelToShow.removeAttribute("hidden")
        panelToHide.setAttribute("hidden", "")

        buttonSobre.removeAttribute("data-animate")
        buttonAvaliacoes.removeAttribute("data-animate")
        buttonToActivate.setAttribute("data-animate", "true")

        window.requestAnimationFrame(() => {
            buttonToActivate.removeAttribute("data-animate")
        })
    }

    buttonAvaliacoes.addEventListener("click", () => {
        activateTab(buttonAvaliacoes, panelAvaliacoes, panelSobre)
    })

    buttonSobre.addEventListener("click", () => {
        activateTab(buttonSobre, panelSobre, panelAvaliacoes)
    })
})
