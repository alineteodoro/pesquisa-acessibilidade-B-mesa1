document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector(".menu nav")
    const indicator = nav?.querySelector(".active-indicator")
    const links = nav ? Array.from(nav.querySelectorAll("a")) : []
    let activeLink = nav?.querySelector("a.active, a[aria-current='page']") || links[0]

    const mainContent = document.getElementById("main-content")
    const TRANSITION_MS = 180
    const currentFile = window.location.pathname.split("/").pop() || "inicio.html"

    // ---- Pré-carregamento das páginas do menu ----
    // Avisa o navegador para buscar (e cachear) o HTML de todas as outras
    // seções do menu logo depois que a página atual termina de carregar.
    // Assim, quando o usuário clicar em um link, o documento de destino já
    // está pronto (ou quase), evitando o tempo de espera a cada troca.
    const preloadMenuPages = () => {
        links.forEach((link) => {
            const href = link.getAttribute("href")
            if (!href || href === currentFile) {
                return
            }

            const alreadyPreloaded = document.head.querySelector(`link[rel="prefetch"][href="${href}"]`)
            if (alreadyPreloaded) {
                return
            }

            const prefetchLink = document.createElement("link")
            prefetchLink.rel = "prefetch"
            prefetchLink.href = href
            document.head.appendChild(prefetchLink)
        })
    }

    // Só pré-carrega quando o navegador estiver ocioso, pra não atrapalhar
    // o carregamento da página que o usuário está vendo agora.
    if ("requestIdleCallback" in window) {
        requestIdleCallback(preloadMenuPages)
    } else {
        window.setTimeout(preloadMenuPages, 500)
    }

    // ---- Transição (fade) ao entrar na página ----
    if (mainContent) {
        mainContent.style.transition = `opacity ${TRANSITION_MS}ms ease`
        mainContent.style.opacity = "0"
        requestAnimationFrame(() => {
            mainContent.style.opacity = "1"
        })
    }

    // Se a página voltar do cache do navegador (botão voltar/avançar),
    // garante que o conteúdo apareça na hora, sem repetir o fade-in.
    window.addEventListener("pageshow", (event) => {
        if (event.persisted && mainContent) {
            mainContent.style.transition = "none"
            mainContent.style.opacity = "1"
        }
    })

    if (!nav || !indicator || !activeLink) {
        return
    }

    const updateIndicator = (link = activeLink) => {
        const navRect = nav.getBoundingClientRect()
        const linkRect = link.getBoundingClientRect()
        const communityLink = nav.querySelector("a[href$='comunidade.html']")
        const communityRect = communityLink ? communityLink.getBoundingClientRect() : linkRect

        const topPx = linkRect.top - navRect.top
        const sidePaddingPx = 8
        const desiredWidthPx = Math.max(linkRect.width, communityRect.width) + sidePaddingPx * 2
        const maxWidthPx = Math.max(0, navRect.width - sidePaddingPx * 2)
        const widthPx = Math.min(desiredWidthPx, maxWidthPx)

        const rootFontPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16
        const topRem = (topPx / rootFontPx).toFixed(3)
        const leftRem = (sidePaddingPx / rootFontPx).toFixed(3)
        const widthRem = (widthPx / rootFontPx).toFixed(3)
        const heightRem = (linkRect.height / rootFontPx).toFixed(3)

        indicator.style.top = `${topRem}rem`
        indicator.style.left = `${leftRem}rem`
        indicator.style.width = `${widthRem}rem`
        indicator.style.height = `${heightRem}rem`
    }

    const setActiveLink = (link) => {
        if (!link || link === activeLink) {
            return
        }

        links.forEach((item) => {
            item.classList.toggle("active", item === link)
            if (item === link) {
                item.setAttribute("aria-current", "page")
            } else {
                item.removeAttribute("aria-current")
            }
        })

        activeLink = link
        indicator.classList.add("animate")
        updateIndicator(link)
    }

    // ---- Navegação com fade-out antes de trocar de página ----
    // Como cada seção é uma página separada (não é uma SPA), a "animação de
    // troca" acontece em duas partes: o indicador desliza pro item clicado
    // e o conteúdo principal esmaece antes da navegação de fato ocorrer.
    // Como a página de destino já foi pré-carregada, o carregamento real é
    // praticamente instantâneo, então o efeito fica contínuo e fluido.
    const handleLinkClick = (event, link) => {
        const href = link.getAttribute("href")
        const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0

        if (!href || isModifiedClick) {
            return
        }

        // Já está na página atual: só garante o indicador no lugar certo.
        if (href === currentFile) {
            event.preventDefault()
            setActiveLink(link)
            return
        }

        event.preventDefault()
        setActiveLink(link)

        if (mainContent) {
            mainContent.style.transition = `opacity ${TRANSITION_MS}ms ease`
            mainContent.style.opacity = "0"
            window.setTimeout(() => {
                window.location.href = href
            }, TRANSITION_MS)
        } else {
            window.location.href = href
        }
    }

    links.forEach((link) => {
        link.addEventListener("click", (event) => handleLinkClick(event, link))
    })

    updateIndicator()
    window.addEventListener("resize", () => updateIndicator(activeLink))
})